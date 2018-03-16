var app = require('express')();
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
var fs = require('fs');
var shellescape = require('shell-escape');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/generate', function (req, res) {

    var params = Buffer.from(req.body.p, 'base64').toString();
    params = JSON.parse(params);

    var credentials = {
        user: params[0],
        password: params[1]
    };

    var args = [
        'casperjs',
        'generate.js',
        '--json',
        credentials.user,
        credentials.password
    ];

    var cmd = shellescape(args);

    exec(cmd, function (error, stdout) {
        if(error) res.end(error);
        res.json(JSON.parse(stdout));
    });
});

var server = app.listen(3000);