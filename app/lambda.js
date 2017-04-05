var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder();

module.exports = api;

api.get('/hello', function () {
    return 'Hello, World!';
});

api.get('/greet', function (request) {
    var superb = require('superb');
    return request.queryString.name + ' is ' + superb();
});

api.get('/version', function (request) {
    return request.context.stage;
});
