#!/usr/bin/env bash

set -e #x  # uncomment for debug output

APP_DIR="/code"

cd "${APP_DIR}"

if [ -n "${LINK_LIB}" ]
    then
        npm link "${LIB_DIR}"
fi

webpack-dev-server --mode development
