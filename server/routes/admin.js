const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

/* ================= DASHBOARD STATS ================= */
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const totalUsers = await pool.query(
      "SELECT COUNT(*) AS total FROM users"
    );

    const totalProducts = await pool.query(
      "SELECT COUNT(*) AS total FROM products"
    );

    const totalRevenue = await pool.query(
      "SELECT COALESCE(SUM(price),0) AS total FROM products"
    );

    const recentUsers = await pool.query(
      "SELECT id, name, email, created_at FROM users ORDER BY created_at DESC LIMIT 5"
    );

    res.json({
      totalUsers: totalUsers.rows[0].total,
      totalProducts: totalProducts.rows[0].total,
      totalRevenue: totalRevenue.rows[0].total,
      recentUsers: recentUsers.rows
    });

  } catch (err) {
    console.error("Dashboard Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


/* ================= GET USERS ================= */
router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT id, name, email, created_at FROM users ORDER BY id DESC"
    );

    res.json(users.rows);

  } catch (err) {
    console.error("❌ Get Users Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


/* ================= ADD USER ================= */
router.post("/users", authMiddleware, async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3)",
      [name, email, password]
    );

    res.json({ message: "User Added Successfully" });

  } catch (err) {
    console.error("❌ Add User Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


/* ================= GET PRODUCTS ================= */
router.get("/products", authMiddleware, async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(products.rows);

  } catch (err) {
    console.error("❌ Get Products Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


/* ================= ADD PRODUCT ================= */
router.post("/products", authMiddleware, async (req, res) => {
  const { title, price, category, stock } = req.body;

  if (!title || !price) {
    return res.status(400).json({ message: "Title and Price are required" });
  }

  try {
    await pool.query(
      "INSERT INTO products (title, price, category, stock) VALUES ($1,$2,$3,$4)",
      [title, price, category, stock]
    );

    res.json({ message: "Product Added Successfully" });

  } catch (err) {
    console.error("❌ Add Product Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


/* ================= DELETE USER ================= */
router.delete("/users/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.json({ message: "User Deleted Successfully" });

  } catch (err) {
    console.error("❌ Delete User Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


/* ================= MONTHLY USERS (FOR CHART) ================= */
router.get("/monthly-users", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DATE_TRUNC('month', created_at) AS month,
             COUNT(*) AS total
      FROM users
      GROUP BY month
      ORDER BY month
    `);

    res.json(result.rows);

  } catch (err) {
    console.error("❌ Monthly Users Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;