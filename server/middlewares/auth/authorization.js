const { User } = require("../../models/user");

exports.authorization = async (req, res, next) => {
  try {
    const user = await User.findOne(req.id);

    if (user.role != 1) {
      return res.json("unauthorized user");
    }

     next();
  } catch (error) {
    console.log(error);
  }
};
