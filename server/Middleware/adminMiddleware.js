const jwt = require("jsonwebtoken");
const User = require('../Models/userModel');

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.json({ msg: "Invalid Authentication" });

    jwt.verify(token, process.env.REFRESH_TOKEN, async(error, user) => {
      if (error) 
      {
        return res.json({ msg: "Invalid Authentication" });
      }
      else {
        const data = await User.findOne({_id: user.id});
        if (data.role != 1)
          return res.status(500).json({ msg: "Admin Resources Access Denied" });
        next();
      }
    });
    
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = adminMiddleware;
