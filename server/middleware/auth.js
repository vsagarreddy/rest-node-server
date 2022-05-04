const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    token = token.includes('Bearer') ? token.split(' ')[1] : token;

    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const IsUser = async (req, res, next) => {
  if (req.user.user_type === 0) {
    return next();
  }
  return res.status(401).send("Unauthorized!");   
};

const IsAdmin = async (req, res, next) => {
  console.log('########### ', req.user);
  if (req.user.user_type === 1) {
    return next();
  }
  return res.status(401).send("Unauthorized!");
};

module.exports = { verifyToken, IsUser, IsAdmin };