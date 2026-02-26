# ChatGPT Conversation Log

- Conversation ID: 69a014ac-5a94-8323-8e42-cd39da3cd32e
- Title: Jerlan Projects - New Chat Request
- Captured: 2026-02-26T14:54:51.091Z
- URL: https://chatgpt.com/g/g-p-698ace27fcb08191853e12827657b08e-jerlan-projects/c/69a014ac-5a94-8323-8e42-cd39da3cd32e

---

## User

based on my previous AI-driven App Architecture, since the conversation there is too much now and the chat is running slow because of a lot of conversation. i want to create a new chat based on that. can you check it and can we start again? here's the link of the chat:

https://chatgpt.com/share/e/69a01495-b7a8-8004-8140-64f3153712bd

## Assistant

I can’t open ChatGPT-share links directly because I don’t have access to your private chat history or shared links. If you want to start a new chat based on your previous AI-driven App Architecture, there are two good ways we can do it:

✅ Option A — Paste the Relevant Content Here

Send the key content or architecture outline from your old chat. For example:

Architecture overview

Requirements & goals

Diagrams (text description)

Components & modules

Tech stack

APIs & workflows

You can paste it as text or bullet points, and I’ll use it to recreate a fresh, streamlined architecture in a new thread.

✅ Option B — Summarize What Matters Most

If the old chat is long, you can share a summary like:

What the app does

Core features

AI integrations

Problems you want help with

What you want the new architecture to fix

Even a list like that will help me rebuild a new, clean architecture for you.

Quick Example Template You Can Fill

Here’s a template you can use to paste or type:

Code
**App Name / Purpose:**
**Target Users:**
**Main Features:**
- Feature A
- Feature B
- Feature C

**AI Components / Workflows:**
- LLM usage
- Vision AI usage
- Agents
- Data pipelines

**Existing Tech Stack:**
- Frontend:
- Backend:
- Database:
- Cloud / Infra:

**Pain Points / What to Improve:**

Just share whichever you prefer — I’ll help you start a fresh, fast, organized new chat/architecture.

## User

Below is the recent prompt from my last converstation in the chat box:

Below is your Platform Identity Block (copy-paste into any new chat) that includes the fixes we learned from the issues you hit (devcontainer workspace path, PNPM_HOME, avoiding Dev Container “features”, and not requiring compose inside the container).

After that, I’m giving you the updated Fisherfolk IMS build prompts (the exact prompts you’ll run in the new chat, in order).

1) Platform Identity Block (paste as FIRST message in any new chat)
PLATFORM IDENTITY (Spec-Driven AI App Architecture)

This chat is for my reusable, spec-driven base platform. Treat it as an architecture system, not a one-off app.

NON-NEGOTIABLES (MUST FOLLOW)
1) inputs.yml is the Single Source of Truth (SoT).
   - All project-specific values live in inputs.yml only.
   - No hardcoded environment domains/URLs/IDs in code.

2) project.memory.md is architectural memory.
   - Read it before generating output.
   - Never contradict it.

3) Spec-driven workflow:
   - Add/change features by updating inputs.yml (and optional OpenSpec docs).
   - Use a “Feature Update” prompt to apply minimal code changes.
   - Do NOT regenerate the whole repo unless foundation changes.

4) Hydration-safe Next.js rules (prevents dead UI):
   - Next.js App Router.
   - app/layout.tsx and app/**/page.tsx are server components by default.
   - All interactivity (hooks, event handlers, charts, shadcn/ui imports) must live in *.client.tsx starting with 'use client'.
   - Enforce via hydration lint that fails CI.

TECH STACK (DEFAULT)
- Monorepo: pnpm + turbo
- Web: Next.js (App Router) + Tailwind + shadcn/ui + shadcnstudio-style dashboard shell
- API: NestJS (TypeScript)
- DB: Postgres
- Cache: Redis
- Auth: Keycloak (OIDC)
- Object storage: MinIO (S3-compatible)
- OSS-first, secure-by-default, performance-aware
- Compose-first for infra (dev/staging/prod), K8s-ready scaffold only (staging must NOT require K8s)

DEVCONTAINER RULES (CRITICAL FIXES)
- Devcontainer must be stable and not rely on Dev Container "features" (no Dockerfile-with-features).
- Do NOT install docker-compose-plugin via apt inside devcontainer (caused failures on Debian).
- Devcontainer should not require docker-compose inside container; run compose from host if needed.
- Use a simple devcontainer Dockerfile with PNPM_HOME set to prevent pnpm global install errors:
  - ENV PNPM_HOME="/usr/local/share/pnpm"
  - ENV PATH="$PNPM_HOME:$PATH"
  - corepack prepare pnpm@9.12.0
