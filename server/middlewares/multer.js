const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  exports.upload = multer({
    storage: storage,
  });