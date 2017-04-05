'use strict';

const SimpleExpressApp = require('./SimpleExpressApp');

const app = SimpleExpressApp();

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});