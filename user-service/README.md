# User Microservice - [NodeJS Microservice with Serverless]


## Installation Guide

Install NodeJS

- https://nodejs.org/en/

Install Serverless Framework Cli

```
$ npm install -g serverless
$ npm install -g typescript

```

### Plugins Required

```
$ sls plugin install --name serverless-plugin-typescript

```

```bash
$ sls plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
$ sls offline
```

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).

### Deployment Command

```
$ sls deploy --verbose

```