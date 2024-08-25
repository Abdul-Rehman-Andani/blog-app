const jwt = require("jsonwebtoken");

exports.setToken = (res, user, msg) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });

  return res
    .cookie("token", token, {
      secure: true,
    })
    .json({ msg, token, img: user.img });
};
