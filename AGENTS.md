# Project Instructions

## Scope and safety

- Work only inside this repository. Do not read, write, execute, or inspect paths outside the repository root.
- Do not install or run Node.js, npm, npx, pnpm, yarn, Python, or project toolchains on the host machine.
- Use the repository Docker setup for project installation, development, checks, and builds.
- Do not fetch, push, publish, deploy, or change a Git remote without explicit approval in the current request.
- Do not use destructive commands unless explicitly requested.
- Do not remove or overwrite user work unrelated to the current task.

## Preserve the baseline

- `main` starts from the upstream `e685e87` baseline. Treat it as the source of truth until a deliberate change is made.
- Preserve the original application's behavior, visual language, editor interactions, and dependency choices.
- Prefer the smallest change that achieves the requested behavior.
- Do not use static export as a reason to rewrite the application.
- If a static export requires a broad refactor, stop and compare it with running the original Next.js application in Docker on a VPS.
- Existing CDN references, analytics, fonts, and browser integrations may remain while the application is being stabilized.
- New dependencies, dependency upgrades/removals, framework changes, state changes, and deployment changes require explicit approval.

## Toolchain

- Node.js and npm are build-time tools only and run inside Docker or CI.
- The current dependency tree requires `npm install --force` with modern npm because React 19 and the optional Zustand peer declare incompatible peer ranges. Do not silently change package versions to hide this.
- The Docker image is intentionally self-contained and does not bind-mount the source tree. Rebuild the image after source changes.
- Do not run `npm install` on the host.

## Shell and canonical Docker commands

- Run shell tools with the repository as the current directory and `workdir: "."`.
- Use repository-relative paths. Do not use `cd`, repeat the absolute workspace path, or inspect paths outside the repository.
- Use the exact command forms below so routine Docker operations match the project allowlist. Do not reorder arguments or add flags without approval.
- Inspect Compose configuration with `docker compose config --quiet`.
- Inspect running services with `docker compose ps` or `docker compose logs app`.
- Rebuild the application image with `docker compose build app`.
- Run checks with `docker compose run --rm app npm run lint`.
- Validate the export build with `docker compose run --rm app npm run build`.
- Start development with `docker compose up -d app`.
- Start the static preview with `docker compose --profile static up -d static`.
- Generate a persistent export with `docker compose run --name mems-catalans-static-export app npm run build`.
- Clear the disposable host export before copying with `rm -rf ./out/*`.
- Copy that export with `docker cp mems-catalans-static-export:/workspace/out/. ./out/`.
- Remove only that disposable export container with `docker rm mems-catalans-static-export`.
- Any other Docker command requires approval.

## Language

- Keep source code, identifiers, technical comments, and technical documentation in English.
- Keep `CHANGELOG.md` in Catalan because it is product-facing release documentation.
- The product interface and user-facing content currently run in Catalan (`ca`).
- English locale files may remain as upstream reference material only; French is not part of the runtime.
- Meme names, tags, keywords, and catalogue choices are product-content work and remain unchanged during the initial locale migration.

## Workflow

1. Read this file and the relevant architecture decision before editing.
2. Inspect existing code and reuse its patterns.
3. Make focused edits with `apply_patch`.
4. Run project commands through Docker only.
5. For static export, inspect the generated artifact and serve it with a plain static server.
6. Report changed files, validation commands, failures, and deferred decisions.

## Versioning and releases

- Use Semantic Versioning for product releases. The current stabilized baseline starts at `0.1.0`.
- A change to `package.json` does not automatically require a release tag. Dependency, script, or configuration changes remain untagged until a release is intentionally prepared.
- Release preparation updates `package.json`, the root version fields in `package-lock.json`, and `CHANGELOG.md` together in one commit.
- Keep future work under the `[No publicat]` section of `CHANGELOG.md`. Record product-relevant changes, not every internal commit.
- Run the canonical Docker lint and build checks before creating a release tag.
- Create immutable annotated tags with the `v` prefix, such as `v0.1.0`, on the validated release commit. Never move or delete a published tag.
- Use patch releases for corrections, minor releases for compatible product features, and canary suffixes only for deliberately published previews.

## Approval boundaries

Ask before:

- Adding, removing, or upgrading dependencies or Docker base images.
- Changing the framework, architecture, routing model, state model, or deployment target.
- Running a previously unused command that may be destructive, remote, or resource-intensive.
- Touching Git remotes, publishing, deploying, or changing GitHub settings.
- Deleting upstream source files.

Routine read-only inspection and edits inside the repository may be performed autonomously.
