#!/usr/bin/env bash

set -e #x  # uncomment for debug output

APP_DIR="/usr/src/app"
LIB_DIR="/usr/src/app/ui-internal-components-react"

cd "${LIB_DIR}"

npm i
npm run sass-all
npm run watch &

cd "${APP_DIR}"

npm link "${LIB_DIR}"

npm run start
