const mongoose = require("mongoose");
const { Schema } = mongoose;

const catogarySchema = new Schema({
  name: { type: String, required: true, trim: true },
});

exports.Catogary = mongoose.model("Catogary", catogarySchema);
