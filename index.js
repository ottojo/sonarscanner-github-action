const core = require('@actions/core');
const github = require('@actions/github');
const download = require('download');

try {

    let installDir = core.getInput("install-dir");
    if (installDir.endsWith("/")) {
        installDir = installDir.substr(0, installDir.length - 1);
    }
    const scannerVersion = core.getInput("sonar-scanner-version");
    const scannerDownloadURL = "https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-"
        + scannerVersion + "-linux.zip";
    const scannerDirectoryName = "sonar-scanner-" + scannerVersion + "-linux";

    const binPath = installDir + "/" + scannerDirectoryName + "/bin";
    console.log(`adding "${binPath}" to PATH`);
    core.exportVariable("PATH", process.env.PATH + ":" + binPath);

    // TODO https://github.com/actions/toolkit/tree/master/packages/tool-cache
    console.log(`downloading sonar-scanner from ${scannerDownloadURL} ...`);
    download(scannerDownloadURL, installDir).then(function () {
        console.log("done");

        if (github.context.eventName === 'pull_request') {
            console.log("Build triggered by Pull Request, defining SONAR_SCANNER_PR_OPTS with PR specific parameters for sonar");

            const pullRequestPayload = github.context.payload.pull_request;
            const prNumber = pullRequestPayload.number;
            const prBranch = pullRequestPayload.head.ref;
            const prBaseBranch = pullRequestPayload.base.ref;
            const opts = `-Dsonar.pullrequest.base=${prBaseBranch} -Dsonar.pullrequest.branch=${prBranch} -Dsonar.pullrequest.key=${prNumber}`;
            core.exportVariable("SONAR_SCANNER_PR_OPTS", opts);

            console.log(`SONAR_SCANNER_PR_OPTS=${opts}`);
        } else {
            console.log("Not triggered by PR.");
        }
    });

} catch (error) {
    core.setFailed(error.message);
}
