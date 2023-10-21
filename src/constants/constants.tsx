export class Constants {
  static API_URL = "https://backend.vrittigroup.com/"; // Define with an initial value
  // static API_URL = "http://192.168.0.15:8000/"; // Define with an initial value
  static X_API_KEY: "X API Key";
  static loginEmployer = `${Constants.API_URL}employer/login/`;
  static me = `${Constants.API_URL}employer/me/`;
  static registerEmployer = `${Constants.API_URL}employer/register/`;
  static authenticateLawyer = `${Constants.API_URL}employer/auth/`;
  static SEND_OTP = `${Constants.API_URL}settings/send-otp/`;
  static resetPassword = `${Constants.API_URL}employer/forget-password/`;
  static otpSendOnEmail = `${Constants.API_URL}employer/send-verify-otp/`;
  static otpSendOnEmailSettings = `${Constants.API_URL}settings/send-verify-otp/`;
  static userVerify = `${Constants.API_URL}employer/verify-user/`;
  static verifyOtp = `${Constants.API_URL}employer/verify-otp/`;
  static requirements = `${Constants.API_URL}employer/requirements/`;
  static verifyOtpSettings = `${Constants.API_URL}settings/verify-otp/`;

  static checkIfUserExists = `${Constants.API_URL}customer/check-if-user-exists/`;
  static update = `${Constants.API_URL}customer/me/update`;
  static caseCategories = `${Constants.API_URL}cases/categories/`;
  static caseTemplates = `${Constants.API_URL}cases/templates/`;
  static caseStructures = `${Constants.API_URL}cases/my/`;
  static case = `${Constants.API_URL}cases/my/`;
  static caseOutputs = `${Constants.API_URL}cases/case-outputs/`;
  static clients = `${Constants.API_URL}customer/my-clients/`;
  static usage = `${Constants.API_URL}cases/usage/`;
  static verificationByEmail = `${Constants.API_URL}customer/user-verification-by-email/`;
  static employeeverify = `${Constants.API_URL}employee/verify-user/`;
  static employesendotp = `${Constants.API_URL}settings/send-verify-otp/`;
  static employesendPhoneotp = `${Constants.API_URL}settings/send-mobile-otp/`;
  static employeesend_otp = `${Constants.API_URL}settings/verify-otp/`;
  static employee_QualificationType = `${Constants.API_URL}masters/qualification-type/`;
  static employee_qualification = `${Constants.API_URL}employee/qualifications/`;
  static addDocuments = `${Constants.API_URL}employee/documents/`;
  static registerEmployee = `${Constants.API_URL}employee/register/`;
  static employerprefix_no = `${Constants.API_URL}masters/dial-codes/`;
  static employercountry = `${Constants.API_URL}localization/countries/`;
  static get_national_id = `${Constants.API_URL}localization/national-cards/?country=`;

  static hr = `${Constants.API_URL}hr/`;
  static hr_login = `${Constants.hr}login/`;
  static hr_me = `${Constants.hr}me/`;

  static technical_hr = `${Constants.API_URL}technicalhr/`;
  static technical_hr_login = `${Constants.technical_hr}login/`;
  static technical_hr_me = `${Constants.technical_hr}me/`;

  static employee_login = `${Constants.API_URL}employee/login/`;
  static employee_me = `${Constants.API_URL}employee/me/`;
  static employee_update = `${Constants.API_URL}employee/me/update/`;
  static employee_employments = `${Constants.API_URL}employee/employments/`;
  static employee_country = `${Constants.API_URL}localization/countries/`;
  // static employee_state = `${Constants.API_URL}localization/countries/`;
  // static employee_city = `${Constants.API_URL}localization/countries/`;
  static employee_dialcode = `${Constants.API_URL}masters/dial-codes/`;
  static employee_preferedmode = `${Constants.API_URL}masters/preferred-mode-type/`;
}
