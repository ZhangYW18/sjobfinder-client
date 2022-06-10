import axios from "../utils/axios";
import {apiBaseUrl} from "../config/config";

export const userAPI = {
  login:
    (username, password) => axios.
      post(apiBaseUrl + '/user/login', {
        username, password
      }),
  register:
    (username, password, identity) => axios.
      post(apiBaseUrl + '/user/register', {
        username, password, identity
      }),
  updateProfile:
    (_id, name, avatar, introduction, preference, company) => axios.
      post(apiBaseUrl + '/user/profile', {
        _id, name, avatar, introduction, preference, company
      }),
  // getProfile:
  //   (userId) => axios.
  //     get(apiBaseUrl + `/user/profile/${userId}`),
}