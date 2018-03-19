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
        credentials.password,
        '10'
    ];

    var cmd = shellescape(args);

    console.log('••• cmd', cmd)

    exec(cmd, function (error, stdout) {
        if(error) res.end('Error: ' + error);
        else {
            try {
                var r = JSON.parse(stdout);
            }
            catch(error) {
                var r = { error: error };
            }
            res.json(r);
        }
    });
});

var server = app.listen(3000);