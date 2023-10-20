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
  registerUser = async (userData: any) => {
    console.log("userData", userData);
    try {
      // console.log("axioseee", axios);
      const { data } = await axios.post(Constants.registerEmployer, userData);
      return data;
    } catch (err) {
      throw err;
    }
  };
  sendOtpToUser = async (values: any) => {
    try {
      // console.log("axioseee", axios);
      const { data } = await axios.post(Constants.SEND_OTP, values);
      return data;
    } catch (err) {
      throw err;
    }
  };

  sendOtpToUserByEmail = async (values: any) => {
    try {
      // console.log("axioseee", axios);
      const { data } = await axios.post(
        Constants.otpSendOnEmailSettings,
        values
      );
      return data;
    } catch (err) {
      throw err;
    }
  };
  confirmPassword = async (values: any) => {
    try {
      // console.log("axioseee", axios);
      const { data } = await axios.post(Constants.resetPassword, values);
      return data;
    } catch (err) {
      throw err;
    }
  };

  SendRegisterOTP = async (email: string) => {
    try {
      const res = await axios.post(`${Constants.otpSendOnEmail}`, {
        email: email,
        type: "employer",
      });
      return res;
    } catch (error: any) {
      console.debug(error);
      throw error;
    }
  };

  VerifyEmployer = async (email: string) => {
    try {
      const res = await axios.post(`${Constants.userVerify}`, {
        email: email,
      });
      return res;
    } catch (error: any) {
      console.debug(error);
      throw error;
    }
  };

  VerifyEmployerWithOtpToken = async (otp: any, token: string) => {
    console.log("token", token);
    try {
      const res = await axios.post(`${Constants.verifyOtpSettings}`, {
        otp: otp,
        jwt_token: token,
      });
      console.log("res------", res);
      return res;
    } catch (error: any) {
      console.debug(error);
      throw error;
    }
  };

  EmployerPrefixCode = async (token?: string) => {
    try {
      const { data } = await axios.get(`${Constants.employerprefix_no}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      throw err;
    }
  };


  EmployerCountryCode = async (token?: string) => {
    try {
      const { data } = await axios.get(`${Constants.employercountry}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      throw err;
    }
  };

  EmployerStateData = async (id: string) => {
    try {
      const { data } = await axios.get(
        `${Constants.employercountry}${"1"}/states/`,
        {
          headers: {
            Authorization: `Bearer ${id}`,
          },
        }
      );
      // console.log("state_data",data);
      return data;
    } catch (err) {
      throw err;
    }
  };


  EmployerCityData = async (counrty: any, state: string) => {
    try {
      const { data } = await axios.get(
        `${Constants.employercountry }${'1'}/states/${'2'}/cities/`
      );
      // console.log("city data",data);
      return data;
    } catch (err) {
      throw err;
    }
  };
}
