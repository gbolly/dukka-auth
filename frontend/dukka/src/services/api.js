import axios from "axios";

import { getFromStore } from "../utils/storage-helpers";
import { loginUrl, signupUrl, welcomeUrl } from "./urls";

export const request = async (url, action, data = null) => {
  const token = await getFromStore('accessToken');
  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await axios({
      method: action,
      url,
      data,
      headers: headers,
      maxBodyLength: Infinity,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const userSignUp = async data => {
  return await request(signupUrl(), "post", data);
};

export const userLogin = async data => {
  return await request(loginUrl(), "post", data);
};

export const userWelcome = async () => {
  return await request(welcomeUrl(), "get");
};
