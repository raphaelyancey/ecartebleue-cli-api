var app = require('express')();
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
var fs = require('fs');
var shellescape = require('shell-escape');

app.use(bodyParser.json());
app.get('/generate', function (req, res) {

    console.log('foobar!!');
    res.end('foobar!');

    // var url = req.body.__url;
    // var action = req.body.__action;
    // var header = req.body.__header;
    // var creds = req.body.__creds;
    // delete req.body.__url;
    // delete req.body.__action;
    // delete req.body.__header;
    // delete req.body.__creds;

    // creds = JSON.parse(creds);
    // creds = JSON.stringify(creds);

    // var postData = JSON.stringify(req.body);

    // var args = [
    //     'casperjs',
    //     'scrape.js',
    //     '--web-security=no',
    //     '--ignore-ssl-errors=true',
    //     '--ssl-protocol=any',
    //     url,
    //     action,
    //     creds,
    //     postData
    // ];

    // var cmd = shellescape(args);

    // exec(cmd, function (error, stdout) {
    //     if(error) console.log(error);
    //     res.end(stdout);
    // });

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});