import axios from "../utils/axios";
import {apiBaseUrl} from "../config/config";

export const chatAPI = {
  getChatsByUserId:
    (userId) => axios.get(apiBaseUrl + `/chat/get/${userId}`),
};