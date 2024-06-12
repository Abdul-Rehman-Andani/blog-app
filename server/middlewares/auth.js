const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

exports.auth = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      res.json("unauthorized");
    }

    const { id } = jwt.decode(req.cookies.token);

    // if(!jwt.verify(id, process.env.JWT_KEY)){
    //   res.json("unauthorized token");
    // }

    const user = await User.findOne({ _id: id });


    if (!user) {
      res.json("user not found");
    }
    req.id = user._id;

    next();
    return 
  } catch (error) {
    console.log(error);
  }
};
