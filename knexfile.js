require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'speak-up',
    }
  }

  // test: {
  //   client: 'pg',
  //   connection: {
  //     database: process.env.DATABASE_URL || 'speak-up-test',
  //   }
  // },
  //
  // production: {
  //   client: 'pg',
  //   connection: process.env.DATABASE_URL + '?ssl=true'
  // }

};
