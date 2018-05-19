#!/bin/bash

export NODE_ENV=development
export FOREVER_ROOT=/Users/xiwan/Documents/dev/forever
LOGS_PARAM='-l ./logs/forever.log -o ./logs/out.log -e ./logs/err.log'
echo $NODE_ENV
forever start $LOGS_PARAM ./$NODE_ENV.json
forever logs