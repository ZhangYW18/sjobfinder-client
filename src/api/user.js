import axios from "../utils/axios";
import {apiBaseUrl} from "../config/config";

export const userAPI = {
  login:
    (username, password, identity) => axios.
      post(apiBaseUrl + '/user/login', {
        username,
        password,
        identity,
      }),
}