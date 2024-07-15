found=$(echo /Users/dave/Library/Group\ Containers/*.duck/Library/Application\ Support/duck/Volumes.noindex/otherzone)
if [ -z "$found" ]; then
  echo "Otherzone not mounted"
  exit 1
fi

# temp folder in the known location so if failed, we dont lose memes
tempdir=/Users/dave/.memes/$RANDOM
mkdir -p "$tempdir"

videos=$(find /Users/dave/Memes -type f -name '*.mp4' -o -name '*.mov' -o -name '*.m4v' -o -name '*.mkv' -o -name '*.avi' -o -name '*.webm' -o -name '*.wmv' -o -name '*.flv' -o -name '*.vob')
images=$(find /Users/dave/Memes -type f -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.gif' -o -name '*.webp' -o -name '*.svg' -o -name '*.bmp' -o -name '*.ico' -o -name '*.tiff' -o -name '*.tif' -o -name '*.jfif' -o -name '*.pjpeg' -o -name '*.pjp' -o -name '*.avif' -o -name '*.apng')

export OTHERZONE_MOVE_OUTPUT="$tempdir"

if [ -n "$videos" ]; then
  f mp4-tiny $videos  --delete-original -O /Users/dave/code/config/scripts/otherzone-move-output-generator.cjs
fi
if [ -n "$images" ]; then
  f png $images  --delete-original -O /Users/dave/code/config/scripts/otherzone-move-output-generator.cjs
fi

n=0

# for each file attempt to move but if it already exists, prompt for a new name
for file in $(find "$tempdir" -type f); do
  filename=$(basename "$file")
  extension="${filename##*.}"
  filename_without_extension="${filename%.*}"

  # if is not all lowercase and dashes, rename
  if [[ ! "$filename_without_extension" =~ ^[a-z0-9-]+$ ]]; then
    echo
    echo "$tmpdir/$filename is badly named"
    read -p "Enter new name: " newname
    # set filename and conditionally add extension if it doesnt have one
    filename="$newname"
    if [[ ! "$filename" =~ \. ]]; then
      filename="$filename.$extension"
    fi
    filename_without_extension="${filename%.*}"
  fi

  while [ -e "$found/$filename" ]; do
    echo
    echo "File $tmpdir/$filename already exists in otherzone"
    read -p "Enter new name: " newname
    filename="$newname"
    if [[ ! "$filename" =~ \. ]]; then
      filename="$filename.$extension"
    fi
    filename_without_extension="${filename%.*}"
  done

  echo "-> https://otherzone.net/$filename"
  mv "$file" "$found/$filename" || { echo "Failed to move $file to $found/$filename"; exit 1; }
  n=$((n+1))
done

# delete the empty .memes folder but if it isnt empty, dont delete
for file in /Users/dave/.memes/*; do
  rmdir "$file" || echo "Failed to delete $file"
done

if [ "$n" -eq 0 ]; then
  echo "No files..."
fi