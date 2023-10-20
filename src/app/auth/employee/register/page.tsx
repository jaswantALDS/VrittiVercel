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
import { emailState } from "../atom";
import EmailAuth from "@/components/Auth/EmailAuth";
import VerifyEmail from "@/components/Auth/VerifyEmail";
import Tabs from "@/app/employe/setfield/component/Tabs";
import PersonalDetails from "@/components/Auth/PersonalDetails";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Valid email").required("Email is required"),
});

type schema = {
  email: string;
  phone: number;
};

export default function Authentication() {
  // const [query, setQuery] = useRecoilValue<any>(emailstate);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useRecoilState(emailState);
  const [token, setToken] = useState("");

  const auth = new EmployeeController();

  const sendOtp = (userEmail: any) => {
    setEmail(userEmail);
    auth
      .employeverifyotp(userEmail, "employee")
      .then((res: any) => {
        console.log(res.data);
        setToken(res.data.access);
        setStep(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center  mt-24">
        <div className="  bg-white  w-[400px] rounded-xl p-5">
          <div className="">
            <div className="flex justify-center bg-white">
              <Image
                src="/avatar/virtti1.png"
                width={50}
                height={50}
                alt="Picture of the author"
              />
            </div>

            <div className="text-3xl font-[600] text-center uppercase font-serif">
              <h1>vritti</h1>
              <p className="text-[8px] -mt-4">authentication employe </p>
            </div>

            <div className=" pb-4 text-left text-2xl capitalize">
              <h2 className="text-xl font-[200]  py-2 text-left">sign up</h2>
              <p className="text-sm text-stone-600">
                elevate your access : registered useres,unleash possibillties.
              </p>
            </div>
          </div>

          {step == 0 ? (
            <EmailAuth handleChange={(email: any) => sendOtp(email)} />
          ) : step == 1 ? (
            <VerifyEmail token={token} handleChange={() => setStep(2)} />
          ) : step == 2 ? (
            <PersonalDetails userEmail={email} />
          ) : null}
        </div>
      </div>
    </>
  );
}
