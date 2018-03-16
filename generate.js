var utils = require('utils');
var casper = require('casper').create();
var outputStyle = 'human';
var result = { amount: casper.cli.args[2] };

if("json" in casper.cli.options) outputStyle = 'json';
else casper.echo('Generating...');

casper.start('https://service.e-cartebleue.com/fr/caisse-epargne/index');

casper.waitForSelector('#form-password-edit', function() {
  this.log("Found login form");
  this.evaluate(function(user, password) {
    document.querySelector('#user-id').value = user;
    document.querySelector('#user-password').value = password;
    document.querySelector('.btn-text').click();
  }, casper.cli.args[0], casper.cli.args[1]);
});

casper.waitForSelector('#money-amount',
  
  function() {
    this.log("Logged!");
    this.log("Found amount input");
    this.evaluate(function(amount) {
      document.querySelector('#money-amount').value = amount;
      document.querySelector('button[title="générer votre e-Numéro"]').click();
    }, casper.cli.args[2]);
  },

  function() { // Timeout ?
    this.log("Login timed out");
    var secure = { value: false };
    this.evaluate(function(s) {
      s.value = document.querySelector('#form-3ds-authentificate input[type="submit"]') !== null;
    }, secure);
    this.then(function() {
      if(secure) {
        msg = "3DS required and not yet implemented. Log in the classic way and retry.";
        if(outputStyle == 'json') {
          utils.dump({ error: msg });
          this.exit(0);
        }
        else if(outputStyle == 'human') this.die(msg);
      }
    });
  });

casper.waitForSelector('#generated-code-dd', function() {

  this.log("Generated!");

  var html = this.getHTML('body');
  var regex;

  if(/Vous avez généré trop de e-Numéros non utilisés/g.exec(html) !== null)
    this.die('Quota exceeded!');

  // CC
  cc_html = this.getHTML('#generated-code-dd');
  cc_html = cc_html.replace(/\s/g, '');
  regex = /data-drag-txt="([0-9]{16})"/g;
  var cc = regex.exec(cc_html);
  if(!cc)
    this.die("Couldn't find CC.");
  else
    result.cc = cc[1];

  // EXP
  exp_html = this.getHTML('#content-expiration-date');
  exp_html = exp_html.replace(/\s/g, '');
  regex = /<dd>([0-9]{2})\/([0-9]{2})<\/dd>/g;
  var exp = regex.exec(exp_html);
  if(!exp)
    this.die("Couldn't find EXP.");
  else
    result.exp = [exp[1], exp[2]];

  // CCV
  ccv_html = this.getHTML('#content-cryptogramme');
  ccv_html = ccv_html.replace(/\s/g, '');
  regex = /<spanclass="restricted-only">([0-9]{3})<\/span>/g;
  var ccv = regex.exec(ccv_html);
  if(!ccv)
    this.die("Couldn't find CCV.");
  else
    result.ccv = ccv[1];
});

casper.then(function() {
  if(outputStyle == 'human') {
    this.echo("CC: " + result.cc);
    this.echo("EXP: " + result.exp.join('/'));
    this.echo("CCV: " + result.ccv);
    this.echo("AMOUNT (euros): " + result.amount);
  } else if(outputStyle == 'json') {
    utils.dump(result);
  }
  this.exit(0);
});

casper.run();