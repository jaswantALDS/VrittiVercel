import React from "react";

interface RadioOption {
  value: string;
  label: string;
}
interface Props {
  name: string;
  selectedValue: string;
  options: RadioOption[]; // Use the RadioOption interface for options
  onChange: (value: string) => void;
}

const RadioBox: React.FC<Props> = ({
  name,
  selectedValue,
  options,
  onChange,
}) => {
  return (
    <div className="flex gap-5">
      {options.map((option) => (
        <label key={option.value} className="flex gap-1">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioBox;
