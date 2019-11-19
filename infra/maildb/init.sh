#!/bin/sh

INSPECT_DIR=/var/spool/filter

chmod 750 controller.sh node-runner.sh
cp -r ./* $INSPECT_DIR
rm $INSPECT_DIR/init.sh
chown filter:filter $INSPECT_DIR/*
cd $INSPECT_DIR/src
npm install

echo "ready to receive mail"
