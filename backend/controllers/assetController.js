import AWS from "aws-sdk";
import fs from "fs-extra";
import env from "../config/environment.js";
import path from "path";
import AdmZip from "adm-zip";
import AssetDao from "../dao/assetDao.js";

const assetDao = new AssetDao();

export const createAsset = async (req, res) => {
  const { userId } = req.params;
  const zipFile = req.file;
  const __dirname = path.resolve();
  const tempDir = path.join(__dirname, "tmp");
  if (!zipFile) {
    return res.status(400).send("No zip file provided");
  }
  const zip = new AdmZip(zipFile.path);
  zip.extractAllTo(tempDir, true);
  const targetFolderPath = path.join(
    tempDir,
    zipFile.originalname.split(".")[0]
  );

  let folder = {
    url: `https://${env.awsBucketName}.s3.amazonaws.com`,
  };

  try {
    folder.keys = await uploadFiles(targetFolderPath);
    removeDirectory(tempDir);
    const asset = {
      name: req.body.name,
      tags: req.body.tags.split(","),
      category: req.body.category,
      assetSource: {
        url: folder.url,
        keys: folder.keys,
      },
    };
    const data = await assetDao.createAsset(userId, asset);
    return res
      .status(200)
      .json({ success: true, message: "asset created", data });
  } catch (err) {
    console.error("Error uploading folder:", err);
    return res.status(500).send("Error uploading folder");
  }
};

const uploadFiles = async (folderPath) => {
  const keys = [];
  const s3 = new AWS.S3({
    accessKeyId: env.accessKeyId,
    secretAccessKey: env.secretAccessKey,
  });
  const uploadParams = {
    Bucket: env.awsBucketName,
    Key: `${path.basename(folderPath)}/`,
  };
  const files = await fs.promises.readdir(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const fileContent = await fs.promises.readFile(filePath);
    const data = await s3
      .upload({
        ...uploadParams,
        Key: uploadParams.Key + file,
        Body: fileContent,
      })
      .promise();
    keys.push(data.Key);
  }

  return keys;
};

const removeDirectory = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const currentPath = path.join(dirPath, file);

      if (fs.lstatSync(currentPath).isDirectory()) {
        // Recursively remove subdirectories
        removeDirectory(currentPath);
      } else {
        // Delete file
        fs.unlinkSync(currentPath);
      }
    });

    // Remove the empty directory
    fs.rmdirSync(dirPath);
    console.log("Directory removed successfully.");
  } else {
    console.log("Directory does not exist.");
  }
};
