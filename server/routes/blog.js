const express = require("express");
const blog = express.Router();
const {
  create,
  read,
  readUser,
  show,
  catogary,
  count,
  countAll,
  update,
  del,
  group,
} = require("../controllers/blog");
const { upload } = require("../middlewares/multer");
const { auth } = require("../middlewares/auth/authuntication");
const { authorization } = require("../middlewares/auth/authorization");

blog
  .get("/", read)
  .get("/count", countAll)
  .get("/group", auth, authorization, group)
  .get("/:id", show)
  .post("/", auth, upload.single("img"), create)
  .get("/count/:catogary", count)
  .get("/catogary/:catogary", catogary)
  .get("/user/:id", readUser)
  .patch("/:id", update)
  .delete("/:id", del);

exports.blog = blog;
