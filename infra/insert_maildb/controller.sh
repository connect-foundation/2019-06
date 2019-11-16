#!/bin/sh

# Simple shell-based filter. It is meant to be invoked as follows:
#       /path/to/script -f sender recipients...

# Localize these. The -G option does nothing before Postfix 2.3.
INSPECT_DIR=/var/spool/filter
SENDMAIL="/usr/sbin/sendmail -G -i" # NEVER NEVER NEVER use "-t" here.

# Exit codes from <sysexits.h>
EX_TEMPFAIL=75
EX_UNAVAILABLE=69

# Clean up when done or when aborting.
trap "rm -f in.$$" 0 1 2 3 15

# Start processing.
cd $INSPECT_DIR || {
    echo $INSPECT_DIR does not exist; exit $EX_TEMPFAIL; }

cat >in.$$ || {
    echo Cannot save mail to file; exit $EX_TEMPFAIL; }

# Specify your content filter here.
$INSPECT_DIR/node-runner.sh <in.$$ || {
   echo Message content rejected; exit $EX_UNAVAILABLE; }

$SENDMAIL "$@" <in.$$ || {
   echo Unable to send mail; exit $EX_UNAVAILABLE;
}

exit $?
