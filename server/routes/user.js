const express = require("express");
const user = express.Router();
const {
  signup,
  signin,
  profile,
  editProfile,
  count,
  read,
  logout,
  del,
  show,
  update,
} = require("../controllers/user");
const { auth } = require("../middlewares/auth/authuntication");
const { authorization } = require("../middlewares/auth/authorization");
const { upload } = require("../middlewares/multer");

user
  .get("/", auth, authorization, read)
  .get("/count", count)
  .post("/signup", signup)
  .post("/signin", signin)
  .get("/logout", logout)
  .get("/profile", auth, profile)
  .patch("/edit-profile", upload.single("img"), auth, editProfile)
  .delete("/:id", del)
  .get("/:id", show)
  .patch("/:id", update);

exports.user = user;
