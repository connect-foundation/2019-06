#!/bin/sh

# the mail will be in the $1 variable
node src/app.js "`cat $1`" > log 2>&1
