# Known Issues

This document records non-blocking warnings and deferred technical work. It is
updated when a check changes, a deployment decision is made, or an issue is
resolved.

Last observed: 2026-09-19

## Build and Tooling

### DEP-001: inherited dependency vulnerabilities

- Observation: on 2026-09-16, Docker `npm audit --json` reported 31 vulnerable packages (4 low, 10 moderate, 16 high, 1 critical). After the controlled direct update on 2026-09-19, it reports 26 vulnerable packages (3 low, 9 moderate, 14 high, 0 critical). `npm audit --omit=dev --json` decreased from 9 affected production packages (1 low, 3 moderate, 4 high, 1 critical) to 3 (0 low, 2 moderate, 1 high, 0 critical).
- Scope: `next@16.3.5` and `next-intl@4.9.2` are direct production dependencies and no longer appear as audit findings. `@pandacss/dev@1.9.1` remains a direct development dependency with findings, while the remaining audit entries are transitive.
- Impact: the critical finding and the direct framework findings are resolved. The public deployment does not run the Next.js server or image optimization API, which limits the applicability of some remaining server- and build-specific advisories. The residual production findings are `baseline-browser-mapping`, `mdast-util-to-hast`, and `picomatch`.
- Decision: defer `npm audit fix` and especially `npm audit fix --force`. Investigate the remaining build-only dependency tree separately, with Panda CSS and its generated output explicitly excluded from this change.
- Resolution: updated `next` to `16.3.5` and `next-intl` to the first stable fixed release, `4.9.2`, and regenerated the lockfile in Docker. Residual remediation remains open for the separate dependency-maintenance investigation.

### NEXT-001: middleware convention deprecated

- Observation: Next.js 16 reported that the `middleware` file convention was deprecated in favor of `proxy`.
- Impact: the locale middleware was unnecessary for one fixed locale and was incompatible with the static export.
- Decision: remove the middleware together with the locale URL segment instead of migrating an unused routing layer.
- Resolution: resolved by the rooted Catalan route migration; clean builds no longer report the middleware warning.

### TOOL-001: stale baseline browser data

- Observation: the current Docker production build no longer emits the stale-data warning.
- Impact: no stale browser-data build warning was observed. `baseline-browser-mapping@2.10.12` remains covered by the dependency audit under `DEP-001`.
- Decision: close this tooling-warning item without treating the related dependency audit finding as resolved.
- Resolution: resolved as a build-warning issue by the 2026-09-16 production build; any package update remains part of the reviewed dependency-maintenance work.

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

### STATIC-002: 404 page presentation

- Observation: GitHub Pages serves the exported `404.html` for missing routes,
  and the Catalan page is shown correctly.
- Impact: the page is functional but its visual presentation is poor.
- Decision: consider the routing and deployment behavior resolved; keep the
  visual redesign as product work.
- Resolution: verified on the public domain. The remaining presentation work
  is tracked in `docs/product-roadmap.md`.

### STATIC-003: browser-level editor validation

- Observation: the current public release has been checked in the browser
  and the editor works satisfactorily on the static deployment.
- Impact: no known static-artifact or editor blocker remains for the current
  release.
- Decision: consider the browser validation gate complete for this release.
- Resolution: resolved by validating the public routes and the main editor
  workflow, including meme creation and export.

### STATIC-004: local export directory must be clean

- Observation: `out/` is ignored and can retain files from an earlier export when a new container artifact is copied over it.
- Impact: a copy over an existing directory may expose stale routes that are not part of the current build, even though a clean export is correct.
- Decision: treat `out/` as disposable build output and clear its contents before every export copy.
- Resolution: resolved locally by adding `rm -rf ./out/*` before the documented `docker cp` step.

### DEPLOY-001: custom-domain publication is operational

- Observation: the intended public origin is `https://mems.pocafeina.cat` and GitHub Pages is the primary target.
- Impact: none known; the public site is available over HTTPS.
- Decision: consider the custom-domain publication complete for the current
  release.
- Resolution: GitHub Pages, the custom domain, the certificate, and the public
  deployment have been verified.
