require('dotenv').config()

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD 
    },
    migrations: {
        directory: './db/migrations',
    },
  },
};
