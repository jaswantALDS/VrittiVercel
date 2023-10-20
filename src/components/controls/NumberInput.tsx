// components/NumberInput.js
import React, { useState } from "react";

const NumberInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: any) => {
    let value = e.target.value;
    // Remove non-numeric characters
    value = value.replace(/\D/g, "");
    // Restrict input length to 4 digits
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    setInputValue(value);
  };

  return (
    <div>
      <label htmlFor="numberInput">Enter a 4-digit number:</label>
      <input
        type="number"
        id="numberInput"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberInput;
