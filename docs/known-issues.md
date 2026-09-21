# Known Issues

This document records non-blocking warnings and deferred technical work. It is
updated when a check changes, a deployment decision is made, or an issue is
resolved.

Last observed: 2026-09-21

## Build and Tooling

### DEP-001: inherited dependency vulnerabilities

- Observation: on 2026-09-16, Docker `npm audit --json` reported 31 vulnerable packages (4 low, 10 moderate, 16 high, 1 critical). After the controlled direct update on 2026-09-19, it reported 26 vulnerable packages (3 low, 9 moderate, 14 high, 0 critical). The focused lockfile update on 2026-09-20 reported 24 vulnerable packages (3 low, 7 moderate, 14 high, 0 critical). The compatible dependency refresh on 2026-09-21 reports 11 vulnerable packages (1 low, 0 moderate, 10 high, 0 critical), while `npm audit --omit=dev --json` still reports no vulnerable production packages.
- Scope: `next@16.3.5` and `next-intl@4.14.5` are direct production dependencies and no longer appear as audit findings. The compatible refresh also updated the current-major dependency tree, including `@pandacss/dev@1.12.1`, while the remaining audit entries are development-only Panda CSS and build-tool transitive packages.
- Impact: the critical finding, the direct framework findings, and all known production-tree findings remain resolved. The public deployment does not run the Next.js server or image optimization API, which limits the applicability of the remaining server- and build-specific advisories. The residual audit findings affect the development/build environment rather than the static artifact runtime.
- Decision: defer `npm audit fix` and especially `npm audit fix --force`. Review the remaining Panda CSS and ESLint tree as a separate major-tooling phase, with generated CSS and the editor validated after every group.
- Resolution: completed the compatible dependency refresh in Docker without direct major upgrades. Lint, TypeScript, the 96-page static build, export, route smoke tests, and manual editor checks passed. The next maintenance step remains the separately tracked Panda CSS and ESLint review.

### NEXT-002: next-intl root-params migration

- Observation: `next-intl@4.14.5` marks `setRequestLocale` as deprecated in favor of `next/root-params`.
- Impact: the current fixed Catalan locale still builds and exports correctly, but the existing API requires an explicit lint exception.
- Decision: defer the migration until the root-params API can be evaluated without changing the rooted static locale or routing model.
- Resolution: documented the deprecation and kept the current behavior in `0.4.3`.

### EDITOR-001: local image resource lifetime

- Observation: the shared `useImageLocal` utility creates browser object URLs for local images, while the application integration does not expose cleanup when a user replaces or resets an image.
- Impact: repeatedly replacing large local images may retain browser memory until the page is closed.
- Decision: defer cleanup work to editor maintenance; it is not a release blocker for the current workflow.
- Resolution: tracked in the product roadmap for a focused editor-performance pass.

### NEXT-001: middleware convention deprecated

- Observation: Next.js 16 reported that the `middleware` file convention was deprecated in favor of `proxy`.
- Impact: the locale middleware was unnecessary for one fixed locale and was incompatible with the static export.
- Decision: remove the middleware together with the locale URL segment instead of migrating an unused routing layer.
- Resolution: resolved by the rooted Catalan route migration; clean builds no longer report the middleware warning.

### TOOL-001: stale baseline browser data

- Observation: the current Docker production build no longer emits the stale-data warning.
- Impact: no stale browser-data build warning or related production audit finding is observed.
- Decision: close this tooling-warning item.
- Resolution: resolved as a build-warning issue by the 2026-09-16 production build and as a dependency audit issue by the 2026-09-20 focused lockfile update.

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