- Devcontainer workspaceFolder must match mount path (avoid “workspace does not exist”):
  - workspaceFolder: /workspaces/repo

GOVERNANCE / CI
- CI must run:
  - inputs.yml validation (schema)
  - hydration lint
- Outputs must include exact commands I need to run.
- Always label steps clearly:
  ✅ YOU NEED TO RUN THIS
  ❌ NO ACTION (EXPLANATION ONLY)

Now build the requested project using these rules.

That block ensures the next chat starts aligned and avoids the exact devcontainer mistakes you ran into.

2) Updated Fisherfolk IMS build prompts (use in the NEW chat)

You said: “From the new chat just give me the updated set of prompt for building the Fisherfolk IMS.”

Here are the exact prompts, in order, designed to avoid the earlier errors.

Prompt 0 — “Starter Files Checklist” (so you create only the minimum manually)

Paste this first:

I want to start the Fisherfolk Information Management System from scratch using the Platform Identity rules.

Before generating anything big:
1) Tell me the exact minimal files/folders I must create manually FIRST (with exact contents).
2) Then tell me the exact VS Code steps to open Devcontainer.
3) Only after that, give me the first Copilot prompt.

Remember:
- Devcontainer must NOT use features.
- workspaceFolder must be /workspaces/repo.
- PNPM_HOME must be set in Dockerfile.
- Do not require docker compose inside container.

✅ This makes the assistant output the minimal manual bootstrap you need.

Prompt 1 — Generate inputs.yml (Fisherfolk spec)

Once you have project.memory.md and an empty inputs.yml, paste:

SPEC SYNTHESIS — FISHERFOLK IMS (inputs.yml)

Read project.memory.md.

Generate a complete inputs.yml for:
Fisherfolk Information Management System (Calapan City)

Requirements:
- tenancy.mode = single
- capabilities.offline = all (outbox + auto-sync scaffolding)
- capabilities.realtime = all
- deployment.strategy = compose (infra later, not inside devcontainer)
- Web UI includes dashboard with charts + searchable recent table
- Include fisherfolk fields:
  - id_number
  - last_name, first_name, middle_name
  - date_of_birth
  - barangay_id (must reference reference_data barangays)
  - sex
  - signature_image (upload or draw)
  - profile_image (upload or camera, 1:1 crop)
  - rsbsa_number
  - category (6 predefined values)
  - contact_number (stored with +639)
  - is_president (boolean)
- Include reference_data:
  - categories (6 values)
  - barangays (use placeholder structure + I will paste the list next)

Output ONLY:
- Full inputs.yml content ready to paste
Prompt 2 — Generate devcontainer + baseline monorepo files (no features)

After you paste inputs.yml, paste:

BASELINE GENERATOR — DEVCONTAINER + MONOREPO (NO FEATURES)

Read inputs.yml and project.memory.md.

Create a stable devcontainer and monorepo baseline that avoids the previous issues:
- Devcontainer must NOT use "features" (no Dockerfile-with-features).
- workspaceFolder must be /workspaces/repo and must exist.
- Use a devcontainer Dockerfile that sets PNPM_HOME and PATH before any pnpm global usage:
  ENV PNPM_HOME="/usr/local/share/pnpm"
  ENV PATH="$PNPM_HOME:$PATH"
  corepack prepare pnpm@9.12.0
- Do NOT install docker-compose-plugin via apt.
- Do NOT require docker compose inside the container.

Then generate the monorepo scaffold:
- pnpm + turbo
- apps/web: Next.js App Router + Tailwind + shadcn/ui
- apps/api: NestJS
- packages/shared
- tools/hydration-lint.mjs enforcing:
  - no hooks/events/shadcn imports in page/layout
  - shadcn imports only in *.client.tsx
  - interactive files must have 'use client'
- CI workflow runs hydration lint + inputs validation

Output:
- Exact file tree
- Exact contents for every file created
- Exact commands I must run after reopening in devcontainer
Prompt 3 — Dashboard UI (matches screenshot) + Mock API endpoints

After devcontainer is working and pnpm install is done, paste:

FEATURE BUILD — DASHBOARD UI + MOCK DASHBOARD API

