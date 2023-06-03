import AWS from "aws-sdk";
import multer from "multer";
import fs from "fs";
import path from "path";
// import multerS3 from "multer-s3";
// import env from "./environment.js";

// // Configure AWS S3 client
// AWS.config.update({
//   accessKeyId: env.accessKeyId,
//   secretAccessKey: env.secretAccessKey,
// });

// const s3 = new AWS.S3();

// const s3Storage = multerS3({
//   s3: s3,
//   bucket: env.awsBucketName,
//   contentType: multerS3.AUTO_CONTENT_TYPE,
//   key: (req, file, cb) => {
//     cb(null, "temp/" + file.originalname);
//   },
// });
// export const upload = multer({
//   storage: s3Storage,
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const temp = "./tmp";
    if (!fs.existsSync(temp)) fs.mkdirSync(temp);
    cb(null, temp);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
