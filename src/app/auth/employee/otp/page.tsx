"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

const OtpInput = () => {
    const numDigits = 6;
    const [otp, setOtp] = useState(Array(numDigits).fill(""));
    const inputRefs: any = useRef([]);

    const handleInputChange = (index: any, value: any) => {
        if (!isNaN(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (index < numDigits - 1 && value !== "") {
                // console.log(inputRefs.current[index + 1]);
                inputRefs.current[index + 1].focus();
            } else if (index === numDigits - 1 && value !== "") {
                // All digits are filled, trigger form submission
                handleFormSubmit();
            }
        }
    };

    const handleKeyDown = (index: any, e: any) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);

            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleFormSubmit = () => {
        setTimeout(() => {
            alert("submit")

        }, 500  )

    };

    return (
        <div className=" bg-white mt-24 w-[400px] rounded-xl shadow-lg p-5 m-auto">
            <div className="">
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
                    <p className="text-[8px] -mt-4">authentication employe </p>
                </div>
                <div className=" pb-4 text-left text-2xl capitalize">
                    <div className="text-xl font-[200]  py-4 text-left">
                        sign up
                    </div>
                    <p className="text-sm text-stone-600">
                        elevate your access : registered useres,unleash
                        possibillties.
                    </p>
                </div>
                <div className="text-2xl font-[600] text-left flex items-center gap-4">
                    <h1> Verification</h1>
                    <div className="w-10 h-1 bg-gray-600"></div>
                </div>
            </div>

            {/* <div className="text-[24px] font-semibold text-center">OTP</div> */}
            <div className="flex justify-center mt-[15px]">

                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="tel"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        className="w-12 h-12 text-center text-xl border border-gray-300 rounded outline-none focus:border-blue-500 mx-1"
                    />
                ))}
            </div>
          
                <div className="px-2 py-3 mt-8  text-center bg-blue-600 cursor-pointer rounded-xl  my-6 mb-12 text-white">

                    <button type="submit"
                        onClick={handleFormSubmit}
                    >
                        Continue
                    </button>
                </div>

        
        </div>
    );
};

export default OtpInput;
