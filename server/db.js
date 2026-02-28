const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "authdb",
  password: "Bhagyesh@2703",   // exact password
  port: 5432,
});

pool.connect()
  .then(() => console.log("Connected to authdb successfully"))
  .catch(err => console.error("DB Connection Error:", err));

module.exports = pool;