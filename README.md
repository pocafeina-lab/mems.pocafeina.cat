# Mems Catalans

Mems Catalans permet crear mems ràpidament amb plantilles o imatges pròpies.
L’editor funciona al navegador: no cal cap compte i les creacions no es desen
en cap servidor.

Pots descarregar el mem personalitzat al dispositiu o copiar-lo al
porta-retalls.

Web: [mems.pocafeina.cat](https://mems.pocafeina.cat)

#### Llengua d’execució

L’aplicació funciona actualment en català (`ca`). Els fitxers de locale en
anglès es conserven només com a referència; el francès no forma part de
l’execució.

#### Tecnologies

- [Next.js](https://nextjs.org) - Framework React.js
- [Panda CSS](https://panda-css.com) - CSS-in-JS durant la compilació
- [Immer](https://immerjs.github.io/immer/docs/introduction) - Biblioteca d’immutabilitat
- [Next Intl](https://next-intl-docs.vercel.app) - Internacionalització
- [TanStack Query](https://tanstack.com/query/latest) - Gestió d’estat asíncron

La pila principal és Next.js App Router, React 19, Panda CSS, Zustand, Immer,
TanStack Query, next-intl, Zod, Font Awesome i TypeScript.

### Estructura del projecte

```text
src/app/          Rutes Next.js i metadata estàtica
src/components/   Components d’interfície compartits
src/modules/      Portada i funcionalitats de l’estudi de mems
src/i18n/         Missatges i routing del runtime català
src/stores/       Estat de l’editor i dels modals
src/queries/      Proveïdors de TanStack Query
src/shared/       APIs, helpers, hooks i constants
styled-system/    CSS generat per Panda
```

### Contribucions

Les contribucions i les pull requests són benvingudes.

### Desenvolupament amb Docker

Node.js, npm i les dependències del projecte es mantenen dins de Docker.
Utilitza exactament les ordres següents; les variants d’arguments o les opcions
addicionals no formen part de l’allowlist habitual del projecte.

1. Construir la imatge: `docker compose build app`
2. Iniciar el servidor de desenvolupament: `docker compose up -d app`
3. Obrir `http://localhost:8080/`

Cal reconstruir la imatge després dels canvis perquè Compose no munta el
repositori dins del contenidor.

Executar les comprovacions amb `docker compose run --rm app npm run lint`.

### Exportació estàtica

1. Construir la imatge: `docker compose build app`
2. Exportar l’aplicació: `docker compose run --name mems-catalans-static-export app npm run build`
3. Netejar l’artefacte anterior: `rm -rf ./out/*`
4. Copiar l’artefacte generat: `docker cp mems-catalans-static-export:/workspace/out/. ./out/`
5. Eliminar el contenidor de build: `docker rm mems-catalans-static-export`
6. Iniciar la previsualització Nginx: `docker compose --profile static up -d static`
7. Obrir `http://localhost:8081/`

L’objectiu principal és GitHub Pages amb el domini personalitzat
`mems.pocafeina.cat`. Un VPS amb Apache servint l’artefacte estàtic és el
pla alternatiu. Un runtime Next.js dins Docker queda reservat per a
funcionalitats que necessitin servidor.

Les incidències conegudes de build i desplegament es documenten a
[`docs/known-issues.md`](docs/known-issues.md).
