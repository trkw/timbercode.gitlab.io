'use strict';

function SimpleExpressApp() {

    const express = require('express');
    const fs = require('fs');

    const app = express();

    app.get('/hello', function (req, res) {
        res.send('Hello World!');
    });

    app.get('/page', (req, res) => {
        res.sendFile(`${__dirname}/html/page.html`)
    });

    return app;
}

module.exports = SimpleExpressApp;