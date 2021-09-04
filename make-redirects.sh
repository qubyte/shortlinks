#!/bin/bash

set -e
rm -rf public
mkdir public
curl --fail "https://qubyte.codes/shortlinks.txt" > public/_redirects
set +e
