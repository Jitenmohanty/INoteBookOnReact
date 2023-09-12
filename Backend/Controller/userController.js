const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "JituNoteApp";

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const usernameCheck = await User.findOne({ name });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    return res.json({ authToken, status: true });
    // delete user.password;
    // return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    let success = false;
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      success = false;
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ authToken, success });

    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required

module.exports.getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    return res.send(user);
    // res.json({ status: true, user })
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
};
