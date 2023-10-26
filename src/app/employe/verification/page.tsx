"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import TextInput from "@/components/textinput";
import ClientController from "@/controllers/employee";

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const Verification = () => {
  // const [seconds, setSeconds] = useState(30);
  const [gettoken, setGetToken] = useState();

  const auth = new ClientController();

  // useEffect(() => {
  //   if (seconds > 0) {
  //     const intervalId = setInterval(() => {
  //       setSeconds(seconds - 1);
  //     }, 1000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [seconds]);

  useEffect(() => {
    auth
      .employeverifyotp("sonusaini81075@gmail.com", "employee")
      .then((res: any) => {
        setGetToken(res.data.access);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const router = useRouter();

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    auth
      .sendOtpToServer(values.otp, gettoken)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(values);
    router.push("/employe/personaldetails");
  };

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex items-center justify-center mt-24">
      <div className="bg-white w-[400px] rounded-xl p-5">
        <div>
          <div className="flex justify-center bg-white">
            <Image
              src="/avatar/virtti.jpg"
              width={50}
              height={50}
              alt="Picture of the author"
            />
          </div>
          <div className="text-3xl font-[600] text-center uppercase font-serif">
            <h1>vritti</h1>
            <p className="text-[8px] -mt-4">authentication employee </p>
          </div>
          <div className="pb-4 text-left text-2xl capitalize">
            <div className="text-xl font-[200] py-4 text-left">sign up</div>
            <p className="text-sm text-stone-600">
              elevate your access: registered users, unleash possibilities.
            </p>
          </div>
          <div className="text-2xl font-[600] text-left flex items-center gap-4">
            <h1>Verification</h1>
            <div className="w-10 h-1 bg-gray-600"></div>
          </div>
        </div>
        <div>
          <div className="space-y-4 py-4">
            <div>
              <TextInput
                name="otp"
                type="number"
                placeholder="Email OTP"
                label=""
                value={formik.values.otp}
                onChange={formik.handleChange}
                error={formik.errors.otp}
                istouched={formik.touched.otp}
              />
            </div>
          </div>
          <div
            className="px-2 py-3 mt-5 text-center bg-blue-600 cursor-pointer rounded-xl my-6 mb-12"
            onClick={formik.handleSubmit}
          >
            <button type="submit" className="text-white">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
