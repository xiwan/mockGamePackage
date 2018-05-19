#!/bin/bash

export NODE_ENV=development
export FOREVER_ROOT=/Users/xiwan/Documents/dev/mockGamePackage
export LOGS_PARAM='-l ./logs/forever.log -o ./logs/out.log -e ./logs/err.log'
forever start $LOGS_PARAM ./$NODE_ENV.json
forever logs