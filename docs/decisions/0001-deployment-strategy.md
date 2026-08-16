# 0001: Preserve the App and Test Static Export First

## Status

Accepted for the initial implementation phase.

## Context

The project is an existing Next.js/React application. The desired deployment is static when practical, mainly to reduce production server and security maintenance. The local machine must not receive Node.js, npm, Python, or project dependencies; Docker is the preferred isolation layer.

The goal is not to rewrite the editor or remove the existing framework. Next.js provides an official static export mode, so that mode must be tested against the upstream baseline before changing application behavior.

## Decision

1. Keep the current Next.js, React, Panda CSS, editor utility, and browser dependencies while evaluating export.
2. Run installation, development, linting, type checking, and builds in Docker or CI.
3. Stabilize the upstream baseline before implementing the Catalan-only runtime.
4. Test `output: 'export'` only after the locale change is isolated and the existing application still compiles.
5. Keep the generated artifact self-contained: catalogue images are served from `public/templates`, inherited Analytics is disabled, and new browser integrations require an explicit product decision.
6. Stop the static migration if it requires a broad refactor or changes editor behavior. Compare a Dockerized Next.js deployment on a VPS instead.
7. Treat GitHub Pages with `mems.pocafeina.cat` as the primary deployment target. The site is served from the domain root, so project-subpath configuration is not required. An Apache-served static artifact is the first fallback, while a Dockerized Next.js runtime remains available if static validation exposes a real server requirement.

## Consequences

- The first implementation stays close to the upstream source.
- Static export may be rejected based on evidence rather than preference.
- Docker adds a local command layer but avoids host pollution.
- A VPS remains available as a lower-change fallback.
- Public deployment can proceed only after the self-contained artifact and editor behavior have been validated.
