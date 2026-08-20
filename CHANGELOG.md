# Registre de canvis

Aquí es documenten els canvis de producte rellevants. El format segueix el
Versionat Semàntic, i la feina pendent s’acumula abans de cada versió
intencionada.

## [No publicat]

Encara no hi ha canvis pendents de publicar.

## [0.3.1] - 2026-08-20

### Corregit

- Corregida la còpia d’imatges al porta-retalls en navegadors com Firefox.
- Afegit un missatge específic quan el navegador no permet copiar la imatge.

## [0.3.0] - 2026-08-20

### Afegit

- Afegides 18 plantilles catalanes quadrades al catàleg.
- Afegida una marca d’aigua vertical als mems generats.
- Afegit el desplegament estàtic automatitzat a GitHub Pages.

### Millorat

- Millorada la navegació per teclat entre els camps de text de l’editor.
- Millorada la càrrega de fonts abans d’exportar un mem.

### Canviat

- Actualitzats els nous mems catalans perquè els textos s’iniciïn centrats.
- Normalitzats els assets dels nous mems al format WebP.
- Ordenada alfabèticament la galeria de mems segons la col·lació catalana.

### Corregit

- Corregits el preview i la descàrrega de mems exportats.
- Corregida l’alineació vertical dels textos al preview i a l’exportació.

## [0.2.0] - 2026-08-17

### Afegit

- Configuració separada per controlar les plantilles destacades i deshabilitades.
- Alternatives locals i lliures per a les fonts de l’editor.
- Logotip temporal de pocafeina a la portada i la capçalera.

### Canviat

- Actualitzada la paleta visual del blau al verd de la línia de pocafeina.
- Reestructurat el layout de personalització de l’editor.
- Restaurats els selectors dels blocs de text en una sola línia.
- Millorada la llegibilitat i la identificació dels controls tipogràfics.
- Fusionades les pàgines d’informació del projecte i l’ajuda de l’editor.
- Netejat el catàleg i eliminades les plantilles descartades i els seus assets.

### Eliminat

- Eliminat el contingut català de preguntes freqüents duplicat.
- Eliminat l’indicador de desenvolupament de Next.js de la interfície.

### Corregit

- Corregida la selecció inicial del primer bloc de text.
- Corregit el desplegament dels controls dels blocs de text.

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
