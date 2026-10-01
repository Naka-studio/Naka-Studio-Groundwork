const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  const started = Date.now();
  try {
    await pool.query("SELECT 1");
    res.json({
      success: true,
      status: "ok",
      db: "up",
      latency_ms: Date.now() - started,
      uptime_s: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(503).json({
      success: false,
      status: "error",
      db: "down",
      timestamp: new Date().toISOString(),
    });
  }
});

module.exports = router;