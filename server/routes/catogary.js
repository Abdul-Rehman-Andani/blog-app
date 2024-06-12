const express = require("express");
const { read, create, count } = require("../controllers/catogary");
const catogary = express.Router();

catogary
    .get("/", read)
    .post("/", create)
    .get("/count", count)

exports.catogary = catogary;
