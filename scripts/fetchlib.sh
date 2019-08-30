#!/usr/bin/env bash

PROJECT_ROOT=$(pwd)
LIB_DIR=${PROJECT_ROOT}/lib

cd ${LIB_DIR}/oauth2-server
git pull

cd ${LIB_DIR}/meteor-accounts-lea
git pull

cd ${LIB_DIR}/meteor-accounts-oauth-lea
git pull

cd ${LIB_DIR}/meteor-accounts-oauth-lea-config-ui
git pull

