# timbercode.gitlab.io

Website of Timbercode company:
 [timbercode.gitlab.io/]( http://timbercode.gitlab.io/ )

To start working with the app, run:
```bash
yarn install
yarn start
```

## Blogging

* Set `SHOW_FUTURE_POSTS` environment variable to `true` 
  in order to see posts with future publication date 
  (useful while writing such post).

## Deployment

Deployment is done automatically GitLab, but for the first time
 you have to deploy app manually. In order to do so:
* define `AWS_PROFILE` environment variable with name of configured
  AWS profile (because you need access to AWS from command line)
* define `AWS_REGION` environment variable with AWS region
  you want to deploy to, eg. `eu-central-1`
* remove `claudia.json` if there is any
* run `yarn configure:express-proxy`
* add generated `lambda.js` to repository
* run `yarn install` to update `yarn.lock` after previous step
  (in which `aws-serverless-express` was reinstalled without
  use of yarn)
* run `yarn configure:aws:testing` with env variables defined above
* add generated `claudia.testing.json` to repository
* run `yarn configure:aws:production` with env variables defined above
* add generated `claudia.production.json` to repository
* commit changes

You can check that deployed app:
* works: `env API_VERSION=testing ./check-health.sh`
* do fancy things: `env API_VERSION=testing ./run-demo.sh`

## CDN

Assets are stored in S3 Bucket `timbercode-website` and delivered
with Amazon CloudFront CDN service.

In order to upload asset to S3, use `aws` (installed with `brew install awscli` on macOS), eg.:
```bash
aws s3 cp assets/favicon-32x32.png s3://timbercode-website/static.timbercode.pl/favicon-32x32.png --profile <profile> --region <region>
```

## AWS Setup

Let's assume that following thins were configured by Claudia.js:
* API Gateway
* IAM Role for Lambda execution
* Lambda with that Role set as Executor

Following things are left to do on AWS in order to have
the website fully configured:
* create *S3 bucket* named `timbercode-website`
    * create directory `static.timbercode.pl/` in that bucket
    * you will upload all the assets into this directory
* create *CloudFront distribution CDN*
    * set `timbercode-website.s3.amazonaws.com/static.timbercode.pl`
      as Origin
    * set `static.timbercode.pl` as Alternate Domain Name (CNAME)
* in *Certificate Manager for region `us-east-1`*
    * request a certificate for domain `timbercode.pl` with `*.timbercode.pl`
      as additional name
        * you need to have an access to `admin@timbercode.pl` mail or
          similar (`webmaster@...`, `hostmaster@...`, `postmaster@...`,
          `administrator@...`) in order to confirm domain ownership
* on *API Gateway* configure *Custom Domain Names*
    * for domain `testing.timbercode.pl` use your ACM certificate,
      and create mapping from Path `/` to `timbercode-website-testing`
      API with Stage `latest`
    * for domain `timbercode.pl` use your ACM certificate,
      and create mapping from Path `/` to `timbercode-website`
      API with Stage `latest`
* in *Route 53 DNS* create Hosted Zone for `timbercode.pl.` domain
    * for `timbercode.pl.` add `A` record with alias to production
      CloudFront distribution
    * for `testing.timbercode.pl.` add `A` record with alias to testing
      CloudFront distribution
    * for `static.timbercode.pl.` add `A` record with alias to CDN
      CloudFront distribution
    * do not change `NS` and `SOA` records
    
Moreover you have to configure your domain provider to use
name servers from `SOA` record in AWS Route 53. Thanks to that
it will be possible to access your API Gateway URLs with use of
`timbercode.pl` domain.
    
### Performance Notes

When memory limit for Lambda was set to 128 MB, API Gateway was returning
`502 Bad Gateway` quite often.
    
## DNS setup for your domain

You have to create DNS entries with mappings from "nice" URLs
to AWS services:
* CNAME from `static.timbercode.pl` to CDN on CloudFront
  under `some_id.cloudfront.net`
* CNAME from `testing.timbercode.pl` to testing API Gateway
  under `some_id.cloudfront.net`
* CNAME from `timbercode.pl` to API production Gateway 
  under `some_id.cloudfront.net`

## Versioning

Use one of following commands to increment app version and 
create tagged git commit:
```bash
npm version patch
npm version minor
npm version major
```

## Acknowledgement

This site is based on [Hagura theme]( https://github.com/sharu725/hagura )
 from [Webjeda]( https://blog.webjeda.com/ ).
