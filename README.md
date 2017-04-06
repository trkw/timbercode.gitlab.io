# timbercode.gitlab.io

Website of Timbercode company:
 [timbercode.gitlab.io/]( http://timbercode.gitlab.io/ )

To start working with the app, run:
```bash
yarn install
yarn start
```

## Deployment

Deployment is done automatically GitLab, but for the first time
 you have to deploy app manually. In order to do so:
* define `AWS_PROFILE` environment variable with name of configured
  AWS profile (because you need access to AWS from command line)
* define `AWS_REGION` environment variable with AWS region
  you want to deploy to, eg. `eu-central-1`
* remove `claudia.json` if there is any
* run `yarn run configure-aws`
* add generated `claudia.json` to repository
* commit changes

You can check that deployed app:
* works: `env API_VERSION=testing ./check-health.sh`
* do fancy things: `env API_VERSION=testing ./run-demo.sh`

## CDN

Assets are stored in S3 Bucket `timbercode-website` and delivered
with Amazon CloudFront CDN service.

In order to upload asset to S3, use `aws` (installed with `brew install awscli` on macOS), eg.:
```bash
aws s3 cp assets/favicon-32x32.png s3://timbercode-website/assets/favicon-32x32.png --profile <profile> --region <region>
```