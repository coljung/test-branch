#!/usr/bin/env bash

set -e #x  # uncomment for debug output

APP_DIR="/code"
LIB_DIR="/component-library"

npm install -g webpack webpack-cli webpack-dev-server config

cd "${APP_DIR}"
npm install
npm link "${LIB_DIR}"
webpack-dev-server --mode development
