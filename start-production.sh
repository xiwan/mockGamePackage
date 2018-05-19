#!/bin/bash

export NODE_ENV=production
forever start ./production.json
forever logs