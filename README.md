# ecartebleue-cli

Command-line interface for VISA e-Carte Bleue service.

Generates a credit card number, an expiration date and a CCV holding the specified amount.

## Requirements

- [CasperJS](http://docs.casperjs.org/en/latest/installation.html) **or** [Docker](https://www.docker.com/community-edition#/download) (which essentially runs CasperJS in a container)
- Your eCarte-Bleue credentials (you must have subscribed to this service at your bank)

## Tested banks

<img src="https://i.imgur.com/F5df75E.jpg" width="40px" />

## Usage

- CasperJS: `casperjs generate.js [--json] [user] [password] [euros-amount]`
- Docker: `./generate.sh [--json] [user] [password] [euros-amount]`

## TODO

- [ ] Handle 3DS if possible (or fallback at least)
