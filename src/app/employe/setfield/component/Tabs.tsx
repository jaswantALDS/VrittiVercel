"use client";
import React, { useState } from "react";
import Personalinfo from "./EmployemntStatus";
import Contactinfo from "./contactinfo";
import Qualifications from "./Qualification";
import Image from "next/image";
import { useRouter } from "next/router";
import Documentupload from "./Documentupload";

function Tabs() {
  // const router = useRouter()
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlesubmit = () => {
    // router.push("/");
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div
          className={`text-sm font-semibold text-center ${
            step === 1 ? "text-primary" : "text-gray-500"
          }`}
        >
          Employment status
        </div>
        <div
          className={`text-sm font-semibold text-center ${
            step === 2 ? "text-primary" : "text-gray-500"
          }`}
        >
          Other Personal Information
        </div>
        <div
          className={`text-sm font-semibold text-center ${
            step === 3 ? "text-primary" : "text-gray-500"
          }`}
        >
          Qualification Detail
        </div>
        <div
          className={`text-sm font-semibold text-center ${
            step === 4 ? "text-primary" : "text-gray-500"
          }`}
        >
          Document Upload
        </div>
      </div>
      {step === 1 && (
        <div>
          {/* Basic Information Form */}
          <Personalinfo handleNext={handleNext} handlePrev={handlePrev} />
        </div>
      )}
      {step === 2 && (
        <div>
          {/* Contact Information Form */}
          <Contactinfo handleNext={handleNext} handlePrev={handlePrev} />
        </div>
      )}
      {step === 3 && (
        <div>
          {/* Qualification Detail Form */}
          <Qualifications
            handleNext={handleNext}
            handlePrev={handlePrev}
            handlesubmit={handlesubmit}
          />
        </div>
      )}
      {step === 4 && (
        <div>
          {/* Qualification Detail Form */}
          <Documentupload
            handleNext={handleNext}
            handlePrev={handlePrev}
            handlesubmit={handlesubmit}
          />
        </div>
      )}
    </>
  );
}

export default Tabs;
