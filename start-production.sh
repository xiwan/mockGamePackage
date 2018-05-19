#!/bin/bash

export NODE_ENV=production
export FOREVER_ROOT=/home/mockGamePackage
export LOGS_PARAM='-l ./logs/forever.log -o ./logs/out.log -e ./logs/err.log'
forever start $LOGS_PARAM ./$NODE_ENV.json
forever logs