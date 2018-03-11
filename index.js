var casper = require('casper').create();

casper.start('https://service.e-cartebleue.com/fr/caisse-epargne/index');

casper.waitForSelector('#form-password-edit', function() {
  this.evaluate(function(user, password) {
    document.querySelector('#user-id').value = user;
    document.querySelector('#user-password').value = password;
    document.querySelector('.btn-text').click();
  }, casper.cli.args[0], casper.cli.args[1]);
});

casper.waitForSelector('#money-amount', function() {
  this.evaluate(function(amount) {
    document.querySelector('#money-amount').value = amount;
    document.querySelector('button[title="générer votre e-Numéro"]').click();
  }, casper.cli.args[2]);
});

casper.waitForSelector('#generated-code-dd', function() {

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
    this.echo("CC: " + cc[1]);

  // EXP
  exp_html = this.getHTML('#content-expiration-date');
  exp_html = exp_html.replace(/\s/g, '');
  regex = /<dd>([0-9]{2}\/[0-9]{2})<\/dd>/g;
  var exp = regex.exec(exp_html);
  if(!exp)
    this.die("Couldn't find EXP.");
  else
    this.echo("EXP: " + exp[1]);

  // CCV
  ccv_html = this.getHTML('#content-cryptogramme');
  ccv_html = ccv_html.replace(/\s/g, '');
  regex = /<spanclass="restricted-only">([0-9]{3})<\/span>/g;
  var ccv = regex.exec(ccv_html);
  if(!ccv)
    this.die("Couldn't find CCV.");
  else
    this.echo("CCV: " + ccv[1]);

  this.echo("Amount: " + this.cli.args[2]);
});

casper.run();