import axios from "../utils/axios";
import {apiBaseUrl} from "../config/config";

export const jobAPI = {
  add:
    (userId, title, level, description) => axios.
      post(apiBaseUrl + '/job/add', {
        userId, title, level, description
      }),
  update:
    (_id, title, level, description) => axios.
      post(apiBaseUrl + '/job/update', {
        _id, title, level, description
      }),
  get:
    (jobId) => axios.get(apiBaseUrl + `/job/get/${jobId}`),
  delete:
    (jobId) => axios.get(apiBaseUrl + `/job/delete/${jobId}`),
}