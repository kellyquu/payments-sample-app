#!/bin/bash
npx browserslist@latest --update-db
export NODE_OPTIONS=--openssl-legacy-provider
yarn dev
