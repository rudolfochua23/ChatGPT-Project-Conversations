# ChatGPT Conversation Log

- Conversation ID: 699f2c6a-e30c-8321-830a-259ac286b5ef
- Title: Jerlan Projects - Devcontainer pnpm error fix
- Captured: 2026-02-26T15:10:03.702Z
- URL: https://chatgpt.com/g/g-p-698ace27fcb08191853e12827657b08e/c/699f2c6a-e30c-8321-830a-259ac286b5ef

---

## User

i got this error inside devcontainer:

efa69e824bca% pnpm install
 ERR_PNPM_NO_PKG_MANIFEST  No package.json found in /workspace
efa69e824bca% pnpm check:spec:dev
 ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND  No package.json (or package.yaml, or package.json5) was found in "/workspace".

## Assistant

That error is very straightforward:

No package.json found in /workspace

It means you’re not inside a Node.js project directory. pnpm requires a package.json in the current folder.

Right now your devcontainer working directory is:

Code
/workspace

And that folder does not contain a package.json.

✅ Why This Happens in Devcontainers

Common reasons:

You opened the container but your project folder wasn't mounted.

Your repo files are inside a subfolder like:

Code
/workspace/app
/workspace/project
/workspace/frontend

You cloned the repo outside the container.

The devcontainer.json workspaceFolder is misconfigured.

🔍 Step 1 — Check What’s Inside /workspace

Run:

Bash
ls -la

If you don’t see package.json, then check for subfolders:

Bash
ls -la */

If you see something like:

Code
frontend/
backend/
my-app/

Go inside the correct one:

Bash
cd frontend
pnpm install
🧠 Step 2 — If There’s No Project at All

If /workspace is empty, then your project was not mounted.

Check:

Bash
pwd

Then:

Bash
ls

If empty → your devcontainer is not attached to your repo.

🛠 Step 3 — Fix Devcontainer Mount (Very Common)

Open .devcontainer/devcontainer.json and check:

JSON
"workspaceFolder": "/workspace"

Make sure your repo is actually mounted there.

Usually it should include:

JSON
"workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind"

If not, that’s the issue.

After fixing:

Rebuild container

Reopen in container

🚀 Step 4 — If You Haven’t Initialized a Project Yet

If this is a new project, create one:

Bash
pnpm init
pnpm install

Or for Next.js:

Bash
pnpm create next-app .
🧩 Why pnpm check:spec:dev Failed

This error:

Code
ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND

Means there is no package.json containing:

JSON
"scripts": {
  "check:spec:dev": "..."
}

So pnpm has no script to run.

⚡ Quick Diagnosis Command

Run this and show me the output:

Bash
pwd
ls -la

That will tell us immediately what’s wrong.

If you tell me:

Are you using VSCode devcontainers?

Is this a cloned repo?

What framework (Next.js, Vite, Express, etc.)?

I’ll give you the exact fix.

