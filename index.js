const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const download = require('download');

try {

    console.log(`PATH is ${process.env.PATH}`);

    const scannerVersion = core.getInput("sonar-scanner-version");
    const scannerDownloadURL = "https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-"
        + scannerVersion + "-linux.zip";

    console.log(`downloading sonar-scanner from ${scannerDownloadURL}`);
    download(scannerDownloadURL, "/tmp/sonarscanner");
    console.log("done");

    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
