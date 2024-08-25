const mongoose = require("mongoose");
const { hash } = require("bcrypt");
const {Schema} = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  img: { type: String, trim: true, default: "" },
  bg: { type: String, trim: true },
  role: { type: Number, default: 3 },
  bio: { type: String, trim: true },
  following: [{ type: Schema.Types.ObjectId, default: [] }],
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await hash(this.password, 10);
});

exports.User = mongoose.model("User", userSchema);
