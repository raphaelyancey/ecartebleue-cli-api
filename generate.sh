#!/usr/bin/env bash
echo "Generating... (might take a few minutes on first run)"
docker exec casperjs-daemon casperjs index.js $@