const express = require("express");
const { read, create, count } = require("../controllers/catogary");
const { auth } = require("../middlewares/auth/authuntication");
const {authorization} = require("../middlewares/auth/authorization");
const catogary = express.Router();

catogary
    .get("/", read)
    .post("/", create)
    .get("/count", count)

exports.catogary = catogary;
