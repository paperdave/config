#!/usr/bin/env bash
cd $(dirname $0)
cd vscodium
git fetch origin master
git reset --hard FETCH_HEAD

STABLE_COMMIT="$(git log -n 1 --pretty=format:%H -- stable.json)"

git fetch origin "$STABLE_COMMIT"
git reset --hard "$STABLE_COMMIT"

echo "$STABLE_COMMIT" > ../commit

gh release view --json tagName | jq -r '.tagName' > ../release

bash build.sh
