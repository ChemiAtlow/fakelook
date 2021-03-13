#!/bin/sh

ROOT_DIR=/app

echo "Replacing env constants in JS:"
echo "Replacing 'VUE_APP_SERVER' with '${VUE_APP_SERVER}'"

for file in $ROOT_DIR/js/*.*.js* $ROOT_DIR/index.html $ROOT_DIR/precache-manifest*.js;
do
  echo "Processing $file ...";

  sed -i 's|VUE_APP_SERVER|'${VUE_APP_SERVER}'|g' $file

done