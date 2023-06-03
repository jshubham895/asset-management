import Asset from "../models/Asset.js";

class AssetDao {
  createAsset(userId, asset) {
    return new Promise(async (resolve, reject) => {
      try {
        const newAsset = new Asset({
          user: userId,
          ...asset,
        });
        const savedAsset = (await newAsset.save()).populate({
          path: "user",
          select: "-password",
        });
        resolve(savedAsset);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default AssetDao;
