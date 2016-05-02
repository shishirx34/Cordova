/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        var updateDialogOptions = {
            updateTitle: "Update",
            mandatoryUpdateMessage: "You will be updated to the latest version of the app.",
            mandatoryContinueButtonLabel: "Continue",
            optionalUpdateMessage: "Update available. Install?",
            optionalIgnoreButtonLabel: "No",
            optionalInstallButtonLabel: "Yes",
        };

        var syncOptions = {
            installMode: InstallMode.IMMEDIATE,
            updateDialog: updateDialogOptions,
            clientUniqueId: "123"
        };

        var syncStatusCallback = function (syncStatus) {
            switch (syncStatus) {
                // Result (final) statuses
                case SyncStatus.UPDATE_INSTALLED:
                    app.displayMessage("The update was installed successfully. For InstallMode.ON_NEXT_RESTART, the changes will be visible after application restart. ");
                    break;
                case SyncStatus.UP_TO_DATE:
                    app.displayMessage("The application is up to date.");
                    break;
                case SyncStatus.UPDATE_IGNORED:
                    app.displayMessage("The user decided not to install the optional update.");
                    break;
                case SyncStatus.ERROR:
                    app.displayMessage("An error occured while checking for updates");
                    break;

                // Intermediate (non final) statuses
                case SyncStatus.CHECKING_FOR_UPDATE:
                    console.log("Checking for update.");
                    break;
                case SyncStatus.AWAITING_USER_ACTION:
                    console.log("Alerting user.");
                    break;
                case SyncStatus.DOWNLOADING_PACKAGE:
                    console.log("Downloading package.");
                    break;
                case SyncStatus.INSTALLING_UPDATE:
                    console.log("Installing update");
                    break;
            }
        };

        /* Invoke sync with custom messages in the update dialog.
        For customizing the sync behavior, see SyncOptions in the CodePush documentation. */
        window.codePush.sync(syncStatusCallback, syncOptions);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var boxElement = parentElement.querySelector('.box');
        var parentElement = document.getElementById(id);
        /*
        document.body.style.backgroundColor = "#fa7353";    //Orange
        */
        boxElement.textContent = "APP BINARY VERSION";

        document.body.style.backgroundColor = "#1333f3";
        boxElement.textContent = "GENERAL AVAILABLE VERSION";
        /*
        */
        document.body.style.backgroundColor = "#13f313";     //Green
        boxElement.textContent = "ROLLOUT VERSION";

        console.log('Received Event: ' + id);
        /*
        */
    }
};

app.initialize();