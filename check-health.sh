#!/usr/bin/env sh
api_id=`jq -r '.api.id' claudia.json`
aws_region=`jq -r '.lambda.region' claudia.json`
curl https://${api_id}.execute-api.${aws_region}.amazonaws.com/${API_VERSION}/version | grep "${API_VERSION}"