#!/bin/bash

set -e
rm -rf public
mkdir public
curl --fail $SOURCE_ADDRESS > public/_redirects
set +e
