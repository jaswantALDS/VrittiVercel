import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const OtpInput = ({ numDigits, onComplete, error }: any) => {
  const [otp, setOtp] = useState(Array(numDigits).fill(""));
  const inputRefs: any = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleInputChange = (index: any, value: any) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < numDigits - 1 && value !== "") {
        inputRefs.current[index + 1].focus();
      } else if (index === numDigits - 1 && value !== "") {
        const otpValue = newOtp.join("");
        onComplete(otpValue);
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

  const inputStyle = {
    width: `calc(100% / ${numDigits})`,
    height: "3rem", // You can adjust the height as needed
  };

  return (
    <div style={{ width: "100%" }}>
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
            style={inputStyle}
            className="text-center text-xl border border-gray-300 rounded outline-none focus:border-blue-500 mx-1"
          />
        ))}
      </div>
      {error ? (
        <p className="text-red-500 text-sm mt-2 text-end">{error}</p>
      ) : null}
    </div>
  );
};

OtpInput.propTypes = {
  numDigits: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
  error: PropTypes.any.isRequired,
};

export default OtpInput;
