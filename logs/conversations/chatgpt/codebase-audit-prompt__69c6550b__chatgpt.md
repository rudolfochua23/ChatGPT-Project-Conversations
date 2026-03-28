# Conversation Log

- Platform: chatgpt
- Conversation ID: 69c6550b-2bdc-8321-8f52-7f92202a79da
- Title: Codebase Audit Prompt
- Captured: 2026-03-27T15:37:04.923Z
- URL: https://chatgpt.com/c/69c6550b-2bdc-8321-8f52-7f92202a79da

---

## User

in claude, whats the best prompt to say that i want it to recheck again the whole codebase for missing scripts/codes or features that might be forgotten after the code restructure or update?

## Assistant

You want something that’s clear, structured, and forces Claude to audit deeply, not just skim. The key is to make it act like a reviewer + QA engineer + code archaeologist.

Here’s a strong prompt you can use (and reuse):

✅ Recommended Prompt
Act as a senior software engineer performing a full codebase audit after a major refactor/restructure.

Your task is to carefully recheck the entire codebase for anything that may have been missed, broken, or left behind.

Specifically:

1. Identify missing or orphaned scripts, modules, or files that are no longer connected but may still be required.
2. Detect features or functionality that existed before but may have been accidentally removed or not fully reimplemented.
3. Check for broken imports, unused dependencies, or incorrect references.
4. Look for incomplete integrations between components (frontend, backend, APIs, services, etc.).
5. Identify TODOs, placeholders, or partially implemented logic that may have been overlooked.
6. Highlight inconsistencies in naming, structure, or architecture introduced during the refactor.
7. Suggest any features or edge cases that are likely missing based on the current structure.

Be thorough and systematic. Do not assume anything is correct.

For each issue:
- Explain what’s wrong
- Why it might have been missed
- The potential impact
- Suggested fix

If possible, infer the intended architecture and point out deviations.
🔥 Pro tip (makes it MUCH better)

Add this at the end if your codebase is large:

Work step-by-step. Start by mapping the project structure, then analyze each module systematically before giving a final report.
⚡ Even stronger (if Claude supports it)

If you can paste file tree or context:

Here is the project structure:
[paste tree]

Now perform the audit.
Why this works

Forces systematic thinking (not shallow answers)

Covers missing features + broken logic + architecture drift

Makes Claude act like a reviewer, not a coder

If you want, I can tailor this prompt specifically for your stack (e.g., React + Node, Laravel, Python, etc.) so it catches even more subtle issues.

## User

all i want is a simple prompt to check if i claude chat missed something based on the rules or historically from recent versions an not a huge prompt

## Assistant

Got it—you want something short but still effective, not a full audit script.

Here are a few clean, simple options you can use:

👍 Best simple version
Recheck the entire codebase and recent changes. Identify anything that might have been missed, broken, or not fully implemented based on previous versions or intended functionality.
🔎 Slightly clearer (still short)
Review the codebase again and compare it with recent changes/history. Point out any missing features, incomplete logic, or things that may have been overlooked after the update.
⚡ Minimal but effective
Double-check everything and tell me if anything important is missing, broken, or incomplete compared to earlier versions.

If you want just a tiny upgrade without making it long, this is probably the sweet spot:

Recheck the codebase against recent changes and intended functionality. Highlight anything missing, broken, or overlooked.

