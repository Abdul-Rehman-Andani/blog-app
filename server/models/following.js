const mongoose = require("mongoose");
const { Schema } = mongoose;

const followSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, trim: true, required: true , ref: "User"},
    followId : {type : Schema.Types.ObjectId,  ref: "User", trim : true, required : true}
});

exports.Follow = mongoose.model("Follow", followSchema);