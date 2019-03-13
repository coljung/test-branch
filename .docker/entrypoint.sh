#!/usr/bin/env bash

set -e #x  # uncomment for debug output

APP_DIR="/usr/src/app"
LIB_DIR="/usr/src/app/ui-internal-components-react"

npm install -g webpack webpack-cli webpack-dev-server config

cd "${LIB_DIR}"
npm install
npm run sass-all
npm run watch &
npm link

cd "${APP_DIR}"
npm install
npm link @ssense/ui-component-library
npm start
