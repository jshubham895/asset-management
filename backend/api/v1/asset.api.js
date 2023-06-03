import express from "express";
import { upload } from "../../config/aws-multer.js";
import { createAsset } from "../../controllers/assetController.js";
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "OK",
  });
});

router.post("/create/:userId", upload.single("folder"), createAsset);

export default router;