Read inputs.yml and project.memory.md.

Implement:
1) Web dashboard UI (dark, card grid) using shadcn/ui + shadcnstudio-style shell:
   - KPI summary cards (Total Registered, New, Renewal (optional), Inactive (optional))
   - Category tiles (6 categories)
   - Charts: by barangay bar, gender donut, age group bar, activity radial
   - Recently Registered table with search later
2) Hydration-safe:
   - app/dashboard/page.tsx must be server
   - charts + interactivity in Dashboard.client.tsx with 'use client'
3) API (NestJS) endpoints return MOCK data for now:
   - GET /dashboard/summary
   - GET /dashboard/category-counts
   - GET /dashboard/by-barangay
   - GET /dashboard/gender
   - GET /dashboard/age-groups
   - GET /dashboard/activity-categories
   - GET /fisherfolk/recent?limit=10
4) Must pass pnpm lint:hydration.

Output:
- changed files only
- commands I must run to test
Prompt 4 — Barangay list update + sync (your official list)

After you paste the official list into inputs.yml, paste:

FEATURE UPDATE — OFFICIAL BARANGAY LIST SYNC

Read inputs.yml and project.memory.md.

The official barangay list has been added under inputs.modules.reference_data.barangays.items.

Implement minimal updates:
- Ensure API reference_data uses these barangays consistently
- Ensure fisherfolk uses barangay_id referencing these IDs
- Ensure dashboard aggregations group by barangay_id and also return barangay name for UI
- Do NOT regenerate repo
- Must pass pnpm lint:hydration

Output:
- changed files only
- exact commands I must run
3) One thing to keep you unconfused every time

From now on, in the new chat, if something is just explanation, I’ll label it:

❌ NO ACTION (EXPLANATION ONLY)

and if you need to do something, I’ll label it:

✅ YOU NEED TO RUN THIS (and I’ll give the exact command or click path)

## Assistant

Got it — that text is already a solid “reboot kit.” Since we can’t reference the old slow chat anymore, here’s the clean way to restart immediately with zero ambiguity.

What to do now (in your brand-new chat)

✅ YOU NEED TO RUN THIS (copy/paste as your FIRST message in the new chat):
Paste exactly your Platform Identity Block (the whole thing starting from PLATFORM IDENTITY... down to Now build the requested project using these rules.)

That becomes the “system contract” for the new thread.

✅ YOU NEED TO RUN THIS (copy/paste as your SECOND message):
Paste Prompt 0 — Starter Files Checklist (the one that asks for minimal files, VS Code devcontainer steps, then the first Copilot prompt).

From there, you’ll proceed Prompt 1 → Prompt 2 → Prompt 3 → Prompt 4 exactly as written.

Optional: a tighter “single message” starter (if you want faster alignment)

If you’d rather not paste two blocks separately, you can paste this as ONE message in the new chat (it preserves your rules but also kicks off Prompt 0 immediately):

Markdown
PLATFORM IDENTITY (Spec-Driven AI App Architecture)

This chat is for my reusable, spec-driven base platform. Treat it as an architecture system, not a one-off app.

NON-NEGOTIABLES (MUST FOLLOW)
1) inputs.yml is the Single Source of Truth (SoT).
   - All project-specific values live in inputs.yml only.
   - No hardcoded environment domains/URLs/IDs in code.

2) project.memory.md is architectural memory.
   - Read it before generating output.
   - Never contradict it.

3) Spec-driven workflow:
   - Add/change features by updating inputs.yml (and optional OpenSpec docs).
   - Use a “Feature Update” prompt to apply minimal code changes.
   - Do NOT regenerate the whole repo unless foundation changes.

4) Hydration-safe Next.js rules (prevents dead UI):
   - Next.js App Router.
   - app/layout.tsx and app/**/page.tsx are server components by default.
   - All interactivity (hooks, event handlers, charts, shadcn/ui imports) must live in *.client.tsx starting with 'use client'.
   - Enforce via hydration lint that fails CI.

TECH STACK (DEFAULT)
- Monorepo: pnpm + turbo
- Web: Next.js (App Router) + Tailwind + shadcn/ui + shadcnstudio-style dashboard shell
- API: NestJS (TypeScript)
- DB: Postgres
- Cache: Redis
- Auth: Keycloak (OIDC)
- Object storage: MinIO (S3-compatible)
- OSS-first, secure-by-default, performance-aware
- Compose-first for infra (dev/staging/prod), K8s-ready scaffold only (staging must NOT require K8s)

