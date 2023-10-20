require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
});

//the approach below is not recommended
/* const pool = new Pool({
  user: process.env.DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABSE,
}); */

module.exports = pool;

// First Approach (with connectionString):

// This approach is more concise and can be useful when you have a lot of configuration variables, making the code cleaner.
// It allows you to use a single connectionString constructed from environment variables, which is helpful when you want to provide a single configuration string.
// It uses the isProduction check to determine whether to use the DATABASE_URL environment variable for the connection string in a "production" environment.

// Second Approach (individual configuration options):

// This approach is more explicit and can be helpful when you prefer to specify each configuration option directly.
// It provides more transparency and control over the individual configuration settings, making it easier to troubleshoot and adjust them as needed.
// It doesn't require the isProduction check, so it's more straightforward.
