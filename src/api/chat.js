import axios from "../utils/axios";
import {apiBaseUrl} from "../config/config";

export const chatAPI = {
  getChatsByUserId:
    (userId) => axios.get(apiBaseUrl + `/chat/user/${userId}`),
  getChatDetails:
    (userId, partnerId) => axios.get(apiBaseUrl + `/chat/partner/${partnerId}/user/${userId}`),
};