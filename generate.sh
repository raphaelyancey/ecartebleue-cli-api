#!/usr/bin/env bash
docker run -v $(pwd):/home/casperjs-tests vitr/casperjs casperjs index.js $@