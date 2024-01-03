#!/usr/bin/env bash
cd $(dirname $0)
cd vscodium
git fetch origin master
git reset --hard FETCH_HEAD
git rev-parse HEAD > ../commit
