# Mems Catalans

Mems Catalans is designed to be fast and provide powerful customization for your memes, while still being simple and easy to use.

A list of memes is provided by default but you can also import your own image.
The editor is privacy-first: no account is required, imported images are
handled in the browser, and the application does not store your creations on a
server.

You have the option of downloading your personalized meme to your device or sharing it directly on your Twitter account. I do not save your meme in our database, so make sure you export your work.

Website : [mems.pocafeina.cat](https://mems.pocafeina.cat)

#### Runtime language

The application currently runs in Catalan (`ca`). The upstream English locale
files remain as reference material only; the French locale is not part of the
runtime.

#### What I use:

- [Next.js](https://nextjs.org) - Framework React.js
- [Panda-css](https://panda-css.com) - Built time CSS in JS
- [Immer](https://immerjs.github.io/immer/docs/introduction) - Immutability library
- [Next Intl](https://next-intl-docs.vercel.app) - Internationalization
- [Tanstack Query](https://tanstack.com/query/latest) - Async state Managment

The main application stack is Next.js App Router, React 19, Panda CSS,
Zustand, Immer, TanStack Query, next-intl, Zod, Font Awesome and TypeScript.

### Project structure

```text
src/app/          Next.js routes and static metadata
src/components/   Shared UI components
src/modules/      Home page and meme studio features
src/i18n/         Catalan runtime messages and routing
src/stores/       Editor and modal state
src/queries/      TanStack Query providers
src/shared/       APIs, helpers, hooks and constants
styled-system/    Generated Panda CSS output
```

### Contributing

Any contributions and/or pull requests would be welcome.

### Development with Docker

Node.js, npm, and project dependencies are intentionally kept inside Docker.
Use the command forms below exactly; alternate argument order or extra flags
are not included in the project's routine Docker allowlist.

1. Build the image: `docker compose build app`
2. Start the development server: `docker compose up -d app`
3. Open `http://localhost:8080/`

Rebuild the image after source changes because the Compose setup does not
bind-mount the repository into the container.

Run checks with `docker compose run --rm app npm run lint`.

### Static export

1. Build the image: `docker compose build app`
2. Export the application: `docker compose run --name mems-catalans-static-export app npm run build`
3. Copy the generated artifact: `docker cp mems-catalans-static-export:/workspace/out/. ./out/`
4. Remove the build container: `docker rm mems-catalans-static-export`
5. Preview it with Nginx: `docker compose --profile static up -d static`
6. Open `http://localhost:8081/`

The primary deployment target is GitHub Pages with the custom domain
`mems.pocafeina.cat`. An Apache-served static artifact on a VPS is the
fallback. A Dockerized Next.js runtime is reserved for features that require a
server.

Known build and deployment caveats are tracked in
[`docs/known-issues.md`](docs/known-issues.md).
