console.log('Serving.');

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

    console.log('Command: ', cmd)

    exec(cmd, function (error, stdout) {
        if(error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred.' });
        }
        else {
            try {
                var generated = JSON.parse(stdout);
            }
            catch(e) {
                console.error("Couldn't parse response.");
                res.status(500).end({ error: "Couldn't parse response." })
            }

            var s = generated.success ? 200 : 500;
            var r = generated.data;

            console.log('Status: ', s);
            console.log('Result: ', r);

            res.status(s).json(r);
        }
    });
});

var server = app.listen(3000);