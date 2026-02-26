const { Pool } = require("pg");

/*
  Create a single pool instance.
  In Vercel serverless, this allows connection reuse
  between invocations.
*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

/*
  Optional: Test connection locally only.
  Avoid extra connections in production (Vercel).
*/
if (process.env.NODE_ENV !== "production") {
  (async () => {
    try {
      const client = await pool.connect();
      console.log("Database connected successfully");
      client.release();
    } catch (err) {
      console.error("Database connection error:", err.message);
    }
  })();
}

module.exports = pool;