'use strict';

module.exports = TimbercodeWebsite;

function TimbercodeWebsite() {

    const express = require('express');
    const fs = require('fs');

    const app = express();

    app.get('/', (req, res) => {
        res.sendFile(`${__dirname}/timbercode-website/index.html`)
    });

    app.get('/version', function (req, res) {
        const apiGatewayEventAsText = req.headers['x-apigateway-event'] || dummyGatewayEventAsText();
        const apiGatewayEvent = JSON.parse(apiGatewayEventAsText);
        res.send(apiGatewayEvent.requestContext.stage);
    });

    return app;
}

function dummyGatewayEventAsText() {
    const dummyEvent = {
        requestContext : {
            stage : "(not defined)"
        }
    };
    return JSON.stringify(dummyEvent);
}