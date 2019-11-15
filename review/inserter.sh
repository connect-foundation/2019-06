#!/bin/sh

# environment variables
DB_DEV_USERNAME=""
DB_DEV_PW=""
DB_DEV_SCHEMA=""
DB_DEV_HOST=""

# the mail will be in the $1 variable
node src/app.js "`cat $1`" $DB_DEV_USERNAME $DB_DEV_PW $DB_DEV_SCHEMA $DB_DEV_HOST > log 2>&1
