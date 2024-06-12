const express = require("express");
const user = express.Router();
const {
  signup,
  signin,
  profile,
  editProfile,
  count,
  read,
  authantication,
  logout,
} = require("../controllers/user");
const { auth } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

user
  .get("/", read)
  .get("/count", count)
  .post("/signup", signup)
  .post("/signin", signin)
  .get("/logout", logout)
  .get("/profile/:id", profile)
  .get("/auth",auth, authantication)
  .patch("/profile/:id", upload.single("img"), editProfile);

exports.user = user;
