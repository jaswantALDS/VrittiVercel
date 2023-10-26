import { Constants } from "@/constants/constants";
import axios from "@/utils/axios";

export default class ClientController {
  private header = {
    headers: {
      Authorization: "",
    },
  };
  constructor(token?: string) {
    this.header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  getMyClients = async (token?: string, searchString?: string) => {
    try {
      const { data } = await axios.get(`${Constants.clients}?${searchString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      throw err;
    }
  };
  getJobCategories = async () => {
    try {
      const { data } = await axios.get(`${Constants.jobCategories}`);
      return data;
    } catch (err) {
      throw err;
    }
  };
  getIndustries = async () => {
    try {
      const { data } = await axios.get(`${Constants.industries}`);
      return data;
    } catch (err) {
      throw err;
    }
  };
  getJobCategoriesDepartment = async (id: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.jobCategoriesDepartment}?category_id=${id}`
      );
      return data;
    } catch (err) {
      throw err;
    }
  };

  getJobLocation = async () => {
    try {
      const { data } = await axios.get(`${Constants.jobLocation}`);
      return data;
    } catch (err) {
      throw err;
    }
  };
  postEmployerRequirements = async (values: any) => {
    try {
      const { data } = await axios.get(`${Constants.requirements}`, values);
      return data;
    } catch (err) {
      throw err;
    }
  };
}
