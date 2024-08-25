require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { user } = require("./routes/user");
const { blog } = require("./routes/blog");
const { follow } = require("./routes/follow");
const { catogary } = require("./routes/catogary");

// ? database connection
main().catch((err) => console.log("connection issue"));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("connect");
}

// ? middlewares
app.use(cors({credentials: true, origin : ["http://localhost:5173", "http://localhost:9000", "*"]}));

app.use(express.json());
// app.use(session({
//   secret : "B blogic",
//   resave: true,
//   saveUninitialized : true,
//   cookie: {secure : true}
// }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/user", user);
app.use("/blog", blog);
app.use("/follow", follow);
app.use("/catogary", catogary);


// ? listing to server
app.listen(process.env.PORT, () =>
  console.log(`listing to port : ${process.env.PORT}`)
);