DEVCONTAINER RULES (CRITICAL FIXES)
- Devcontainer must be stable and not rely on Dev Container "features" (no Dockerfile-with-features).
- Do NOT install docker-compose-plugin via apt inside devcontainer.
- Devcontainer should not require docker-compose inside container; run compose from host if needed.
- Use a simple devcontainer Dockerfile with PNPM_HOME set:
  - ENV PNPM_HOME="/usr/local/share/pnpm"
  - ENV PATH="$PNPM_HOME:$PATH"
  - corepack prepare pnpm@9.12.0
- Devcontainer workspaceFolder must match mount path:
  - workspaceFolder: /workspaces/repo

GOVERNANCE / CI
- CI must run:
  - inputs.yml validation (schema)
  - hydration lint
- Outputs must include exact commands I need to run.
- Always label steps clearly:
  ✅ YOU NEED TO RUN THIS
  ❌ NO ACTION (EXPLANATION ONLY)

Now start with this:

I want to start the Fisherfolk Information Management System from scratch using the Platform Identity rules.

Before generating anything big:
1) Tell me the exact minimal files/folders I must create manually FIRST (with exact contents).
2) Then tell me the exact VS Code steps to open Devcontainer.
3) Only after that, give me the first Copilot prompt.

Remember:
- Devcontainer must NOT use features.
- workspaceFolder must be /workspaces/repo.
- PNPM_HOME must be set in Dockerfile.
- Do not require docker compose inside container.

If you want, paste here what you currently have in your repo (even just ls -la output + whether you’re using /workspace or /workspaces/repo right now), and I’ll tailor Prompt 0 so you don’t repeat the PNPM/manifest issue again.

## User

ok this what happens after running the project  with the 1st prompt already executed. it shows an error and I ask copilot to summarize the root cause of having this error everytime I run the project for the first time in devcontainer:

## Known pitfalls (add this entry)
- Devcontainer remoteUser: node causes VS Code to auto-inject chown for
  /usr/local/share/.corepack. If the base image doesn't create that directory,
  the build fails. Fix: add mkdir -p /usr/local/share/.corepack in the
  Dockerfile before any chown or ownership-fix step.

## Assistant

Yep — that diagnosis is real, and the fix you wrote is the right kind of “pitfall” entry.

What’s happening is:

When you set remoteUser: node in devcontainer.json, VS Code’s Dev Containers tooling tries to ensure certain tooling directories are owned by that user.

For Node/Corepack, it may auto-add an ownership fix (chown) for /usr/local/share/.corepack during build.

Some base images don’t have /usr/local/share/.corepack created yet, so the injected chown hits a “No such file or directory” and the first build fails.

✅ The permanent fix (do this once in the Dockerfile)

Add this early in your devcontainer Dockerfile, before any corepack or anything that might trigger ownership steps:

dockerfile
RUN mkdir -p /usr/local/share/.corepack

If you want it extra safe (covers pnpm home + corepack dir in one go):

dockerfile
RUN mkdir -p /usr/local/share/.corepack /usr/local/share/pnpm
✅ Best-practice ordering (recommended snippet)

Put this near the top of the Dockerfile:

dockerfile
ENV PNPM_HOME="/usr/local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN mkdir -p /usr/local/share/.corepack /usr/local/share/pnpm

RUN corepack enable
RUN corepack prepare pnpm@9.12.0 --activate
✅ Add to your project memory (so you never forget)

Add exactly what you wrote under your “Known pitfalls” section in project.memory.md.

If you paste your current devcontainer.json + devcontainer Dockerfile, I can tell you the exact safest place to insert the mkdir -p so it won’t get reordered by layer caching or tooling.

## User

devcontainer.json
File
Dockerfile
File
- attached here are the devcontainer and Dockerfile already fixed by copilot.
- from that working files i want you to create a new fresh AI driven prompt
- make a clear input file (inputs.yml) for what should be filled up and make a default values 
- maintain top of the line, latest, scalable prompt for any project to build based on inputs.yml features and ideas for the app to be build

## Assistant

According to a document from (today), your devcontainer.json is already in the “good” shape we want for a reusable platform baseline: builds from Dockerfile, no Dev Container features, workspaceFolder /workspaces/repo, and remoteUser: node. 

devcontainer

