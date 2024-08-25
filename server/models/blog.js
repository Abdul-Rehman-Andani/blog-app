const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId , ref : "User"},
  title: { type: String, required: true, trim: true },
  subtitle : {type : String, required: true, trim : true},
  body: { type: Array , trim : true, required : true},
  img: { type: String, required: true, trim: true },
  date: { type: String, required: true, trim: true },
  catogary: { type: String, required: true, trim: true },
});

exports.Blog = mongoose.model("Blog", blogSchema);
