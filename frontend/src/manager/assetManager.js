import { deleteApi, getApi, postApiWithFiles, putApi } from "../utils/apiCall";
import { API_CONSTANTS } from "../utils/contants";

const getAssetInfo = async () => {
  const { user } = JSON.parse(localStorage.getItem("token"));
  const data = await getApi(`${API_CONSTANTS.getAssetByUser}/${user._id}`);
  return data;
};

const createAssetData = async (body) => {
  const { user } = JSON.parse(localStorage.getItem("token"));
  const data = await postApiWithFiles(
    `${API_CONSTANTS.createAsset}/${user._id}`,
    body
  );
  return data;
};

const getAssetById = async (assetId) => {
  const data = await getApi(`${API_CONSTANTS.getAsset}/${assetId}`);
  return data;
};

const deleteAssetById = async (assetId) => {
  const data = await deleteApi(`${API_CONSTANTS.deleteAssetById}/${assetId}`);
  return data;
};

const updateAssetById = async (assetId, body) => {
  const data = await putApi(
    `${API_CONSTANTS.updateAssetById}/${assetId}`,
    body
  );
  return data;
};

export default {
  getAssetInfo,
  createAssetData,
  getAssetById,
  deleteAssetById,
  updateAssetById,
};
