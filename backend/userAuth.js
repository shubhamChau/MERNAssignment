const jwt = require("jsonwebtoken");
const accessTokenSecret = require("config").get("ACCESS_TOKEN_SECRET");

const userAuth = (req, res, next) => {
  try {
    const accessToken = req.headers["authorisation"];
    if (!accessToken) throw new Error("User not authorised");

    jwt.verify(accessToken, accessTokenSecret, (err, user) => {
      if (err) throw new Error("User not authorised for this");
      next();
    });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

module.exports = userAuth;
