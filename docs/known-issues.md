# Known Issues

This document records non-blocking warnings and deferred technical work. It is
updated when a check changes, a deployment decision is made, or an issue is
resolved.

Last observed: 2026-08-15

## Build and Tooling

### DEP-001: inherited dependency vulnerabilities

- Observation: the Docker image install reports 32 vulnerabilities (3 low, 17 moderate, 12 high).
- Impact: lint and production builds pass; the application has not received an automatic dependency upgrade.
- Decision: defer `npm audit fix` and especially `npm audit fix --force` until dependency changes are reviewed explicitly.
- Resolution: review the dependency tree, identify direct versus transitive vulnerabilities, and update packages deliberately.

### NEXT-001: middleware convention deprecated

- Observation: Next.js 16 reported that the `middleware` file convention was deprecated in favor of `proxy`.
- Impact: the locale middleware was unnecessary for one fixed locale and was incompatible with the static export.
- Decision: remove the middleware together with the locale URL segment instead of migrating an unused routing layer.
- Resolution: resolved by the rooted Catalan route migration; clean builds no longer report the middleware warning.

### TOOL-001: stale baseline browser data

- Observation: `baseline-browser-mapping` reports that its data is more than two months old.
- Impact: this is a build warning and does not currently affect the generated application.
- Decision: do not add or upgrade dependencies only to silence the warning.
- Resolution: update the package as part of a reviewed dependency maintenance task.

### DOCKER-001: Buildx is unavailable

- Observation: Docker Compose reports that Bake is enabled but Buildx is not installed.
- Impact: Compose falls back to the available Docker builder and the application image builds successfully.
- Decision: treat this as local tooling information, not an application failure.
- Resolution: install or enable Buildx only if the local Docker environment requires Bake features.

## Static Deployment

### STATIC-001: arbitrary non-canonical meme slugs

- Observation: static export generates pages only for the canonical slugs returned by the catalogue.
- Impact: a manually altered or obsolete slug returns the static 404 instead of executing the server-side canonical redirect.
- Decision: accept this behavior for the new domain unless real legacy aliases need to be preserved.
- Resolution: add explicit host redirects or generated alias pages if concrete legacy URLs are identified.

### STATIC-002: deployment-specific error documents

- Observation: a plain static host must be configured to serve the exported `404.html` for missing routes.
- Impact: without that configuration, the host may show its generic 404 page instead of Meme Studio's Catalan page.
- Decision: the local Nginx preview uses `error_page 404 /404.html`; deployment configuration remains target-specific.
- Resolution: verify the custom error document when GitHub Pages is configured for `mems.pocafeina.cat`.

### STATIC-003: browser-level editor validation

- Observation: the export, direct routes, and assets have been checked with Docker and HTTP requests.
- Impact: browser interactions such as image import, text editing, and meme export still need manual verification on the static artifact.
- Decision: complete browser-level validation before treating GitHub Pages as approved for publication.
- Resolution: test the editor through the Nginx preview, including mobile-sized viewport behavior.

### STATIC-004: local export directory must be clean

- Observation: `out/` is ignored and can retain files from an earlier export when a new container artifact is copied over it.
- Impact: local preview may expose stale routes that are not part of the current build, even though a clean export is correct.
- Decision: treat `out/` as disposable build output and validate publication artifacts from a clean directory or clean checkout.
- Resolution: add an explicit, reviewed cleanup step to the export workflow before publication.

### DEPLOY-001: custom-domain publication is pending

- Observation: the intended public origin is `https://mems.pocafeina.cat` and GitHub Pages is the primary target.
- Impact: DNS, repository settings, and the publication workflow are not configured yet.
- Decision: prepare and validate the static artifact first; do not publish or change remotes without explicit approval.
- Resolution: configure GitHub Pages, `CNAME`, DNS, and the deployment workflow after the static browser checks pass.
