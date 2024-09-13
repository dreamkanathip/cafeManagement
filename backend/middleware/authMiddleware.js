const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateToken = async (req, res, next) => {
  const token = req.cookies["jwt"];
  if (!token)
    return res.status(401).send({ message: "Authentication token required" });

  try {
    const claims = jwt.verify(token, "secret");
    const user = await User.findOne({ _id: claims._id });
    if (!user)
      return res.status(401).send({ message: "Invalid authentication token" });

    req.user = user; // Attach user object to request
    next();
  } catch (err) {
    res.status(401).send({ message: "Invalid authentication token" });
  }
};

module.exports = authenticateToken;
