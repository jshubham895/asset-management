import { getApi, postApiWithFiles } from "../utils/apiCall";
import { API_CONSTANTS } from "../utils/contants";

const getAssetInfo = async () => {
  const data = await getApi(API_CONSTANTS.getAsset);
};
const createAssetData = async (body) => {
  const { user } = JSON.parse(localStorage.getItem("token"));
  const data = await postApiWithFiles(
    `${API_CONSTANTS.createAsset}/${user._id}`,
    body
  );
  return data;
};

export default {
  getAssetInfo,
  createAssetData,
};
