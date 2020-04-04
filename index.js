const core = require('@actions/core');
const github = require('@actions/github');
const download = require('download');
const Webhooks = require('@octokit/webhooks');


try {

    console.log(`PATH is ${process.env.PATH}`);

    const scannerVersion = core.getInput("sonar-scanner-version");
    const scannerDownloadURL = "https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-"
        + scannerVersion + "-linux.zip";

    core.exportVariable("PATH", process.env.PATH + ":"); // TODO path to sonarscanner

    console.log(`downloading sonar-scanner from ${scannerDownloadURL}`);
    // TODO https://github.com/actions/toolkit/tree/master/packages/tool-cache
    download(scannerDownloadURL, "/tmp/sonarscanner");  // TODO wait for download? Callback for run?
    console.log("done");

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

    if (github.context.eventName === 'pull-request') {
        console.log("Running as PR, adding additional variables for sonar");
        // TODO https://sonarcloud.io/documentation/integrations/ci/other/
        const pullRequestPayload = github.context.payload;
    }


} catch (error) {
    core.setFailed(error.message);
}
