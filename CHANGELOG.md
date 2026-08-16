# Registre de canvis

Aquí es documenten els canvis de producte rellevants. El format segueix el
Versionat Semàntic, i la feina pendent s’acumula abans de cada versió
intencionada.

## [No publicat]

Encara no hi ha canvis pendents de publicar.

## [0.1.0] - 2026-08-16

### Afegit

- Runtime català sense un prefix de locale visible a la URL.
- Exportació estàtica de Next.js amb Docker i preview Nginx.
- Plantilles del catàleg servides localment des de `public/templates`.
- Configuració del projecte OpenCode i agents de revisió només de lectura.
- Títols de metadata de `Mems Catalans` i pàgina 404 en català.

### Canviat

- Historial downstream net establert a partir de l’instantània upstream
  `e685e87`.
- Actualització tècnica upstream curada a partir de `5b4fc95`.
- Eliminats Google Analytics, els ginys GitHub de tercers i les peticions de
  catàleg en runtime a `meme-studio.io`.
- Normalitzada la terminologia catalana a `mem` i `mems`, i actualitzats els
  textos perquè descriguin només les funcionalitats disponibles.
- Procedència upstream preservada i canvis adaptats registrats a `UPSTREAM.md`.
