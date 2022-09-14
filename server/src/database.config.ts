const { Client, Pool } = require("pg");

const databaseClient = new Client({
  host: "localhost",
  port: "5432",
  user: "postgres",
  password: "123",
  database: "postgres",
});

const clientConfiguration = {
  user: "postgres", // name of the user account
  database: "postgres", // name of the database
  password: "123",
  host: "localhost",
  port: "5432",
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

export const pool = new Pool(clientConfiguration);
