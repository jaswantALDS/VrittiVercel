import { Constants } from "@/constants/constants";
import { store } from "@/store";
import axios, { axiosController } from "@/utils/axios";

export default class EmployeeController {
  //   static employeeverify(value: any) {
  //     throw new Error("Method not implemented.");
  //   }

  private axios = axiosController({});
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

    this.axios = axiosController({ Authorization: `Bearer ${token}` });
  }

  employeeverify = async (values: any) => {
    console.log("verifying", values);
    try {
      const { data } = await axios.post(Constants.employeeverify, values);
      return data;
    } catch (err) {
      throw err;
    }
  };

  registerEmployee = async (values: any) => {
    try {
      const { data } = await axios.post(Constants.registerEmployee, values);
      return data;
    } catch (err) {
      throw err;
    }
  };

  employeverifyotp = async (email: any, type: any) => {
    try {
      const data = await axios.post(`${Constants.employesendotp}`, {
        email: email,
        type: type,
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  employesendPhoneotp = async (phone: any, type: any) => {
    try {
      const data = await axios.post(`${Constants.employesendPhoneotp}`, {
        email: phone,
        type: type,
      });
      // console.log("data", data);
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  sendOtpToServer = async (userOtp: any, otpToken: any) => {
    try {
      const data = await axios.post(`${Constants.employeesend_otp}`, {
        otp: userOtp,
        jwt_token: otpToken,
      });
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  employee_me = async () => {
    try {
      const { data } = await axios.get(Constants.employee_me, this.header);
      return data;
    } catch (error) {
      throw error;
    }
  };

  employee_employments = async (values?: any) => {
    try {
      const { data } = await axios.post(
        Constants.employee_employments,
        values,
        this.header
      );
      return data;
    } catch (err) {
      throw err;
    }
  };

  employee_update = async (values: any) => {
    try {
      const { data } = await axios.put(Constants.employee_update, values, {
        headers: {
          ...this.header.headers,
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (err) {
      throw err;
    }
  };

  CountryApi = async (search: string) => {
    try {
      const { data } = await axios.get(
        `${Constants.employee_country}?${search}`
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  GetNationalID = async (id: any) => {
    try {
      const { data } = await axios.get(`${Constants.get_national_id}${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  StateApi = async (id: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.employee_country}${id}/states/`
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  CityApi = async (id: any, sId: any) => {
    try {
      const { data } = await axios.get(
        `${Constants.employee_country}${id}/states/${sId}/cities/`
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  dailcode = async (search: string) => {
    try {
      const { data } = await axios.get(
        `${Constants.employee_dialcode}?${search}`
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  };
  GetPreferredModeType = async () => {
    try {
      const res = await axios.get(`${Constants.employee_preferedmode}`);
      return res;
    } catch (error: any) {
      console.debug(error);
      throw error;
    }
  };

  employee_QualificationType = async () => {
    try {
      const res = await axios.get(`${Constants.employee_QualificationType}`);
      return res;
    } catch (error: any) {
      console.debug(error);
      throw error;
    }
  };

  employee_Qualification = async (values: any) => {
    try {
      const res = await axios.post(
        `${Constants.employee_qualification}`,
        values,
        {
          headers: {
            ...this.header.headers,
          },
        }
      );
      return res;
    } catch (error: any) {
      console.debug(error);
      throw error;
    }
  };

  addDocuments = async (values: any) => {
    try {
      const res = await axios.post(`${Constants.addDocuments}`, values, {
        headers: {
          ...this.header.headers,
        },
      });
      return res;
    } catch (error: any) {
      console.debug(error);
      throw error;
    }
  };
}
