#!/bin/bash
set -e
cd $(dirname $0)

VSCODIUM_COMMIT="48f5958d8bf370511db7e37845ab9dbf0d9f8567"

if ! [ -e vscodium ]; then
  mkdir vscodium
  cd vscodium
  git init > /dev/null 2>&1
  git remote add origin https://github.com/VSCodium/vscodium
  git fetch --depth 1 origin "$VSCODIUM_COMMIT"
  git checkout FETCH_HEAD
  
  DISABLED_PATCHES=(
    "patches/brand.patch"
    "patches/feat-announcements.patch"
  )
  for patch in "${DISABLED_PATCHES[@]}"; do
    rm "$patch"
  done

  cp ../brand/icon/* icons/stable/
  cp -r ../brand/workbench/* src/stable/src/vs/workbench/browser

  sed -i '' 's/VSCodium/CodeEditor/' build/build.sh
  sed -i '' 's/"urlProtocol" "vscodium"/"urlProtocol" "vscode"/' prepare_vscode.sh
  sed -i '' 's/VSCodium/CodeEditor/' prepare_vscode.sh
  sed -i '' 's/Corporation|CodeEditor/Corporation|paperdave/' prepare_vscode.sh
  sed -i '' 's|CodeEditor/vscodium|VSCodium/vscodium|' prepare_vscode.sh
  sed -i '' 's/setpath "product" "applicationName" "codium"/setpath "product" "applicationName" "code"/' prepare_vscode.sh

  rm -rf patches/user
  ln -s ../../patches patches/user
else
  cd vscodium
fi

./build/build.sh

rm -fr /Applications/CodeEditor.app
cp -r ./VSCode-darwin-arm64/CodeEditor.app /Applications/CodeEditor.app

