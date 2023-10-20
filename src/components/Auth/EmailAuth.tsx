"use client";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Formik, FormikHelpers } from "formik";
import TextInput from "@/components/textinput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EmployeeController from "@/controllers/employee";
import { emailValidation } from "@/settings/validations";
// import { emailState } from "../../../";

type schema = {
  email: string;
  phone: number;
};

export default function EmailAuth({ handleChange }: any) {
  const auth = new EmployeeController();

  const handleVerify = (
    values: schema,
    { setFieldError, setSubmitting }: FormikHelpers<schema>
  ) => {
    console.log("handleVerify");
    setSubmitting(true);
    auth
      .employeeverify(values)
      .then((res) => {
        console.log("response Register", res);
        if (res.email == false) {
          handleChange(values.email);
          setSubmitting(false);
        }
      })
      .catch((err) => {
        console.log("first", err);
        if (err.response.data.email == true) {
          setFieldError("email", "Email is Already Registered");
        }
      });
    setSubmitting(false);
  };

  return (
    <>
      <div className="text-2xl font-[600] text-left flex items-center gap-4">
        <h1> Authentication</h1>
        <div className="w-10 h-1 bg-gray-600"></div>
      </div>

      <Formik
        initialValues={{
          email: "",
          phone: 123,
        }}
        validationSchema={emailValidation}
        onSubmit={handleVerify}
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
          <>
            <div className="">
              <div className="space-y-4 py-4">
                <div>
                  <TextInput
                    name="email"
                    type="email"
                    placeholder="Your email"
                    label=""
                    value={values.email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={errors.email}
                    istouched={touched.email}
                  />
                </div>
              </div>
              <div>
                <button
                  className="px-2 w-full py-3 mt-5 text-white text-center bg-blue-600 cursor-pointer rounded-xl  my-6 mb-12"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}
      </Formik>
    </>
  );
}
