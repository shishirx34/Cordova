#!/bin/bash

APP_NAME=DemoApp
COMMAND=$1
APP_COUNT=$2

createApps() {
    for appIndex in $(eval echo "{1..$APP_COUNT}")
    do
        cp -r ./www www_$APP_NAME$appIndex
        code-push app add $APP_NAME$appIndex
    done
}

removeApps() {
    for appIndex in $(eval echo "{1..$APP_COUNT}")
    do
        rm -rf www_$APP_NAME$appIndex
        echo "Y" | code-push app remove $APP_NAME$appIndex
    done
}

if [ $COMMAND == "create" ]
then
    createApps
else
    removeApps
fi