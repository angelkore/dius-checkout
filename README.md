# DIUS Challenge
Coding challenge which scans stuff and gives nice discounts.

## Quick-start
Pre-requisites: 
- NPM/Node is installed

How-to:
- `npm run build`
- `npm run scenarios` - to run scenarios given in spec
- `npm test` - to see test coverage

## Assumptions:
- Not bothering with input validation, but probably should in case sales guys try to give a discount of `$#!99.!!`
- Tests cover happy path and reasonable edge cases only
- It's possible to mix-and-match promotions, since it wasn't _technically_ in the spec (E.G flat and bundle simultaneously). Would probably have to work out some sort of ordering of priority for promotions if this was a legit use case.
