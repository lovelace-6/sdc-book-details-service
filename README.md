# andrew-fec-service (ExtraDetails Component)

Recreates the extra details component of goodreads.com. The component is minimized when first rendered and can be expanded to its full view by clicking the more button.

## Related Projects

  - https://github.com/hrr37-hermes-4/hrr37-FEC-Ginger-service
  - https://github.com/hrr37-hermes-4/hrr37-FEC-Ginger-proxy
  - https://github.com/hrr37-hermes-4/hannah-service
  - https://github.com/hrr37-hermes-4/hannah-proxy
  - https://github.com/hrr37-hermes-4/kazshige-proxy
  - https://github.com/hrr37-hermes-4/kazshige-service

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
Multiple npm scripts provided for convenience. View full list at package.json

Basic startup of project after installing dependcies:

1. Seed database with npm script
   1. To seed database use: `npm run seed`
   1. To erase data for reseeding use: `npm run drop:tables`

1. Start server with node or nodemon
   1. To start server with node use: `npm run start`
   1. To start server with nodemon, install nodemon with npm -i nodemon then use: `npm run start:dev`

1. Build and bundle client side code with webpack:
`npm run build:dev`

1. View module at http://localhost/3001/books/:id
   1. Id is any number between 1-100 representing 100 books

1. Test project with jest:
`npm test`


## Requirements
Main Development Modules
- Node 10.14.x
- Express
- Mysql with bluebird promisification
- React with CSS Modules using LESS

Main Testing Modules
- Jest
- Supertest
- Enzyme

## Development

### Installing Dependencies

From within the root directory:

```sh
  npm install
```
