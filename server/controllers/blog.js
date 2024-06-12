const { Blog } = require("../models/blog");

//  end point for create blog API
exports.create = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, catogary, body, subtitle } = req.body;
    let date = new Date().toLocaleDateString();

    const blog = new Blog({
      userId: id,
      title,
      subtitle,
      catogary,
      body,
      img: req.file.filename,
      date,
    });
    await blog.save();

    if (blog) {
      res.status(201).json({ message: "created" });
    }
  } catch (error) {
    console.log(error);
  }
};

//  end point to read blog API
exports.readUser = async (req, res) => {
  const { id } = req.params;
  const blogs = await Blog.find({ userId: id }).populate("userId");
  res.json(blogs);
};

//  read All
exports.read = async (req, res) => {
  const { page } = req.query;
  const limit = 5;
  const blogs = await Blog.find()
    .limit(limit * page)
    .populate("userId");
  res.json(blogs);
};

//  end point for single blog API
exports.show = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id });
  res.json(blog);
};

// catogary
exports.catogary = async (req, res) => {
  const { catogary } = req.params;
  const blogs = await Blog.find({ catogary: catogary }).populate("userId");
  res.json(blogs);
};

// count all
exports.countAll = async (req, res) => {
  try {
    let count = await Blog.find().countDocuments();
    res.json(count);
  } catch (error) {
    console.log(error);
  }
};
//  count
exports.count = async (req, res) => {
  const { catogary } = req.params;
  try {
    const count = await Blog.find({ catogary }).countDocuments();
    res.json(count);
  } catch (error) {
    console.log(error);
  }
};



// update
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, body } = req.body;

    const update = await Blog.findOneAndUpdate(
      { _id: id },
      { title, subtitle, body },
      { new: true }
    );
    if (update) {
      res.json("updated");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.del = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await Blog.findOneAndDelete({_id: id});
    if(del){
      res.json("deleted");
    }
  } catch (error) {
    console.log(error);
  }
};


// grouping
exports.group = async (req, res) => {
  try {
    const data = await Blog.aggregate([{$group: {_id: "$catogary", count: {$sum : 1}} }, {$sort : {count : -1}}]);
    //res.json(data);
    //res.send("group");
    res.json(data);
  } catch (error) {
    console.log("error");
  }
};