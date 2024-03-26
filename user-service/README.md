# User Microservice - [NodeJS Microservice with Serverless]


## Installation Guide

Install NodeJS

- https://nodejs.org/en/

Install Serverless Framework Cli

```
$ npm install -g serverless
$ npm install -g typescript

```

To config AWS CLI type,

```
aws config
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

### Some refs:
1. Why dependency injection? https://www.youtube.com/watch?v=D1kM5W9r85Q
2. What is Makefile? https://dev.to/alexmercedcoder/what-is-a-makefile-and-how-do-i-use-them-3ncp
3. https://stackoverflow.com/questions/2145590/what-is-the-purpose-of-phony-in-a-makefile