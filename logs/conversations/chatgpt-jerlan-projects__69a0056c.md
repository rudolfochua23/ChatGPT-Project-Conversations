# ChatGPT Conversation Log

- Conversation ID: 69a0056c-0c6c-8323-8adf-0dba6a67ec74
- Title: ChatGPT - Jerlan Projects
- Captured: 2026-02-26T08:34:26.928Z
- URL: https://chatgpt.com/g/g-p-698ace27fcb08191853e12827657b08e-jerlan-projects/c/69a0056c-0c6c-8323-8adf-0dba6a67ec74

---

## User

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

