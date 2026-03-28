import fs from 'node:fs/promises';
import path from 'node:path';

const repoRoot = path.resolve(process.cwd());
const logsDir = path.join(repoRoot, 'logs', 'conversations');
const outFile = path.join(repoRoot, 'app', 'data', 'conversations.json');

// Match single-word roles only (User, Assistant, Message, conversation, Unknown, etc.)
// Multi-word headings like "## App Name" or "## Core Entities" are content inside messages, not role markers.
const conversationHeadingRegex = /^##\s+([A-Za-z]+)\s*$/gm;
const metadataRegex = /^-\s+([^:]+):\s*(.+)$/gm;
const codeFenceRegex = /```([a-zA-Z0-9_+-]*)\n([\s\S]*?)```/g;
// Inline backtick code: `expression` — min 5 chars to skip word emphasis like `foo`
const inlineCodeRegex = /`([^`\n]{5,})`/g;

// Returns true if a single line looks like code
function isCodeLine(line) {
  const t = line.trim();
  if (!t) return false;
  if (/^[$>]\s/.test(t)) return true;                         // shell: $ cmd  or  > output
  if (/^#!/.test(t)) return true;                              // shebang #!/usr/bin/env
  if (/^\s{4,}\S/.test(line) || /^\t\S/.test(line)) return true; // 4-space / tab indent
  if (/^(function|def\s|class\s|import\s|from\s|const\s|let\s|var\s|return\s|async\s|await\s|export\s|require\s*\(|include\s|use\s|pub\s|fn\s|impl\s|package\s|struct\s|enum\s|interface\s|type\s|switch\s*\(|case\s|try\s*\{|catch\s*\(|throw\s|new\s)/.test(t)) return true;
  if (/[{};]$/.test(t) && t.length > 2) return true;          // line ending with { } ;
  if (/=>|->|::|===|!==|&&|\|\|/.test(t)) return true;        // common operators
  return false;
}

// Returns true if the message text contains ≥2 consecutive code-like lines
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

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function parseMetadata(md) {
  const metadata = {};
  const headerSection = md.split('\n---\n')[0] ?? '';
  for (const match of headerSection.matchAll(metadataRegex)) {
    metadata[match[1].trim().toLowerCase()] = match[2].trim();
  }
  return metadata;
}

function parseMessages(md) {
  const body = md.split('\n---\n').slice(1).join('\n---\n');
  const headings = [...body.matchAll(conversationHeadingRegex)];

  if (!headings.length) return [];

  return headings.map((match, index) => {
    const role = match[1].trim();
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < headings.length ? (headings[index + 1].index ?? body.length) : body.length;
    const text = body.slice(start, end).trim();
    return { role, text };
  });
}

function parseDocument(filePath, md) {
  const metadata = parseMetadata(md);
  const messages = parseMessages(md);

  const conversationId = metadata['conversation id'] ?? path.basename(filePath, '.md');
  const title = metadata.title ?? path.basename(filePath, '.md');
  const captured = metadata.captured ?? null;
  const platform = metadata.platform ?? inferPlatform(filePath);

  const codeSnippets = [];
  messages.forEach((message, messageIndex) => {
    // 1. Fenced code blocks  ```lang\ncode\n```  — definite code
    const fenced = [...message.text.matchAll(codeFenceRegex)];
    for (const match of fenced) {
      codeSnippets.push({
        messageIndex,
        role: message.role,
        language: match[1] || 'plaintext',
        code: match[2].trim(),
      });
    }

    // 2. Inline backtick expressions  `expr`  — one entry per message listing all unique expressions
    if (!fenced.length) {
      const seen = new Set();
      const unique = [];
      for (const match of message.text.matchAll(inlineCodeRegex)) {
        const code = match[1].trim();
        if (!seen.has(code)) { seen.add(code); unique.push(code); }
      }
      if (unique.length > 0) {
        codeSnippets.push({
          messageIndex,
          role: message.role,
          language: 'inline',
          code: unique.join('\n'),   // all expressions, one per line
          detected: true,
        });
      }
    }

    // 3. Heuristic: no formal code but ≥2 consecutive code-like lines — one entry per message
    const hasAny = fenced.length > 0 || [...message.text.matchAll(inlineCodeRegex)].length > 0;
    if (!hasAny && looksLikeCode(message.text)) {
      codeSnippets.push({
        messageIndex,
        role: message.role,
        language: 'detected',
        code: message.text.slice(0, 500),
        detected: true,
      });
    }
  });

  return {
    id: conversationId,
    title,
    platform,
    captured,
    url: metadata.url ?? null,
    sourcePath: path.relative(repoRoot, filePath).replace(/\\/g, '/'),
    messages,
    codeSnippets,
  };
}

function inferPlatform(filePath) {
  const normalized = filePath.toLowerCase();
  if (normalized.includes('claudeai')) return 'claudeai';
  if (normalized.includes('claude-code')) return 'claude-code';
  if (normalized.includes('chatgpt')) return 'chatgpt';
  if (normalized.includes('codex')) return 'codex';
  if (normalized.includes('copilot')) return 'copilot';
  if (normalized.includes('cline')) return 'cline';
  return 'unknown';
}

function sortByCapturedDesc(items) {
  return items.sort((a, b) => {
    const aTime = a.captured ? Date.parse(a.captured) : 0;
    const bTime = b.captured ? Date.parse(b.captured) : 0;
    return bTime - aTime;
  });
}

function getConversationKey(doc) {
  // Tampermonkey guarantees one canonical file per Conversation ID.
  // Use ID as the source-of-truth key to attach continuations/snapshots.
  return doc.id;
}

async function main() {
  const allFiles = await walk(logsDir);
  const snapshots = [];
  const conversations = [];

  for (const filePath of allFiles) {
    const md = await fs.readFile(filePath, 'utf8');
    const doc = parseDocument(filePath, md);
    if (filePath.includes(`${path.sep}snapshots${path.sep}`)) {
      snapshots.push(doc);
    } else {
      conversations.push(doc);
    }
  }

  // Group folder-based snapshots by platform + conversation ID
  const snapshotsByConversation = new Map();
  snapshots.forEach((snapshot) => {
    const key = getConversationKey(snapshot);
    const list = snapshotsByConversation.get(key) ?? [];
    list.push(snapshot);
    snapshotsByConversation.set(key, list);
  });

  // Deduplicate files sharing the same Conversation ID.
  // The most complete file (most messages) becomes the main conversation.
  // If message counts are equal, the latest-captured file wins.
  // Less complete files are treated as snapshots.
  const convById = new Map();
  conversations.forEach((doc) => {
    const key = getConversationKey(doc);
    const existing = convById.get(key);
    if (!existing) {
      convById.set(key, doc);
    } else {
      const existingTime = existing.captured ? Date.parse(existing.captured) : 0;
      const docTime = doc.captured ? Date.parse(doc.captured) : 0;
      const docIsMoreComplete =
        doc.messages.length > existing.messages.length ||
        (doc.messages.length === existing.messages.length && docTime > existingTime);
      if (docIsMoreComplete) {
        // doc is more complete → it becomes the main; existing becomes a snapshot
        const extra = snapshotsByConversation.get(key) ?? [];
        extra.push(existing);
        snapshotsByConversation.set(key, extra);
        convById.set(key, doc);
      } else {
        // existing is more complete → doc becomes a snapshot
        const extra = snapshotsByConversation.get(key) ?? [];
        extra.push(doc);
        snapshotsByConversation.set(key, extra);
      }
    }
  });

  const deduplicatedConversations = Array.from(convById.values());
  const autoSnapshotCount = deduplicatedConversations.reduce(
    (sum, c) => sum + (snapshotsByConversation.get(getConversationKey(c)) ?? []).filter(s => !snapshots.includes(s)).length,
    0
  );

  const combinedConversations = sortByCapturedDesc(deduplicatedConversations).map((conversation) => ({
    ...conversation,
    snapshots: sortByCapturedDesc(snapshotsByConversation.get(getConversationKey(conversation)) ?? []),
  }));

  const allCodeSnippets = [];
  combinedConversations.forEach((conversation) => {
    conversation.codeSnippets.forEach((snippet, snippetIndex) => {
      allCodeSnippets.push({
        id: `${conversation.platform}::${conversation.id}::${snippetIndex}`,
        conversationId: conversation.id,
        conversationTitle: conversation.title,
        platform: conversation.platform,
        captured: conversation.captured,
        ...snippet,
      });
    });

    conversation.snapshots.forEach((snapshot) => {
      snapshot.codeSnippets.forEach((snippet, snippetIndex) => {
        allCodeSnippets.push({
          id: `${conversation.platform}::${snapshot.id}::snapshot::${snippetIndex}::${snapshot.captured ?? 'unknown'}`,
          conversationId: conversation.id,
          conversationTitle: conversation.title,
          platform: conversation.platform,
          captured: snapshot.captured ?? conversation.captured,
          fromSnapshot: true,
          snapshotCaptured: snapshot.captured,
          ...snippet,
        });
      });
    });
  });

  const totalSnapshots = snapshots.length + autoSnapshotCount;

  const payload = {
    generatedAt: new Date().toISOString(),
    stats: {
      conversations: combinedConversations.length,
      snapshots: totalSnapshots,
      codeSnippets: allCodeSnippets.length,
    },
    conversations: combinedConversations,
    codeSnippets: sortByCapturedDesc(allCodeSnippets),
  };

  await fs.writeFile(outFile, JSON.stringify(payload, null, 2));
  console.log(`Generated ${path.relative(repoRoot, outFile)} with ${payload.stats.conversations} conversations (${totalSnapshots} snapshots linked).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