Below is a fresh, reusable AI-driven prompt pack + a clear inputs.yml template (with sane defaults) that you can use for any project. It keeps your spec-driven workflow, hydration safety, and devcontainer stability (including the .corepack pitfall you discovered).

1) New “Platform Identity Block v2” (paste as FIRST message in any new chat)
Markdown
PLATFORM IDENTITY v2 — Spec-Driven AI App Builder (Inputs-First)

This chat is for building production-grade apps from a single spec file: inputs.yml.
Treat this as an architecture system, not a one-off answer.

NON-NEGOTIABLES
1) inputs.yml is the Single Source of Truth (SoT)
   - All project-specific values live ONLY in inputs.yml.
   - No hardcoded domains/URLs/IDs/secrets in code.

2) project.memory.md is architectural memory
   - Read it before generating output.
   - Never contradict it; append new “Known pitfalls” entries when discovered.

3) Spec-driven workflow
   - Add/change features by editing inputs.yml (and optional /spec docs).
   - Apply changes via “FEATURE UPDATE” prompts with minimal diffs.
   - Never regenerate the repo unless foundation changes.

4) Hydration-safe Next.js (App Router)
   - app/layout.tsx and app/**/page.tsx are SERVER components by default.
   - All interactivity (hooks, event handlers, charts, shadcn/ui imports) must live in *.client.tsx starting with 'use client'.
   - Enforce with a hydration lint script that fails CI.

DEFAULT STACK (override only via inputs.yml)
- Monorepo: pnpm + turbo
- Web: Next.js App Router + Tailwind + shadcn/ui + dashboard shell
- API: NestJS (TypeScript)
- DB: Postgres
- Cache: Redis
- Auth: Keycloak (OIDC)
- Object storage: MinIO (S3)
- Compose-first infra (dev/staging/prod), K8s-ready scaffold only (staging must NOT require K8s)

DEVCONTAINER RULES (stability-first)
- NO Dev Container “features”.
- workspaceFolder MUST be /workspaces/repo.
- Do NOT require docker compose inside container.
- PNPM_HOME must be set in Dockerfile:
  ENV PNPM_HOME="/usr/local/share/pnpm"
  ENV PATH="$PNPM_HOME:$PATH"
- Known pitfall (remoteUser: node):
  Ensure /usr/local/share/.corepack exists to avoid VS Code injected chown failures:
  RUN mkdir -p /usr/local/share/.corepack

GOVERNANCE / CI
- CI must run:
  - inputs.yml validation (schema)
  - hydration lint
- Every output must include exact commands to run.
- Label steps:
  ✅ YOU NEED TO RUN THIS
  ❌ NO ACTION (EXPLANATION ONLY)

Now build the requested project using these rules.
2) inputs.yml template (copy/paste, then fill values later)

This is intentionally generic, scalable, and “AI-buildable” for any app.

YAML
# inputs.yml — Single Source of Truth (SoT)
meta:
  spec_version: "2.0"
  generated_by: "spec-driven-ai-platform"
  environment_defaults:
    timezone: "Asia/Manila"
    locale: "en-PH"

project:
  name: "My App"
  slug: "my-app"
  description: "Replace with one sentence."
  domain:
    industry: "general"
    problem_statement: "What problem are we solving?"
    success_metrics:
      - "Example: weekly active users"
      - "Example: < 200ms p95 dashboard queries"

org:
  owner: "Your Name / Org"
  repo:
    provider: "github"
    name: "repo-name"
  compliance:
    data_classification: "internal" # public | internal | confidential
    pii: true
    audit_log_required: true

stack:
  monorepo:
    package_manager: "pnpm"
    pnpm_version: "9.12.0"
    turbo: true

  web:
    framework: "nextjs"
    nextjs_major: 15
    router: "app"
    ui:
      tailwind: true
      shadcn: true
      dashboard_shell: "shadcnstudio"
    hydration_policy:
      server_by_default: true
      client_components_suffix: ".client.tsx"
      require_use_client: true

  api:
    framework: "nestjs"
    language: "typescript"
    openapi: true

  data:
    database: "postgres"
    orm: "prisma" # prisma | typeorm | drizzle
    cache: "redis"
    object_storage: "minio"

  auth:
    provider: "keycloak"
    protocol: "oidc"

deployment:
  strategy: "compose" # compose | k8s-scaffold
  compose:
    profiles:
      - dev
      - staging
      - prod
  staging_requires_k8s: false

