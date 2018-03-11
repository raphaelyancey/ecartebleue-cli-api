# ecartebleue-cli

Command-line interface for VISA e-Carte Bleue service.

Generates a credit card number, an expiration date and a CCV holding the specified amount.

## Requirements

You must have subscribed to this service from your bank. **Only tested with Caisse d'Epargne french bank at the moment.**

## Usage

`./generate.sh [user] [password] [euros-amount]`

## Notes

Uses Docker to have a clean `casperjs` installation that can be painful to install on some systems (including mine).

## TODO

- [ ] Handle 3DS if possible (or fallback at least)
- [ ] JSON output option for programatic use
