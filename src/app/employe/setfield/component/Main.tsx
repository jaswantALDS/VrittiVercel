"use client";
import React, { createContext, useState } from "react";
import Contactinfo from "./contactinfo";
import Qualifications from "./Qualification";
import Image from "next/image";
import Documentupload from "./Documentupload";
import { AppAssets } from "@/constants/assets";
import EmployemntStatus from "./EmployemntStatus";
import { useAppSelector } from "@/store";
import ThankYouModal from "@/components/ThankYouComp";

export default function Main() {
  const user = useAppSelector((state) => state.userReducer.user);
  const [step, setStep] = useState<any>(
    user && user.employment_profile_completed === false
      ? 1
      : user && user.personal_profile_completed === false
      ? 2
      : user && user.qualifications_profile_completed === false
      ? 3
      : user && user.documents_profile_completed === false
      ? 4
      : user && user.is_completed === true
      ? 5
      : null
  );

  // store.dispatch(setUser(user));

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log("closed");
    window.location.href = "/employe/dashboard";
  };

  const items = [
    { value: "Employement Status", id: 1 },
    { value: "Personal Information", id: 2 },
    { value: "Qualification Details", id: 3 },
    { value: "Document Upload", id: 4 },
  ];
  console.log("first", user);
  return (
    <>
      {step != 5 && (
        <div className="flex items-center justify-center h-screen">
          <div className="  bg-white  w-[60vw]  overflow-y-scroll scrollbar-hide rounded-xl px-10 py-5">
            <div className="">
              <div className="flex justify-center bg-white">
                <Image
                  src={AppAssets.empLogo}
                  width={50}
                  height={50}
                  alt="Logo Not available"
                />
              </div>

              <div className="text-3xl font-[600] text-center uppercase font-serif">
                <h1>vritti</h1>
                <p className="text-[8px] -mt-4">authentication employee </p>
              </div>

              <div className=" pb-4 text-left text-2xl capitalize">
                <h2 className="text-xl font-[200]  py-2 text-left">sign up</h2>
                <p className="text-sm text-stone-600">
                  elevate your access : registered useres,unleash possibillties.
                </p>
              </div>
            </div>

            <div className="flex items-center ">
              {items.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`flex w-full mr-0 px-3 items-center border-b-2 pb-4 text-sm hover:border-b-2 transition-all  ${
                    step === item.id
                      ? "border-b-orange-500 text-black"
                      : "border-gray-200 text-gray-400"
                  }`}
                >
                  {item.value}
                </div>
              ))}
            </div>
            <div className="h-72">
              {step === 1 && (
                <div>
                  <EmployemntStatus handleNext={handleNext} user={user} />
                </div>
              )}
              {step === 2 && (
                <div>
                  <Contactinfo
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    user={user}
                  />
                </div>
              )}
              {step === 3 && (
                <div>
                  <Qualifications
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    user={user}
                  />
                </div>
              )}
              {step === 4 && (
                <div>
                  <Documentupload handleNext={handleNext} user={user} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {step == 5 && (
        <ThankYouModal
          onClick={handleSubmit}
          button="Explore More"
          content="Your profile has been successfully set up, and it is now being
          reviewed. While you wait, please explore the app's diverse features."
        />
      )}
    </>
  );
}
