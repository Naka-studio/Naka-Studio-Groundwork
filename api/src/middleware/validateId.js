const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id) || Number(id) > 2147483647) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }
  next();
};

module.exports = validateId;
