#!/usr/bin/env sh
api_id=`jq -r '.api.id' claudia.${AWS_ENVIRONMENT}.json`
aws_region=`jq -r '.lambda.region' claudia.${AWS_ENVIRONMENT}.json`
curl https://${api_id}.execute-api.${aws_region}.amazonaws.com/latest/version | grep latest