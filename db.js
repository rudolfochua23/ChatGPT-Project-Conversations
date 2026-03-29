const { Pool } = require('pg');
const crypto = require('node:crypto');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://aichats:aichats@localhost:5432/aichats',
  max: 10,
});

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL,
        salt TEXT NOT NULL,
        hash TEXT NOT NULL,
        verified BOOLEAN NOT NULL DEFAULT false,
        role TEXT NOT NULL DEFAULT 'user',
        api_key TEXT UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS conversations (
        id TEXT NOT NULL,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        platform TEXT NOT NULL DEFAULT 'unknown',
        url TEXT,
        captured TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (id, user_id)
      );

      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        conversation_id TEXT NOT NULL,
        user_id UUID NOT NULL,
        role TEXT NOT NULL,
        text TEXT NOT NULL,
        sort_order INTEGER NOT NULL,
        FOREIGN KEY (conversation_id, user_id) REFERENCES conversations(id, user_id) ON DELETE CASCADE,
        UNIQUE(conversation_id, user_id, sort_order)
      );

      CREATE TABLE IF NOT EXISTS code_snippets (
        id SERIAL PRIMARY KEY,
        conversation_id TEXT NOT NULL,
        user_id UUID NOT NULL,
        message_index INTEGER NOT NULL,
        role TEXT NOT NULL,
        language TEXT NOT NULL DEFAULT 'plaintext',
        code TEXT NOT NULL,
        detected BOOLEAN NOT NULL DEFAULT false,
        FOREIGN KEY (conversation_id, user_id) REFERENCES conversations(id, user_id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conversation_id, user_id);
      CREATE INDEX IF NOT EXISTS idx_snippets_conv ON code_snippets(conversation_id, user_id);
      CREATE INDEX IF NOT EXISTS idx_conversations_user ON conversations(user_id, captured DESC);
      CREATE INDEX IF NOT EXISTS idx_conversations_platform ON conversations(user_id, platform);
      CREATE INDEX IF NOT EXISTS idx_users_api_key ON users(api_key);
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);
  } finally {
    client.release();
  }
}

// ─── Code detection helpers ──────────────────────────────────────────────────

const codeFenceRegex = /```([a-zA-Z0-9_+-]*)\n([\s\S]*?)```/g;
const inlineCodeRegex = /`([^`\n]{5,})`/g;

function isCodeLine(line) {
  const t = line.trim();
  if (!t) return false;
  if (/^[$>]\s/.test(t)) return true;
  if (/^#!/.test(t)) return true;
  if (/^\s{4,}\S/.test(line) || /^\t\S/.test(line)) return true;
  if (/^(function|def\s|class\s|import\s|from\s|const\s|let\s|var\s|return\s|async\s|await\s|export\s|require\s*\(|include\s|use\s|pub\s|fn\s|impl\s|package\s|struct\s|enum\s|interface\s|type\s|switch\s*\(|case\s|try\s*\{|catch\s*\(|throw\s|new\s)/.test(t)) return true;
  if (/[{};]$/.test(t) && t.length > 2) return true;
  if (/=>|->|::|===|!==|&&|\|\|/.test(t)) return true;
  return false;
}

function looksLikeCode(text) {
  const lines = text.split('\n');
  let streak = 0;
  for (const line of lines) {
    if (!line.trim()) { streak = 0; continue; }
    if (isCodeLine(line)) { if (++streak >= 2) return true; }
    else { streak = 0; }
  }
  return false;
}

function extractCodeSnippets(messages) {
  const snippets = [];
  messages.forEach((message, messageIndex) => {
    const fenced = [...message.text.matchAll(codeFenceRegex)];
    for (const match of fenced) {
      snippets.push({ messageIndex, role: message.role, language: match[1] || 'plaintext', code: match[2].trim(), detected: false });
    }

    if (!fenced.length) {
      const seen = new Set();
      const unique = [];
      for (const match of message.text.matchAll(inlineCodeRegex)) {
        const code = match[1].trim();
        if (!seen.has(code)) { seen.add(code); unique.push(code); }
      }
      if (unique.length > 0) {
        snippets.push({ messageIndex, role: message.role, language: 'inline', code: unique.join('\n'), detected: true });
      }
    }

    const hasAny = fenced.length > 0 || [...message.text.matchAll(inlineCodeRegex)].length > 0;
    if (!hasAny && looksLikeCode(message.text)) {
      snippets.push({ messageIndex, role: message.role, language: 'detected', code: message.text.slice(0, 500), detected: true });
    }
  });
  return snippets;
}

// ─── API Key helper ─────────────────────────────────────────────────────────

function generateApiKey() {
  return 'aichat_' + crypto.randomBytes(24).toString('hex');
}

// ─── User CRUD (replaces users.json) ─────────────────────────────────────────

async function findUserByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
  return rows[0] || null;
}

async function findUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0] || null;
}

async function findUserByApiKey(apiKey) {
  const { rows } = await pool.query('SELECT * FROM users WHERE api_key = $1 AND verified = true', [apiKey]);
  return rows[0] || null;
}

async function createUser({ email, username, salt, hash, verified, role }) {
  const apiKey = generateApiKey();
  const { rows } = await pool.query(
    `INSERT INTO users (email, username, salt, hash, verified, role, api_key)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [email, username, salt, hash, verified, role || 'user', apiKey]
  );
  return rows[0];
}

