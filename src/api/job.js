import axios from "../utils/axios";
import {apiBaseUrl} from "../config/config";

export const jobAPI = {
  add:
    (userId, title, level, description) => axios.
    post(apiBaseUrl + '/job/add', {
      userId, title, level, description
    }),
}