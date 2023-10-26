"use client";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";
import EmailAuth from "@/components/Auth/EmailAuth";
import VerifyEmail from "@/components/Auth/VerifyEmail";
import PersonalDetails from "@/components/Auth/PersonalDetails";
import { emailState } from "../atom";
import EmployeeController from "@/controllers/employee";
import { AppAssets } from "@/constants/assets";

export default function Authentication() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useRecoilState(emailState);
  const [token, setToken] = useState("");
  const auth = new EmployeeController();

  const sendOtp = (userEmail: any) => {
    setEmail(userEmail);
    auth
      .employeverifyotp(userEmail, "employee")
      .then((res) => {
        console.log(res.data);
        setToken(res.data.access);
        setStep(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 console.log("signup")
  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-100">
      <div className="bg-white w-full md:w-[30rem] h-  p-8 rounded-xl shadow-lg  ">
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
          <h2 className="font-thin py-2">Sign Up</h2>
          <p className="text-sm text-gray-700">
            Elevate your access: registered users, unleash possibilities.
          </p>
        </div>

        <div className="mb-4">
          {step === 0 && (
            <>
              <EmailAuth handleChange={(email: any) => sendOtp(email)} />
              <div className="mt-4 text-sm text-gray-700">
                Already have an account?{" "}
                <a
                  href="/auth/employee/register"
                  className="text-blue-500 underline"
                >
                  Sign In here
                </a>
              </div>
            </>
          )}
          {step === 1 && (
            <VerifyEmail token={token} handleChange={() => setStep(2)} />
          )}
          {step === 2 && <PersonalDetails userEmail={email} />}
        </div>
      </div>
    </div>
  );
}
