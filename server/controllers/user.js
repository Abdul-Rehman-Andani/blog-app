const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { setToken } = require("../utils/setToken");

// ? end points for Sign up API
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //console.log(req.body);

    const user = await User.create({ name, email, password });

    if (user) {
      setToken(res, user, "user created");
    }
  } catch (error) {
    console.log(error);
  }
};

// ? end point for Sign in API
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json("invalid password");
    }

    setToken(res, user, "user found");
  } catch (error) {
    console.log(error);
  }
};

// ? end point for profile API
exports.profile = async (req, res) => {
  const user = await User.findOne({ _id: req.id });
  res.json(user);
};

// ? end point for edit user profile API
exports.editProfile = async (req, res) => {
  const { name, bio } = req.body;

  // const user = await User.findOne({ _id: req.id });

  const update = await User.findOneAndUpdate(
    { _id: req.id },
    { name, bio, img: req.file.filename },
    { new: true }
  );
};

exports.count = async (req, res) => {
  try {
    let count = await User.find().countDocuments();
    res.json(count);
  } catch (error) {
    console.log(error);
  }
};

// ? read
exports.read = async (req, res) => {
  try {
    const data = await User.find().select("-password");
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

exports.del = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findOneAndDelete({ _id: id });
    res.json("user deleted");
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      sameSite: "Strict", // Include this if it was set when the cookie was created
      httpOnly: true, // Include if it was set when the cookie was created
    });
    res.json("user logout");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Logout failed" });
  }
};

exports.show = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).select("name bio");
  res.json(user);
};

exports.update = async (req, res) => {
  const { name, bio } = req.body;
  const { id } = req.params;

  const update = await User.findOneAndUpdate(
    { _id: id },
    { name, bio },
    { new: true }
  );
  if (update) {
    res.json("updated");
  }
};
