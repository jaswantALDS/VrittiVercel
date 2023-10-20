import { Config } from "@/constants/config";
import { Constants } from "@/constants/constants";
import rnAxios from "axios";

const axios = rnAxios.create({
  headers: {
    "x-api-key": Constants.X_API_KEY,
  },
});
// console.log("dddd", Config.X_API_KEY);

export const axiosController = (headers: any) =>
  rnAxios.create({
    headers: {
      "x-api-key": Constants.X_API_KEY,
      ...headers,
    },
  });

export default axios;
