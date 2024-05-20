var jwt = require("jsonwebtoken");
const JWT_SECRET = "Shubhisa$comder"; //secret
const fetchuser = (req, res, next) => {
  // Get the user from jwt token and add id to req object

  const token = req.header("auth-token"); // here we get our token from header

  // It means our token is not present
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // Here we get our User

    // At the end hm next waala call krenge
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
