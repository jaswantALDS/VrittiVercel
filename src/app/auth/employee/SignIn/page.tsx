"use client";
import React from "react";
import { Formik, FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import TextInput from "@/components/textinput";
import { AppAssets } from "@/constants/assets";
import { SignInValidations } from "@/settings/validations";
import { signIn } from "next-auth/react";

type schema = {
  email: string;
  password: string;
};

export default function SignIn() {
  const handleSignIn = (
    values: schema,
    { setFieldError, setSubmitting }: FormikHelpers<schema>
  ) => {
    // Convert email to lowercase
    const lowercasedEmail = values.email.toLowerCase();
    signIn("employee-login", {
      username: lowercasedEmail,
      password: values.password,
      // redirect: false,
    })
      .then((res) => {
        console.log("login Call", res);
      })
      .catch((err: any) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white w-[90%] md:w-[40%] rounded-xl p-8 shadow-lg mx-auto my-10">
        <div className="flex justify-center mb-1">
          <Image
            src={AppAssets.empLogo}
            width={75}
            height={75}
            alt="Vritti Logo"
          />
        </div>
        <div className="text-3xl font-bold text-center mb-2 uppercase space-y-1">
          <h1>Vritti</h1>
          <p className="text-xs text-gray-600">Authentication Employee</p>
        </div>
        <div className="text-left text-xl capitalize mb-6">
          <h2 className="font-thin py-2">Sign In</h2>
          <p className="text-sm text-gray-700">
            Sign in to your account to access all the features.
          </p>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignInValidations}
          onSubmit={handleSignIn}
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
              <div className="mb-4">
                <TextInput
                  name="email"
                  type="email"
                  placeholder="Your email"
                  label=""
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <TextInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  label=""
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="mb-6 flex justify-end">
                <a
                  href="/forgot-password"
                  className="text-blue-500 text-sm underline"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="mb-6 text-center">
                <p className="text-sm text-gray-700">
                  Don &apos; t have an account?
                  <a
                    href="/auth/employee/register"
                    className="text-blue-500 underline"
                  >
                    Sign Up here
                  </a>
                </p>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                type="submit"
              >
                Authenticate
              </button>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}
