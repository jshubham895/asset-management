import { postApi } from "../utils/apiCall";
import { API_CONSTANTS } from "../utils/contants";

const login = async (body) => {
  const data = await postApi(API_CONSTANTS.loginUser, body);
  return data;
};

export default {
  login,
};
