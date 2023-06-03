import { postApi } from "../utils/apiCall";
import { API_CONSTANTS } from "../utils/contants";

const createUser = async (body) => {
  const data = await postApi(API_CONSTANTS.createUser, body);
  return data;
};

export default {
  createUser,
};
