#! /bin/bash
# https://www.npmjs.com/package/browser-sync
# Documentation: https://browsersync.io/docs/command-line
# Usage: Run `$ sh browsersync.sh` in your terminal from the folder where this script is located.
# Use this script together with https://github.com/kevinweber/aem-front-extension

if ! type "browser-sync" > /dev/null;
then
  echo "browser-sync is not installed. Installing..."
  sudo npm install browser-sync -g
fi

DIR="./directory/**/jcr_root/**"
browser-sync start --files "$DIR/*.css" "$DIR/*.less" "$DIR/*.html" "$DIR/*.js" "$DIR/*.xml" --reload-delay 500 --no-inject-changes --no-ui --no-open --no-notify
