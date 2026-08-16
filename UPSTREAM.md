# Upstream

This project is an independent downstream application based on
`viclafouch/meme-studio`.

## Source

- Repository: https://github.com/viclafouch/meme-studio
- Local remote: `upstream`
- Imported source tree: `e685e877e8f6f5d8b138fe0f4165033b9a417f34`
- Imported source tag: `snapshot/upstream-e685e87`
- Curated technical update: `5b4fc95dddcd3de010fe68366a59802155b1abe2`
- Curated base tag: `baseline/curated-upstream-5b4fc95`

The imported history starts from a clean root commit. The full upstream
history remains available through the `upstream` remote for review, but is not
part of this project's main history.

## Reviewed Commits

### Adapted

- `5b4fc95`: dependency, framework, Panda CSS, generated output, and runtime fixes. It was adapted as the curated technical base.
- `8a3570e`: selected React, editor-performance, security, privacy, and dependency-review guidance will be adapted to OpenCode where useful.
- `5f7e751`: selected README structure and product documentation will be adapted to the Catalan static project.

### Skipped

- `8a3570e`: Claude configuration, unrelated skills, and agent tooling were not imported.
- `5f7e751`: its upstream-specific README was not imported verbatim because it documents host npm, Vercel, English/French runtime behavior, and an unspecified license.
- `d8fa0be`: the Petit Meme promotional banner was not imported.

## Update Policy

Upstream changes are reviewed selectively. Do not merge the upstream branch as
a whole. Bring a useful bug fix or maintenance change through an explicit
review and an adapted commit, recording its upstream SHA here and in the
commit body with `Adapted-From:`.
