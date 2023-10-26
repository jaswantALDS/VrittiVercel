"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import TextInput from "@/components/textinput";
import Image from "next/image";
import EmployeeController from "@/controllers/employee";
import { signIn } from "next-auth/react";
import { personalDetailsValidation } from "@/settings/validations";

type schema = {
  first_name: string;
  last_name: string;
  password: string;
  cpassword: string;
  source: string;
  email: string;
};

export default function PersonalDetails({ userEmail }: any) {
  const auth = new EmployeeController();

  const handleSubmit = (
    values: schema,
    { setFieldError, setSubmitting }: FormikHelpers<schema>
  ) => {
    setSubmitting(true);

    auth
      .registerEmployee({
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
        source: "web",
        email: userEmail,
      })
      .then((res) => {
        signIn("employee-login", {
          username: values.email,
          password: values.password,
        }).then((res) => {
          console.log("login Call", res);
        });
      })
      .catch((err) => {
        console.log("error", err);
      });

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        password: "",
        cpassword: "",
        source: "web",
        email: userEmail,
      }}
      validationSchema={personalDetailsValidation}
      onSubmit={handleSubmit}
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
        <div className="mb-0 pb-0">
          <div className="text-2xl font-[600] text-left flex items-center gap-4">
            <h1>Personal Details</h1>
            <div className="w-10 h-1 bg-gray-600"></div>
          </div>
          <div className="space-y-4 py-4">
            <div>
              <TextInput
                name="first_name"
                type="text"
                placeholder="First Name"
                label=""
                value={values.first_name}
                onBlur={handleBlur("first_name")}
                onChange={handleChange("first_name")}
                error={errors.first_name}
                istouched={touched.first_name}
              />
            </div>
            <div>
              <TextInput
                name="last_name"
                type="text"
                placeholder="Last Name"
                label=""
                value={values.last_name}
                onBlur={handleBlur("last_name")}
                onChange={handleChange("last_name")}
                error={errors.last_name}
                istouched={touched.last_name}
              />
            </div>
            <div>
              <TextInput
                name="password"
                type="password"
                placeholder="Password"
                label=""
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                error={errors.password}
                istouched={touched.password}
              />
            </div>
            <div>
              <TextInput
                name="cpassword"
                type="password"
                placeholder="Confirm Password"
                label=""
                value={values.cpassword}
                onChange={handleChange("cpassword")}
                onBlur={handleBlur("cpassword")}
                error={errors.cpassword}
                istouched={touched.cpassword}
              />
            </div>
          </div>
          <div
            className="px-2 py-3 mt-5  text-center bg-blue-600 cursor-pointer rounded-xl  "
            onClick={handleSubmit}
          >
            <p className="text-white">Continue</p>
          </div>
        </div>
      )}
    </Formik>
  );
}
