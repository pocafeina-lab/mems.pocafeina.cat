#!/bin/sh
set -eu

if [ ! -x node_modules/.bin/next ]; then
  npm install --force --ignore-scripts
fi

exec "$@"
