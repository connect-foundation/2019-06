#!/bin/sh

INSPECT_DIR=/var/spool/filter

cp -r ./* $INSPECT_DIR
rm $INSPECT_DIR/init.sh
chown filter:filter $INSPECT_DIR/*
echo "ready to receive mail"
