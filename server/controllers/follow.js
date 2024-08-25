const { Follow } = require("../models/following");

// ! create
exports.create = async (req, res) => {
  try {
    const { followId } = req.body;
    console.log(req.body);
    const user = await Follow.create({ userId: req.id, followId });
    if (user) {
      res.status(201).json({ message: "created" });
    }

    return;
  } catch (error) {
    console.log(error);
  }
};

// read
exports.read = async (req, res) => {
  try {
    const { followId } = req.query;

    const user = await Follow.findOne({
      $and: [{ userId: req.id }, { followId }],
    });

   

     if(req.id == followId){
      res.json("account");
      return;
    }

    if (!user) {
      res.json("unfollewd");
      return;
    }

    res.json("followed");
    return;
  } catch (error) {
    console.log(error);
  }
};
