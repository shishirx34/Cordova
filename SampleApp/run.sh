#!/bin/bash
# Script for doing random releases to the code-push server.
APP_NAME=DemoApp
APP_COUNT=$1
REQ_COUNT=$2
APP_VERSION=0.0.1

copyImage () {
    cp $1/img/dolphins.jpg $1/img/dolphins_$2.jpg
}

# Params: AppName, PathToContents
release () {
   code-push release $1 $2 $APP_VERSION 
}

doRelease() {
    for i in $(eval echo "{1..$REQ_COUNT}")
    do
    copyImage $2 $i
    echo "[RELEASE STARTED]"
    release $1 $2
    echo "[RELEASE COMPLETE]"
    done
}

releaseAll() {
    for appIndex in $(eval echo "{1..$APP_COUNT}")
    do
        doRelease $APP_NAME$appIndex www_$APP_NAME$appIndex &
    done
}

#setup
createApps

releaseAll

#Clean apps
removeApps
