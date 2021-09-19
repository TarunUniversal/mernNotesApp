const jwt = require("jsonwebtoken");

const key = "c1t2st2s9";
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

module.exports = generateToken;