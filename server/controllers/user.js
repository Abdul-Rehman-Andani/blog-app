const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ? end points for Sign up API
exports.signup = async (req, res) => {
  try {
    const { name, email, password, country, city } = req.body;
    //console.log(req.body);

    bcrypt.hash(password, 10, (err, hash) => {
      const user =  User.create({ name, email, password: hash });
      if (user) {
        res.status(201).json({ message: "success" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// ? end point for Sign in API
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
            expiresIn: "1d",
          });
          //console.log(token);
          //req.session.token = token;
          //req.session.token.save();
          res.cookie("token", token,{ httpOnly: false , secure : true}).json({
            token: token,
            userId: user._id,
            username: user.name,
            profile: user.img,
          });
        }
      });
    } else {
      res.json({ status: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

// ? end point for profile API
exports.profile = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });
  if (user) {
    res.json(user);
  }
};

// ? end point for edit user profile API
exports.editProfile = async (req, res) => {
  const { id } = req.params;
  const { name, bio, img } = req.body;

  const user = await User.findOne({ _id: id });

  if (user.img == img) {
    const update = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
  } else {
    const update = await User.findOneAndUpdate(
      { _id: id },
      { name, bio, img: req.file.filename },
      { new: true }
    );
  }
};

exports.count = async (req, res) => {
 try{
  let count = await User.find().countDocuments();
  res.json(count);
 }
 catch(error){
  console.log(error);
 }
}

// ? read
exports.read = async (req, res) => {
  try{
    const data = await User.find();
    res.json(data);
  }
  catch(error){
    console.log(error);
  }
}

exports.del = async (req, res) => {
  try{
    const {id} = req.params;
    const del = await User.findOneAndDelete({_id : id});
    if(del){
      res.json("deleted");
    }
  }
  catch(error){
    console.log(error);
  }
}

exports.authantication = async (req, res) => {
  res.json("user found");
}

exports.logout = async (req, res) => {
  try{
    res.clearCookie("token");
  }
  catch(error){
    console.log(error);
  }
}