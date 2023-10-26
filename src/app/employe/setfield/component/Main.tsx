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
      : 4
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
  return (
    <div className="max-w-full mx-auto p-4 md:p-8 lg:p-12">
      {step !== 5 && (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white w-full md:w-[60vw] overflow-y-scroll scrollbar-hide rounded-xl px-10 py-5">
            <div className="flex justify-center mb-2 md:mb-2 lg:mb-8">
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
              {step === 1 && (
                <p className="text-sm text-gray-700">
                  Your Employment Journey Starts Here: Get the Details
                </p>
              )}
              {step === 2 && (
                <p className="text-sm text-gray-700">
                  Unveil Your Uniqueness: Personal Details Define You
                </p>
              )}
              {step === 3 && (
                <p className="text-sm text-gray-700">
                  Qualifications That Define You: Let &apos; s Talk Achievements
                </p>
              )}
              {step === 4 && (
                <p className="text-sm text-gray-700">
                  Elevate Your Profile: Upload Essential Documents.
                </p>
              )}
            </div>

            <div className="flex items-center">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex w-full mr-0 px-3 items-center border-b-2 pb-4 text-sm hover:border-b-2 transition-all ${
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
                <EmployemntStatus handleNext={handleNext} user={user} />
              )}
              {step === 2 && (
                <Contactinfo
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  user={user}
                />
              )}
              {step === 3 && (
                <Qualifications
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  user={user}
                />
              )}
              {step === 4 && (
                <Documentupload handleNext={handleNext} user={user} />
              )}
            </div>
          </div>
        </div>
      )}
      {step === 5 && (
        <ThankYouModal
          onClick={() => {
            console.log("closed");
            window.location.href = "/employe/dashboard";
          }}
          button="Explore More"
          content="Your profile has been successfully set up, and it is now being reviewed. While you wait, please explore the app's diverse features."
        />
      )}
    </div>
  );
}
