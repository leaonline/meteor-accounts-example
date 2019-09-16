#!/usr/bin/env bash

PROJECT_ROOT=$(pwd)
LIB_DIR=${PROJECT_ROOT}/lib

mkdir -p ${LIB_DIR}
cd ${LIB_DIR}
git clone git@github.com:leaonline/meteor-accounts-lea.git
git clone git@github.com:leaonline/oauth2-server.git
git clone git@github.com:leaonline/meteor-accounts-oauth-lea.git
git clone git@github.com:leaonline/meteor-accounts-oauth-lea-config-ui.git

cd ${PROJECT_ROOT}/authserver
METEOR_PACKAGE_DIRS=${LIB_DIR} meteor update --all-packages
meteor npm install

cd ${PROJECT_ROOT}/resourceserver
METEOR_PACKAGE_DIRS=${LIB_DIR} meteor update --all-packages
meteor npm install

cd ${PROJECT_ROOT}/clientapp
METEOR_PACKAGE_DIRS=${LIB_DIR} meteor update --all-packages
meteor npm install

