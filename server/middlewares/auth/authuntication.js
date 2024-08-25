const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

exports.auth = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res.json("unauthicated");
    }

    const verify = jwt.verify(req.cookies.token, process.env.JWT_KEY);


    const user = await User.findOne({ _id: verify.id });

    if (!user) {
      return res.json("user not found");
    }
    req.id = user._id;

    return next();
  } catch (error) {
    console.log(error);
  }
};
