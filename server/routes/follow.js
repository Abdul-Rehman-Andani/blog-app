const express = require("express");
const follow = express.Router();
const { create, read } = require("../controllers/follow");
const {auth} = require("../middlewares/auth");

follow
    .post("/", auth, create)
    .get("/", auth, read)


exports.follow = follow;