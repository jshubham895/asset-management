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

  getAssetsByUserId(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const assets = await Asset.find({
          user: userId,
          $or: [{ deleted: { $exists: false } }, { deleted: false }],
        })
          .populate({
            path: "user",
            select: "-password",
          })
          .sort({
            createdAt: -1,
          });
        resolve(assets);
      } catch (err) {
        reject(err);
      }
    });
  }

  getAssetsByAssetId(assetId) {
    return new Promise(async (resolve, reject) => {
      try {
        const assets = await Asset.findOne({
          _id: assetId,
          $or: [{ deleted: { $exists: false } }, { deleted: false }],
        })
          .populate({
            path: "user",
            select: "-password",
          })
          .sort({
            createdAt: -1,
          });
        resolve(assets);
      } catch (err) {
        reject(err);
      }
    });
  }

  destryAssetByAssetId(assetId) {
    return new Promise(async (resolve, reject) => {
      try {
        const assets = await Asset.updateOne(
          {
            _id: assetId,
          },
          { $set: { ["deleted"]: true } }
        ).populate({
          path: "user",
          select: "-password",
        });
        resolve(assets);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateAssetByAssetId(assetId, asset) {
    return new Promise(async (resolve, reject) => {
      try {
        const assets = await Asset.updateOne(
          {
            _id: assetId,
          },
          { $set: asset }
        )
          .populate({
            path: "user",
            select: "-password",
          })
          .sort({
            createdAt: -1,
          });
        resolve(assets);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default AssetDao;
