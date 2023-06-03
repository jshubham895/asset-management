import express from "express";
import assetApi from "./asset.api.js";
import userApi from "./user.api.js";
import authApi from "./auth.api.js";

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "v1 api",
  });
});

// Crud Api Asset

router.use("/asset", assetApi);

// User
router.use("/user", userApi);

// Auth
router.use("/auth", authApi);

export default router;
