# ecartebleue-cli-api

> **UNOFFICIAL** You should not run, use or rely on this code without fully understanding it and its implications.

Command-line interface and API for VISA e-Carte Bleue service.

Generates a credit card number, an expiration date and a CCV holding the specified amount.

**Ideally used with the [ecartebleue-extension](https://github.com/raphaelyancey/ecartebleue-extension) WebExtension in your browser for handy one-click generation.**

## Requirements

- [CasperJS](http://docs.casperjs.org/en/latest/installation.html) **or** [Docker](https://www.docker.com/community-edition#/download) (which essentially runs CasperJS in a container)
- Your eCarte-Bleue credentials (you must have subscribed to this service at your bank)

## Tested banks

<img src="https://i.imgur.com/F5df75E.jpg" width="40px" alt="Caisse d'Épargne" />

## Usage

- Generation
  - CasperJS: `casperjs generate.js [--json] [user] [password] [euros-amount]`
  - Docker (one-liner): `./generate.sh [--json] [user] [password] [euros-amount]`
  - In your browser (WebExtension): [ecartebleue-extension](https://github.com/raphaelyancey/ecartebleue-extension) (requires a running API instance)

- API server
  - Docker: `docker run -p 3000:3000 ryancey/ecartebleue-api`
  - Docker (local build): `docker build -t ecartebleue-api .; docker run -p 3000:3000 ecartebleue-api`
  - [now.sh](https://zeit.co/now): `now --docker /path/to/local/repo` (instant, free, secured deployment)

## API

Listening on port `3000`.

`POST /generate`
```
{
    a: (integer) Amount in euros,
    p: (string) BASE64-encoded JSON-stringified array of credentials [username, password]
}
```

`200 OK`
```
{
    cc: (string) Card number,
    exp: [
        (string) Expiration month,
        (string) Expiration year,
    ],
    ccv: (string) Card CCV
}
```

## Notes

I repeat, you should **NOT** run, use or rely on this code without fully understanding it and its implications.

The bank card numbers you will generate really hold money that can be spend (like, in the real world). **I won't take responsibility for any use of this code, it's just a proof of concept.**

## Development

`docker build -t ecartebleue-api .`

`npm install`

`docker run -p 3000:3000 -v /path/to/local/repo:/home/ecb-api ecartebleue-api`

## TODO

- [ ] Handle 3DS challenge
- [ ] Simplify credentials parameters
