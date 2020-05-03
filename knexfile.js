require('dotenv').config();
const knexSnakeCaseMappers = require('objection').knexSnakeCaseMappers;


module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
    },
    ...knexSnakeCaseMappers()
  }
};