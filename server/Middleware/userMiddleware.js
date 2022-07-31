const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.json({ msg: "Invalid Authentication" });

    jwt.verify(token, process.env.REFRESH_TOKEN, (error, user) => {
      if (error) return res.json({ msg: "Invalid Authentication" });

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
