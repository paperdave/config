#!/bin/bash
set -e
cd $(dirname $0)

export VSCODE_GALLERY_SERVICE_URL='https://marketplace.visualstudio.com/_apis/public/gallery'
export VSCODE_GALLERY_ITEM_URL='https://marketplace.visualstudio.com/items'
export VSCODE_GALLERY_CACHE_URL='https://vscode.blob.core.windows.net/gallery/index'
export VSCODE_GALLERY_CONTROL_URL=''

export PATH="/opt/homebrew/opt/node@18/bin:$PATH"

VSCODIUM_COMMIT="$(cat commit)"

if ! [ -e vscodium ]; then
  mkdir vscodium
  cd vscodium
  git init > /dev/null 2>&1
  git remote add origin https://github.com/VSCodium/vscodium
  git fetch --depth 1 origin "$VSCODIUM_COMMIT"
  git checkout FETCH_HEAD
else
  cd vscodium

  git reset --hard
fi

rm -rf patches/user
ln -s ../../patches patches/user

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

# fixes remote extension version mismatches, as they download the latest release
export RELEASE_VERSION="$(cat ../release)"

./build/build.sh

rm -fr /Applications/CodeEditor.app
cp -r ./VSCode-darwin-arm64/CodeEditor.app /Applications/CodeEditor.app

