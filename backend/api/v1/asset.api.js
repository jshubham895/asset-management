import express from "express";
import { upload } from "../../config/aws-multer.js";
import {
  createAsset,
  getAssetById,
  getAssetByUserId,
  destroyAssetById,
  updateAssetById,
} from "../../controllers/assetController.js";
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "OK",
  });
});

router.get("/user/:userId", getAssetByUserId);

router.get("/:assetId", getAssetById);

router.put("/update/:assetId", updateAssetById);

router.post("/create/:userId", upload.single("folder"), createAsset);

router.delete("/delete/:assetId", destroyAssetById);

export default router;
