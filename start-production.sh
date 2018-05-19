#!/bin/bash

export NODE_ENV=production
export FOREVER_ROOT='/home/forever'
LOGS_PARAM='-l ./logs/forever.log -o ./logs/out.log -e ./logs/err.log'
echo $NODE_ENV
forever start $LOGS_PARAM ./$NODE_ENV.json
forever logs