# Sonar Scanner action

This action downloads sonar-scanner, set's the `PATH` variable and fills PR-specific options when triggered by a pull request (`SONAR_SCANNER_PR_OPTS`)
## Inputs
### `sonar-scanner-version`
**Required** Version of sonar-scanner  
 default: `4.2.0.1873`
### `install-dir`
**Required** Directory for sonar-scanner installation (absolute path without environment variables)  
default: `/home/runner/sonarscanner`

## Example usage

```yaml
name: Static Analysis
on: [push, pull_request]

jobs:
  sonarcloud:
    name: SonarQube analysis
    runs-on: ubuntu-latest
    steps:
      - name: Install sonar-scanner
        uses: ottojo/sonarscanner-github-action@master
        with:
          sonar-scanner-version: '4.2.0.1873'
      - name: Run sonar-scanner
        run: sonar-scanner $SONAR_SCANNER_PR_OPTS
```
