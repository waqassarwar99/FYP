const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.json({ msg: "Please fill all the fields" });

    if (!validateEmail(email)) return res.json({ msg: "Invalid Email" });

    // if (!validatePassword(password))
    //   return res.json({
    //     msg: "Password must be 8 characters and must contain one uppercase letter, one lowercase letter, one number and one special character",
    //   });

    const user = await User.findOne({ email });

    if (user) return res.json({ msg: "User already exists!" });

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ name, email, password: hashPassword });

    await newUser.save();

    res.json({ msg: "Account has been created Successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ msg: "This Email does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.json({ msg: "Password is incorrect" });

    const refreshToken = createRefreshToken({ id: user._id });

    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,

      path: "/user/refreshToken",

      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });

    res.json({ msg: "Login Successfull!", token: refreshToken });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//Logout
exports.logout = (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refreshToken" });
    res.json({ msg: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: passwordHash,
      }
    );
    res.json({ msg: "Password Reset" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getAccessToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ msg: "Please Login Now" });
    jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login Now" });
      const access_token = createAccessToken({ id: user.id });
      res.json({ access_token });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        name,
        avatar,
      }
    );

    res.json({ msg: "Updated" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password) => {
  return String(password)
    .toLowerCase()
    .match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
  //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN, { expiresIn: "5m" });
};
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "7d" });
};
