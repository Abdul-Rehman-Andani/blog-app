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
  group
} = require("../controllers/blog");
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

blog
  .get("/", read)
  .get("/count", countAll)
  .get("/group", group)
  .get("/:id", show)
  .post("/:id", upload.single("img"), create)
  .get("/count/:catogary", count)
  .get("/catogary/:catogary", catogary)
  .get("/user/:id", readUser)
  .patch("/:id", update)
  .delete("/:id", del)

exports.blog = blog;
