const jwt = require("jsonwebtoken");

exports.adminLogin = (req, res) => {
  const { passcode } = req.body;

  if (!passcode) {
    return res.status(400).json({ success: false, message: "Passcode required" });
  }

  if (passcode !== process.env.ADMIN_PASSCODE) {
    return res.status(401).json({ success: false, message: "Invalid passcode" });
  }

  // Generate token
  const token = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "1d",
  });

  return res.status(200).json({
    success: true,
    token,
    message: "Admin authenticated successfully",
  });
};
