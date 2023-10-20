import * as Yup from "yup";

export const emailValidation = Yup.object().shape({
  email: Yup.string().email("Valid email").required("Email is required"),
});

export const personalDetailsValidation = Yup.object().shape({
  first_name: Yup.string().required("required"),
  last_name: Yup.string().required("required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const PersonalProfile = Yup.object().shape({
  dob: Yup.string().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  martial_status: Yup.string().required("Marital Status is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  experience: Yup.string().required("Year of Experience is required"),
  phone_prefix: Yup.string().required("Phone Prefix is required"),
  phone: Yup.string().required("Phone Number is required"),

  passport_photo: Yup.mixed().required("Passport Size Photo is required"),
  preferred_trade: Yup.string().required("Preferred Trade is required"),
  preferred_mode_of_interview: Yup.string().required(
    "Preferred Mode of Interview is required"
  ),
  cv: Yup.mixed().required("CV is required"),
  // phoneOtp: Yup.string().required("OTP is required."),
});

export const QualificationDetails = Yup.object().shape({
  qualification: Yup.string().required("Qualification is required"),
  college: Yup.string().required("Academy is required"),
});

export const DocumentValidations = Yup.object().shape({
  national_Card_Doc: Yup.object().shape({
    country: Yup.string().required("Country is required"),
    documentNo: Yup.string().required("Document Number is required"),
    document: Yup.mixed().required("Document is required"),
  }),
  passport_Card: Yup.object().shape({
    documentNo: Yup.string().required("Document Number is required"),
    document: Yup.mixed().required("Document is required"),
    expiry_date: Yup.date().required("Expiry Date is required"),
  }),
});
