const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) return res.sendStatus(401);
  const payload = jwt.verify(token, process.env.SECRET);
  if (!payload) return res.sendStatus(401);
  req.jwt = payload;
  next();
}

module.exports = {
  auth,
}
