import axios from "axios";

export async function getApi(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function postApi(url, body) {
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function postApiWithFiles(url, body) {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteApi(url) {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function putApi(url, body) {
  try {
    const response = await axios.put(url, body);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
