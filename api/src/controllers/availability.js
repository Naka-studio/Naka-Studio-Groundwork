const pool = require("../config/db");

// GET semua availability (global + per service)
const getAvailability = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM availability ORDER BY id ASC"
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
};

// GET global availability aja (service_id IS NULL)
const getGlobalAvailability = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM availability WHERE service_id IS NULL"
    );
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// GET availability by service_id
const getServiceAvailability = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM availability WHERE service_id = $1",
      [req.params.service_id]
    );
    if (!rows.length)
      return res.status(404).json({ success: false, message: "Service availability not found" });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// UPDATE by id
const updateAvailability = async (req, res, next) => {
  const { status, message } = req.body;
  const allowed = ["available", "limited", "unavailable"];
  if (!allowed.includes(status))
    return res.status(400).json({ success: false, message: "Invalid status" });
  try {
    const { rowCount } = await pool.query(
      "UPDATE availability SET status=$1, message=$2, updated_at=NOW() WHERE id=$3",
      [status, message, req.params.id]
    );
    if (!rowCount)
      return res.status(404).json({ success: false, message: "Availability not found" });
    res.json({ success: true, message: "Availability updated" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAvailability,
  getGlobalAvailability,
  getServiceAvailability,
  updateAvailability
};