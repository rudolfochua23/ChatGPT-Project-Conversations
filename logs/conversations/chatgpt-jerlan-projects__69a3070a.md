# ChatGPT Conversation Log

- Conversation ID: 69a3070a-9208-8320-bdf2-80465fbea52f
- Title: ChatGPT - Jerlan Projects
- Captured: 2026-02-28T15:20:37.229Z
- URL: https://chatgpt.com/g/g-p-698ace27fcb08191853e12827657b08e-jerlan-projects/c/69a3070a-9208-8320-bdf2-80465fbea52f?tab=chats

---

## User

We are continuing my Spec-Driven AI Mega App Platform.

This is not a random project.
This is a governed, production-aligned, reusable AI-driven architecture system.

You must understand the entire architecture before generating anything.

===============================
PLATFORM PHILOSOPHY
===============================

- inputs.yml is the Single Source of Truth.
- project.memory.md stores architectural non-negotiables.
- No code generation may contradict those files.
- Feature updates must not regenerate the entire repo.
- OSS-first only.
- Compose-first for dev/staging/prod.
- Kubernetes-ready scaffold only (not required for staging).
- Devcontainer-first development.
- No docker-compose-plugin inside container.
- Compose runs from HOST only.

===============================
TECH STACK
===============================

Monorepo:
- pnpm workspaces
- turbo

Web:
- Next.js App Router
- TailwindCSS
- shadcn/ui
- shadcnstudio-style dashboard layout
- Strict hydration boundaries:
    - layout.tsx + page.tsx are server-only
    - interactive logic only in *.client.tsx
    - shadcn/ui only in client components
    - hydration lint must pass

API:
- NestJS (TypeScript)
- Global ValidationPipe
- Rate limiting
- RBAC scaffold
- OIDC integration (Keycloak)

Database:
- Postgres
- Prisma ORM
- Prisma migrations
- No sync:true
- Proper migration workflow

Caching / Realtime:
- Redis

Auth:
- Keycloak (admin/admin for dev)
- OIDC PKCE flow
- Role-based access control

Object Storage:
- MinIO (admin/admin for dev)
- S3-compatible
- Presigned upload pattern (files never pass through API)

Logging:
- Pino (nestjs-pino)
- requestId correlation
- JSON logs in prod
- pretty logs in dev

Background Processing:
- BullMQ
- Redis-backed queue
- Outbox pattern
- Idempotency
- Retry with backoff

Offline Strategy:
- When enabled in inputs.yml:
    - Outbox writes first
    - Auto-sync on reconnect
    - No last-write-wins corruption

===============================
INFRA RULES
===============================

- docker-compose.yml for:
    - postgres
    - redis
    - keycloak
    - minio

- Compose is executed on host.
- Devcontainer does NOT install docker-compose-plugin.
- Devcontainer only installs:
    - pnpm
    - git
    - curl
    - netcat

===============================
SECURITY MODEL
===============================

- No hardcoded URLs.
- No secrets in repo.
- All configuration from environment.
- Strict validation of inputs.yml via schema.
- CI must fail if:
    - inputs.yml invalid
    - hydration violations exist
    - build fails

===============================
WORKFLOW MODEL
===============================

New Project Flow:
1) Define app features.
2) Generate inputs.yml + inputs.schema.json.
3) Generate monorepo scaffold.
4) Add Prisma + migrations.
5) Add infra compose.
6) Add structured logging.
7) Add presigned uploads.
8) Add background jobs.
9) Feature updates modify minimal code only.

Feature Update Flow:
- Edit inputs.yml.
- Run alignment check.
- Apply targeted updates.
- Do NOT regenerate whole repo.

===============================
NON-NEGOTIABLES
===============================

- No devcontainer features.
- No docker-compose-plugin install.
- No hydration boundary violations.
- No regeneration during feature updates.
- No environment-specific branching in code.
- No last-write-wins offline corruption.
- No monolithic hallucinated mega-file generation.

===============================
CURRENT STATE
===============================

We are starting or continuing a project built on this base platform.

Before generating code:
1) Ask if inputs.yml exists.
2) Ask if project.memory.md exists.
3) Ask if this is new project or feature update.

Do not assume anything.

From this point forward, operate under these rules strictly.

## Assistant

Understood. I’m operating under your governed platform rules (inputs.yml as SSOT, project.memory.md as non-negotiables, minimal-diff feature updates, OSS-first, host-run Compose, devcontainer constraints, hydration boundaries, etc.). I will not generate any code until we establish the repo state via your required checks.

To proceed:

Does inputs.yml exist right now in this repo? (Yes/No)

Does project.memory.md exist right now in this repo? (Yes/No)

Is this a new project initialization or a feature update to an existing project? (New / Update)

If you answer those three, I’ll follow the correct flow (new project vs minimal targeted update) without regenerating anything.

## User

Answer:
1. No
2. No
3. Yes

