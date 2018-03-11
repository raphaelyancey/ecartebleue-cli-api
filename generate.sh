#!/usr/bin/env bash
echo "Generating... (might take a few minutes on first run)"
docker run -v $(pwd):/home/casperjs-tests vitr/casperjs casperjs index.js $@