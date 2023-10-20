"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import TextInput from "@/components/textinput";
import ClientController from "@/controllers/employee";

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

export default function VerifyEmail({
  token,
  handleChange,
  handleUpdateEmail,
}: any) {
  const auth = new ClientController();
  const handleSubmit = async (
    values: any,
    { setSubmitting, setFieldError }: any
  ) => {
    auth
      .sendOtpToServer(values.otp, token)
      .then((res: any) => {
        console.log("response", res.status);
        handleChange(res);
      })
      .catch((err) => {
        console.log("error here ", err);
        setFieldError("otp", err.response.data.error);
      });
  };

  return (
    <>
      <div className="text-2xl font-[600] text-left flex items-center gap-4">
        <h1>Verification</h1>
        <div className="w-10 h-1 bg-gray-600"></div>
      </div>

      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={validationSchema}
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
          // <div className="flex items-center justify-center mt-24">
          //   <div className="bg-white w-[400px] rounded-xl p-5">
          //     <div>
          //       <div className="flex justify-center bg-white">
          //         <Image
          //           src="/avatar/virtti.jpg"
          //           width={50}
          //           height={50}
          //           alt="Picture of the author"
          //         />
          //       </div>
          //       <div className="text-3xl font-[600] text-center uppercase font-serif">
          //         <h1>vritti</h1>
          //         <p className="text-[8px] -mt-4">authentication employee </p>
          //       </div>
          //       <div className="pb-4 text-left text-2xl capitalize">
          //         <div className="text-xl font-[200] py-4 text-left">sign up</div>
          //         <p className="text-sm text-stone-600">
          //           elevate your access: registered users, unleash possibilities.
          //         </p>
          //       </div>
          //       <div className="text-2xl font-[600] text-left flex items-center gap-4">
          //         <h1>Verification</h1>
          //         <div className="w-10 h-1 bg-gray-600"></div>
          //       </div>
          //     </div>
          <div>
            <div className="space-y-4 py-4">
              <div>
                <TextInput
                  name="otp"
                  type="number"
                  placeholder="Email OTP"
                  label=""
                  value={values.otp}
                  onChange={handleChange}
                  error={errors.otp}
                  istouched={touched.otp}
                />
              </div>
            </div>
            <div className="px-2 py-3 mt-5 text-center bg-blue-600 cursor-pointer rounded-xl my-6 mb-12">
              <button
                type="submit"
                onClick={handleSubmit}
                className="text-white"
              >
                Continue
              </button>
            </div>
          </div>
          //   </div>
          // </div>
        )}
      </Formik>
    </>
  );
}
