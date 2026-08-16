# Architecture Principles

## Preserve before replacing

Meme Studio is an existing Next.js/React application. Changes must preserve its behavior, visual output, editor interactions, and current dependency boundaries unless a redesign is explicitly approved.

Next.js remains the implementation baseline while its official static-export path is evaluated. Do not migrate to another framework in response to an unverified export error.

## Build versus runtime

Node.js and npm are build-time tools only. They run in Docker or CI, never as host-installed project requirements. A static deployment may contain compiled JavaScript and third-party browser dependencies; it does not need to be dependency-free source code.

Runtime catalogue images and browser services are self-contained or deliberately
owned by this project. Do not introduce upstream CDN or analytics dependencies
when adapting future changes.

## Static deployment gate

Static export is approved only when a clean Docker build produces the artifact without a broad application refactor and a plain static server can serve the main routes and editor behavior.

If export requires substantial changes, compare the actual effort with running the original Next.js build in Docker behind a reverse proxy on a VPS.

## Locale policy

The current runtime locale is Catalan (`ca`) without a visible locale URL
prefix. English locale files may remain as upstream reference material only,
while French is not part of the runtime. Meme names, tags, keywords, and
catalogue selection are product content and are intentionally deferred.

## Deployment targets

GitHub Pages with the custom domain `mems.pocafeina.cat` is the primary target
for the generated static artifact. A VPS serving the same artifact with
Apache is the first fallback. Running the original Next.js application in
Docker remains a later fallback if static validation exposes a real server
requirement. DNS, repository settings, and publication remain deferred until
the generated artifact and browser behavior have been validated.