async function updateUserPassword(id, salt, hash) {
  await pool.query('UPDATE users SET salt = $1, hash = $2, changed_at = NOW() WHERE id = $3', [salt, hash, id]);
}

async function updateUserApiKey(id) {
  const apiKey = generateApiKey();
  await pool.query('UPDATE users SET api_key = $1 WHERE id = $2', [apiKey, id]);
  return apiKey;
}

async function getApiKey(userId) {
  const { rows } = await pool.query('SELECT api_key FROM users WHERE id = $1', [userId]);
  return rows[0]?.api_key || null;
}

// ─── Conversation CRUD (all scoped by user_id) ──────────────────────────────

async function upsertConversation({ userId, id, title, platform, url, captured, messages }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(`
      INSERT INTO conversations (id, user_id, title, platform, url, captured, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      ON CONFLICT(id, user_id) DO UPDATE SET
        title = EXCLUDED.title,
        platform = EXCLUDED.platform,
        url = EXCLUDED.url,
        captured = EXCLUDED.captured,
        updated_at = NOW()
    `, [id, userId, title, platform, url || null, captured]);

    await client.query('DELETE FROM messages WHERE conversation_id = $1 AND user_id = $2', [id, userId]);
    await client.query('DELETE FROM code_snippets WHERE conversation_id = $1 AND user_id = $2', [id, userId]);

    for (let i = 0; i < messages.length; i++) {
      await client.query(
        'INSERT INTO messages (conversation_id, user_id, role, text, sort_order) VALUES ($1, $2, $3, $4, $5)',
        [id, userId, messages[i].role, messages[i].text, i]
      );
    }

    const snippets = extractCodeSnippets(messages);
    for (const s of snippets) {
      await client.query(
        'INSERT INTO code_snippets (conversation_id, user_id, message_index, role, language, code, detected) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [id, userId, s.messageIndex, s.role, s.language, s.code, s.detected]
      );
    }

    await client.query('COMMIT');
    return { id, messagesCount: messages.length };
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

async function listConversations({ userId, platform, query, limit = 200, offset = 0 } = {}) {
  const conditions = ['c.user_id = $1'];
  const params = [userId];
  let pIdx = 2;

  if (platform && platform !== 'all') {
    conditions.push(`c.platform = $${pIdx++}`);
    params.push(platform);
  }

  if (query) {
    conditions.push(`(c.title ILIKE $${pIdx} OR EXISTS (
      SELECT 1 FROM messages m WHERE m.conversation_id = c.id AND m.user_id = c.user_id AND m.text ILIKE $${pIdx + 1}
    ))`);
    params.push(`%${query}%`, `%${query}%`);
    pIdx += 2;
  }

  const where = `WHERE ${conditions.join(' AND ')}`;

  const { rows: conversations } = await pool.query(`
    SELECT c.*,
      (SELECT COUNT(*) FROM messages m WHERE m.conversation_id = c.id AND m.user_id = c.user_id) AS message_count
    FROM conversations c
    ${where}
    ORDER BY c.captured DESC
    LIMIT $${pIdx} OFFSET $${pIdx + 1}
  `, [...params, limit, offset]);

  const { rows: [{ count }] } = await pool.query(
    `SELECT COUNT(*) as count FROM conversations c ${where}`, params
  );

  return { conversations, total: Number(count) };
}

async function getConversation(userId, id) {
  const { rows } = await pool.query('SELECT * FROM conversations WHERE id = $1 AND user_id = $2', [id, userId]);
  const conversation = rows[0];
  if (!conversation) return null;

  const { rows: messages } = await pool.query(
    'SELECT role, text FROM messages WHERE conversation_id = $1 AND user_id = $2 ORDER BY sort_order', [id, userId]
  );
  conversation.messages = messages;

  const { rows: snippets } = await pool.query(
    'SELECT message_index AS "messageIndex", role, language, code, detected FROM code_snippets WHERE conversation_id = $1 AND user_id = $2 ORDER BY id', [id, userId]
  );
  conversation.codeSnippets = snippets;

  return conversation;
}

async function deleteConversation(userId, id) {
  await pool.query('DELETE FROM conversations WHERE id = $1 AND user_id = $2', [id, userId]);
}

async function getStats(userId) {
  const { rows: [stats] } = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM conversations WHERE user_id = $1) AS conversations,
      (SELECT COUNT(*) FROM code_snippets WHERE user_id = $1) AS "codeSnippets",
      (SELECT COUNT(*) FROM messages WHERE user_id = $1) AS messages
  `, [userId]);
  return { conversations: Number(stats.conversations), codeSnippets: Number(stats.codeSnippets), messages: Number(stats.messages) };
}

async function searchMessages(userId, query, { limit = 50 } = {}) {
  const { rows } = await pool.query(`
    SELECT m.conversation_id, m.role, m.text, m.sort_order,
           c.title AS conversation_title, c.platform, c.captured
    FROM messages m
    JOIN conversations c ON c.id = m.conversation_id AND c.user_id = m.user_id
    WHERE m.user_id = $1 AND m.text ILIKE $2
    ORDER BY c.captured DESC
    LIMIT $3
  `, [userId, `%${query}%`, limit]);
  return rows;
}

module.exports = {
  pool,
  migrate,
  generateApiKey,
  findUserByEmail,
  findUserById,
  findUserByApiKey,
  createUser,
  updateUserPassword,
  updateUserApiKey,
  getApiKey,
  upsertConversation,
  listConversations,
  getConversation,
  deleteConversation,
  getStats,
  searchMessages,
};
