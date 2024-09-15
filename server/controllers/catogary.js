const { Catogary } = require("../models/catogary");

//  ? read
exports.read = async (req, res) => {
  try {
    const data = await Catogary.find();
    console.log(data)
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

// ? create
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.body);
    const catogary = await Catogary.create({name});
    if(catogary){
    res.status(201).json("created");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.count = async (req, res) => {
  try {
    let count = await Catogary.find().countDocuments();
    res.json(count);
  } catch (error) {
    console.log(error);
  }
};

