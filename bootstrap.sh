#!/bin/bash

git clone https://github.com/celalertug/chemikata-template

mv chemikata-template $1

cd $1

rm -rf .git

git init

git add .

git commit -m "init"

yarn
