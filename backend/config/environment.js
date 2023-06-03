import dotenv from "dotenv";
dotenv.config();

const development = {
  name: "development",
  db_url: process.env.MONGO_DEV_URL,
  jwt_secret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsBucketName: process.env.AWS_S3_BUCKET_NAME,
  region: process.env.AWS_S3_REGION,
};

const production = {
  name: "production",
  db_url: process.env.MONGO_PROD_URL,
  jwt_secret: process.env.JWT_SECRET,
  port: process.env.PORT,
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsBucketName: process.env.AWS_S3_BUCKET_NAME,
  region: process.env.AWS_S3_REGION,
};

export default eval(process.env.NODE_ENV) == undefined
  ? development
  : eval(process.env.NODE_ENV);