devcontainer:
  enabled: true
  workspaceFolder: "/workspaces/repo"
  remoteUser: "node"
  pnpm_home: "/usr/local/share/pnpm"
  corepack_dir: "/usr/local/share/.corepack"
  notes:
    - "No devcontainer features."
    - "No docker compose inside container."

ci:
  provider: "github-actions"
  checks:
    inputs_validation: true
    hydration_lint: true
    typecheck: true
    unit_tests: true

modules:
  web_app:
    enabled: true
    route_prefixes:
      dashboard: "/dashboard"
      auth: "/auth"

  api_service:
    enabled: true
    base_path: "/api"
    versioning: "uri" # uri | header | none

  reference_data:
    enabled: true
    managed_in_spec: true
    datasets: [] # add datasets with id/name/items

  storage:
    enabled: true
    buckets:
      - id: "public"
        access: "public-read"
      - id: "private"
        access: "private"

features:
  realtime:
    enabled: true
    mechanism: "websocket" # websocket | sse
  offline:
    enabled: false
    strategy: "outbox" # outbox | cache-only
  notifications:
    enabled: false
    channels: ["inapp"] # inapp | email | sms | push
  audit_log:
    enabled: true
  roles_permissions:
    enabled: true
    model: "rbac" # rbac | abac
  uploads:
    enabled: true
    types:
      - id: "image"
        max_mb: 10
        allowed_mime:
          - "image/jpeg"
          - "image/png"

data_model:
  entities: []
  # Example entity:
  # - name: "User"
  #   fields:
  #     - { name: "id", type: "uuid", primary: true }
  #     - { name: "email", type: "string", unique: true }
  #   relations: []

ui:
  theme:
    mode: "dark" # dark | light | system
  dashboard:
    enabled: true
    kpis: []
    charts: []
    tables: []

ai:
  enabled: true
  provider: "openai" # openai | azure-openai | none
  use_cases:
    - id: "spec_synthesis"
      enabled: true
    - id: "validation"
      enabled: true
    - id: "smart_search"
      enabled: false
  guardrails:
    pii_redaction: true
    prompt_injection_defense: true

observability:
  enabled: true
  logging: "pino" # pino | winston
  tracing: false
  metrics: false

security:
  secrets:
    store: "env" # env | vault
  headers:
    enabled: true
  rate_limit:
    enabled: true
    default_rpm: 120
3) New “Fresh Prompt Pack” (run these in order in the new chat)
Prompt A — Spec fill + default ideas (fast start)
Markdown
SPEC SYNTHESIS — GENERIC APP (inputs.yml)

Using the Platform Identity rules:
1) Ask me only the 8–12 most critical questions needed to finalize inputs.yml.
2) Meanwhile, propose 3 strong product directions (viral + scalable) that fit modern trends.
3) Output an updated inputs.yml with safe defaults + clearly marked TODOs.
Prompt B — Baseline generator (repo + CI + hydration lint)
Markdown
BASELINE GENERATOR — DEVCONTAINER + MONOREPO

Read inputs.yml and project.memory.md.
Generate:
- devcontainer (no features) + Dockerfile (PNPM_HOME + corepack dir fix)
- pnpm + turbo monorepo scaffold
- apps/web (Next.js App Router + Tailwind + shadcn/ui)
- apps/api (NestJS)
- packages/shared
- tools/hydration-lint (enforced in CI)
- inputs.yml schema validation in CI

Output:
- exact file tree
- exact file contents
- ✅ commands to run after reopening devcontainer
Prompt C — First vertical slice (UI + API + data)
Markdown
FEATURE BUILD — FIRST VERTICAL SLICE

Read inputs.yml and project.memory.md.
Implement the first user-visible slice:
- Web: dashboard shell + one primary flow
- API: real endpoints (or mock if requested) with DTOs + validation
- DB: Prisma schema + migrations
- Seed: reference_data if enabled
Must pass hydration lint + CI checks.

Output:
- changed files only
- ✅ commands to run
Prompt D — Feature updates (minimal diffs forever)
Markdown
FEATURE UPDATE — <FEATURE NAME>

Read inputs.yml and project.memory.md.
Apply only minimal changes required. Do NOT regenerate the repo.
Must pass hydration lint + CI checks.

Output:
- changed files only
- ✅ commands to run

If you want, paste your current inputs.yml goals (even rough), and I’ll immediately produce:

a filled inputs.yml customized to your next project, and

the exact “Prompt A → D” sequence tailored to it (without changing your working devcontainer baseline).

