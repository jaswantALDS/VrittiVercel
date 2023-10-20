"use client";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import TextInput from "@/components/textinput";
import Checkbox from "./Checkbox";
import ComboSelectBox from "./ComboSelectBox";
import auth from "@/controllers/employee";
import EmployeeController from "@/controllers/employee";
import moment from "moment";
import Combobox from "@/components/controls/ComboBox";
import CustomComboBox from "@/components/controls/OptionsCombox";
import ComboEbox from "@/components/controls/ComboEbox";
import { PersonalProfile } from "@/settings/validations";
import { store } from "@/store";
import { setUser } from "@/store/userSlice";
import RadioBox from "@/components/controls/RadioGroup";
import Image from "next/image";
import DialCodeBox from "@/components/controls/DialCodeBox";
import NumberInput from "@/components/controls/NumberInput";
import OtpInput from "./OtpComp";

type schema = {
  email: string;
  phone: number;
};

interface RadioOption {
  value: string;
  label: string;
}

namespace MyNamespace {
  export interface Option {
    value: string;
    label: string;
    max_length: number;
    image: string;
  }
}

export default function Contactinfo({ handleNext, handlePrev, user }: any) {
  const auth = new EmployeeController(user.accessToken);
  const [countryID, setCountryID] = useState<any>();
  const [stateID, setStateID] = useState<any>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [maxLength, setMaxLength] = useState<any>();
  const [showOtp, setShowOtp] = useState<any>(false);
  const [tempToken, setTempToken] = useState<any>("");

  const [phoneField, setPhoneField] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [customError, setCustomError] = useState("");

  const handleFormSubmit = async (
    values: any,
    { setSubmitting, setFieldError, resetForm, setFieldValue }: any
  ) => {
    // to reset the curr_AVail_type whenever user select No after Yes
    if (values.current_availability === "false") {
      setFieldValue("current_availability_type", "");
    }
    const formData = new FormData();
    const resume = values?.cv;
    const profileImg = values?.passport_photo;

    console.log("values", values);
    formData.append("phone_prefix", values.phone_prefix);
    formData.append("phone", values.phone);
    formData.append("dob", values.dob);
    formData.append("gender", values.gender);
    formData.append("martial_status", values.martial_status);
    formData.append("country", values.country);
    formData.append("state", values.state);
    formData.append("city", values.city);
    formData.append("experience", values.experience);
    formData.append("passport_photo", profileImg);
    formData.append("preferred_trade", values.preferred_trade);
    formData.append(
      "preferred_mode_of_interview",
      values.preferred_mode_of_interview
    );
    formData.append("resume", resume);
    formData.append("current_availability", values.current_availability);
    formData.append("personal_profile_completed", "true");

    false;

    // Append current_availability_type only when current_availability is true
    if (values.current_availability === "true") {
      formData.append(
        "current_availability_type",
        values.current_availability_type
      );
    }

    if (
      values.current_availability === "Yes" &&
      !values.current_availability_type
    ) {
      setFieldError(
        "current_availability_type",
        "Current Availability Type is required"
      );
      setSubmitting(false);
      return;
    }

    await auth
      .employee_update(formData)
      .then((res: any) => {
        console.log("UpdateREs", res);
        handleNext();
      })
      .catch((err: any) => {
        console.log("Error", err);
      });
  };

  const CountryData = async (inputString: string) => {
    try {
      let data = await auth.CountryApi(`search=${inputString}`);
      const arr = await Promise.all(
        data.map(async (item: any) => {
          return { key: item.id, value: item.id, label: item.name };
        })
      );
      return arr;
    } catch (error) {}
  };

  const DialCodesData = async (
    inputString: string
  ): Promise<MyNamespace.Option[]> => {
    try {
      let data = await auth.dailcode(`search=${inputString}`);
      const arr: MyNamespace.Option[] = await Promise.all(
        data.map(async (item: any) => {
          return {
            value: item.dial,
            label: "+" + item.dial + "" + `(${item.country_code})`,
            max_length: item.max_length,
            image: item.image,
          };
        })
      );
      return arr;
    } catch (error) {
      // Handle error if needed
      return [];
    }
  };

  const StatesData = async (countryId: any) => {
    try {
      let data = await auth.StateApi(countryId);
      const arr = await Promise.all(
        data.map(async (item: any) => {
          return { key: item.id, value: item.id, label: item.name };
        })
      );
      setStates(data);

      return arr;
    } catch (error) {}
  };

  const citiesData = async (stateID: any) => {
    try {
      let data = await auth.CityApi(countryID, stateID);

      const arr = await Promise.all(
        data.map(async (item: any) => {
          return { key: item.id, value: item.id, label: item.name };
        })
      );
      setCities(data);

      return arr;
    } catch (error) {}
  };

  const preferedTradeData = async () => {
    try {
      let { data } = await auth.GetPreferredModeType();
      const arr = await Promise.all(
        data.map(async (item: any) => {
          return { key: item.id, value: item.id, label: item.name };
        })
      );
      return arr;
    } catch (error) {}
  };

  const preferedModeInterview = async () => {
    const data = [
      {
        name: "Virtual",
        id: "V",
      },
      // {
      //   name: "Physical",
      //   id: "P",
      // },
    ];
    const arr = await Promise.all(
      data.map(async (item: any) => {
        return { key: item.id, value: item.id, label: item.name };
      })
    );
    return arr;
  };

  const currentAvailType = async () => {
    const data = [
      {
        name: "Freelancer",
        id: "Freelancer",
      },
      {
        name: "Fulltime",
        id: "Fulltime",
      },
    ];
    const arr = await Promise.all(
      data.map(async (item: any) => {
        return { key: item.id, value: item.id, label: item.name };
      })
    );
    return arr;
  };

  const gender = async (inputString: string) => {
    const data = [
      {
        name: "Female",
        id: "F",
      },
      {
        name: "Male",
        id: "M",
      },
    ];

    const filteredData = data.filter((item) => {
      const input = inputString.toLowerCase();
      return item.name.toLowerCase().includes(input);
    });

    const arr = await Promise.all(
      filteredData.map((item: any) => {
        return { value: item.id, label: item.name };
      })
    );

    return arr;
  };

  const maritalStatus = async (inputString: string) => {
    const data = [
      {
        name: "Single",
        id: "S",
      },
      {
        name: "Married",
        id: "M",
      },
    ];

    const filteredData = data.filter((item) => {
      const input = inputString.toLowerCase();
      return item.name.toLowerCase().includes(input);
    });

    const arr = await Promise.all(
      filteredData.map((item: any) => {
        return { value: item.id, label: item.name };
      })
    );
    return arr;
  };

  const handlePhoneVerify = async (
    e: any,
    setFieldError: any,
    setCustomError: any,
    errors: any
  ) => {
    const verificationData: schema = {
      email: "dummy@vrittigroup@gmail.com",
      phone: e.target.value,
    };
    await auth
      .employeeverify(verificationData)
      .then((res: any) => {
        console.log(res.phone);
        if (res.phone == false) {
          // Send Otp To Phone Number
          auth
            .employesendPhoneotp(e.target.value, "employee")
            .then((res: any) => {
              setTempToken(res.data.access);
              if (res.status == 200) {
                setShowOtp(true);
                setPhoneField(false);
              }
            })
            .catch((err: any) => {
              console.log("error", err);
            });
        }
      })
      .catch((err: any) => {
        console.log("error", err);
        if (err.response.data.phone == true) {
          setPhoneError(true);
          setCustomError("Phone Number is already registered");
          console.log("already");
          if (!errors.phone) {
            setFieldError("phone", "Phone Number is already registered");
          }
        }
      });
  };

  const handleOtpToServer = async (value: any, setFieldError: any) => {
    await auth
      .sendOtpToServer(value, tempToken)
      .then((res: any) => {
        setIsVerified(true);
        setShowOtp(false);
      })
      .catch((err) => {
        console.log("error here ", err);
        setFieldError("phoneOtp", err.response.data.error);
      });
  };
  const radioOptions: RadioOption[] = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];

  return (
    <Formik
      initialValues={{
        dob: "",
        gender: "",
        martial_status: "",
        country: "",
        state: "",
        city: "",
        experience: "",
        current_availability: "false",
        current_availability_type: "",
        preferred_trade: "",
        preferred_mode_of_interview: "V",
        passport_photo: "",
        phone: "",
        phone_prefix: "91",
        cv: null,
        phoneOtp: "",
      }}
      onSubmit={handleFormSubmit}
      validationSchema={PersonalProfile}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
        setFieldError,
        isSubmitting,
      }: any) => (
        <div className="mt-[10px]  p-5">
          {/* Phone  */}
          <div className="flex justify-between items-center ">
            <label className="font-[200] ">Phone</label>
          </div>

          <div className="flex w-full">
            <div className="flex-grow pr-2  ">
              <DialCodeBox
                label={""}
                name={"phone_prefix"}
                onChange={(e: any) => {
                  console.log("first", e.value);
                  setPhoneField(true);
                  setFieldValue("phone_prefix", e.value);
                  setMaxLength(
                    e.max_length == null ? 15 : parseInt(e.max_length)
                  );
                }}
                placeholder={"+91"}
                loadOptions={DialCodesData}
                istouched={touched.phone_prefix}
                error={errors.phone_prefix}
              />
            </div>
            <div className="flex-grow  w-[70%] ">
              <TextInput
                disabled={!phoneField && true}
                name="phone"
                type="number"
                placeholder="Your Phone Number"
                label=""
                value={values.phone}
                onChange={(e) => {
                  setPhoneError(false);
                  if (e.target.value.length <= maxLength) {
                    setFieldValue("phone", e.target.value);
                    if (e.target.value.length == maxLength) {
                      handlePhoneVerify(
                        e,
                        setFieldError,
                        setFieldError,
                        errors
                      );
                    }
                  }
                }}
                onBlur={handleBlur("phone")}
                error={errors.phone}
                istouched={touched.phone}
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {showOtp && (
            <>
              {/* <TextInput
            name="phoneOtp"
            type="number"
            placeholder="Phone Number Otp"
                label=""
                value={values.phoneOtp}
                onChange={(e) => {
                  setFieldValue("phoneOtp", e.target.value);
                  handleOtpToServer(e);
                }}
                onBlur={(e) => {
                  handleBlur("phoneOtp")(e);
                }}
                error={
                  touched.phoneOtp && !values.phoneOtp
                  ? "OTP is required"
                  : errors.phoneOtp
                }
                istouched={touched.phoneOtp}
              /> */}

              <div className="mt-2  w-full flex justify-end  items-center">
                <div className="w-[65%]">
                  <OtpInput
                    numDigits={6}
                    onComplete={(otpValue) => {
                      console.log(otpValue);
                      // This function will be called when all digits are filled
                      setFieldValue("phoneOtp", otpValue);
                      handleOtpToServer(otpValue, setFieldError);
                    }}
                    error={errors.phoneOtp}
                  />
                </div>
              </div>
            </>
          )}

          {isVerified && (
            <div>
              {/* DOB */}
              <div className="mt-2">
                <TextInput
                  name={`dob`}
                  type={`date`}
                  label={`Date of Birth`}
                  value={values.dob}
                  onChange={handleChange(`dob`)}
                  onBlur={handleBlur("dob")}
                  error={errors?.dob}
                  istouched={touched?.dob}
                />
              </div>

              {/* Gender */}
              <div className="mt-2">
                <Combobox
                  label={"Gender"}
                  istouched={touched.gender}
                  error={errors.gender}
                  name="gender" // This should match the field name in initialValues
                  onChange={(e: any) => {
                    console.log("gender", e.value);
                    setFieldValue("gender", e.value); // Update the "gender" field in formik state
                  }}
                  loadOptions={gender}
                  placeholder={"Select Gender"}
                />
              </div>

              {/* Marital Status */}
              <div className="mt-2">
                <Combobox
                  label={"Marital Status"}
                  istouched={touched.martial_status}
                  error={errors.martial_status}
                  name="martial_status"
                  onChange={(e: any) => {
                    console.log("first", e.value);
                    setFieldValue("martial_status", e.value);
                  }}
                  loadOptions={maritalStatus}
                  placeholder={"Select Marital Status"}
                />
              </div>

              {/* Country */}
              <div className="mt-2">
                <Combobox
                  label={"Country"}
                  name={"country"}
                  onChange={(e: any) => {
                    console.log("first", e.value);
                    setCountryID(e.value);
                    setFieldValue("country", e.value);
                    StatesData(e.value);
                  }}
                  placeholder={"Select Country"}
                  loadOptions={CountryData}
                  istouched={touched.country}
                  error={errors.country}
                />
              </div>

              {/* State */}

              {states && (
                <div className="mt-2 relative  ">
                  <CustomComboBox
                    label="State"
                    placeholder="Select State"
                    onInputChange={(inputString: string) =>
                      StatesData(countryID)
                    }
                    options={states}
                    initialValue={values.state}
                    onOptionSelect={(e: any) => {
                      console.log(e.id);
                      setStateID(e.id);
                      setFieldValue("state", e.id);
                      citiesData(e.id);
                    }}
                    errors={errors?.state}
                    touched={touched.state}
                  />
                </div>
              )}

              {/* City */}
              {cities && (
                <div className="mt-2 relative  ">
                  <CustomComboBox
                    label="City"
                    placeholder="Select City"
                    onInputChange={(inputString: string) => citiesData(stateID)}
                    options={cities}
                    initialValue={values.city}
                    onOptionSelect={(e: any) => {
                      console.log(e.id);
                      setFieldValue("city", e.id);
                    }}
                    errors={errors?.city}
                    touched={touched.city}
                  />
                </div>
              )}

              {/* Experience */}
              <div className="mt-2">
                <TextInput
                  name={`experience`}
                  type={`text`}
                  label={`Year of Experience`}
                  value={values.experience}
                  onChange={handleChange(`experience`)}
                  onBlur={handleBlur("experience")}
                  error={errors?.experience}
                  istouched={touched?.experience}
                />
              </div>

              {/* Profile Pic */}
              <div className="mt-2">
                <TextInput
                  name="passport_photo"
                  type={`file`}
                  label={`Upload passport size photo (PNG/JPG) `}
                  // value={values.passport_photo}
                  multiple={false}
                  onChange={(e: any) =>
                    setFieldValue("passport_photo", e.target.files[0])
                  }
                  // onBlur={handleBlur("passport_photo")}
                  error={errors?.passport_photo}
                  istouched={touched?.passport_photo}
                />
              </div>

              {/* Prefered Trade */}
              <div className="mt-2">
                <Combobox
                  label={"Prefered Trade"}
                  error={errors?.preferred_trade}
                  istouched={touched?.preferred_trade}
                  name="preferred_trade"
                  onChange={(e: any) => {
                    console.log(e.value);
                    setFieldValue("preferred_trade", e.value);
                  }}
                  loadOptions={() => preferedTradeData()}
                  placeholder={"Select Trade"}
                />
              </div>

              {/* Mode of Interview */}
              <div className="mt-2">
                <Combobox
                  label={"Prefered Mode of Interview"}
                  error={errors?.preferred_mode_of_interview}
                  istouched={touched?.preferred_mode_of_interview}
                  name="preferred_mode_of_interview"
                  onChange={(e: any) => {
                    console.log(e.value);
                    setFieldValue("preferred_mode_of_interview", e.value);
                  }}
                  value={values.preferred_mode_of_interview.value}
                  loadOptions={() => preferedModeInterview()}
                  placeholder={"Select Mode of Interview"}
                />
              </div>

              {/* CV */}
              <div className="mt-2">
                <TextInput
                  name={`cv`}
                  type={`file`}
                  label={`Upload CV `}
                  multiple={false}
                  onChange={(e: any) => setFieldValue("cv", e.target.files[0])}
                  error={errors?.cv}
                  istouched={touched?.cv}
                />
              </div>

              {/* Current Avail */}
              <div className="my-2">
                <label className="block  font-medium leading-6 text-gray-900">
                  Current Availability
                </label>
              </div>
              <RadioBox
                name="current_availability"
                selectedValue={values.current_availability}
                options={radioOptions}
                onChange={
                  (value) => setFieldValue("current_availability", value)
                  // console.log("first", value)
                }
              />

              {values?.current_availability === "true" && (
                <div className="mt-2">
                  <Combobox
                    label={"Current Availability Type"}
                    error={errors?.current_availability_type}
                    istouched={touched?.current_availability_type}
                    name="current_availability_type"
                    onChange={(e: any) => {
                      console.log(e.value);
                      setFieldValue("current_availability_type", e.value);
                    }}
                    loadOptions={() => currentAvailType()}
                    placeholder={"Select Current Availabilty type"}
                  />
                </div>
              )}

              {/* Next Button */}
              <div className="flex w-full justify-end">
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-yellow-300 mt-5 w-28 mb-4 rounded-xl px-2 py-3 text-center cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
}
