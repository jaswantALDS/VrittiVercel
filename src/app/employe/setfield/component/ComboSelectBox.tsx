import React from "react";
import Select from "react-select";

interface ISelectComboboxProps {
  label: string;
  error?: string;
  istouched: any;
  name: string;
  onChange: Function;
  placeholder: string;
  options: IOptions[];
  defaultValue?: IOptions;
  values?: string;
}
interface IOptions {
  value: string;
  label?: string;
  isFixed?: boolean;
  isDisabled?: boolean;
  color?: string;
}
export default function ComboSelectBox(props: ISelectComboboxProps) {
  
  return (
    <div>
      <div className="flex flex-col space-y-2">
        <label htmlFor={props.name} className="font-semibold">
          {props.label}
        </label>

        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={props?.defaultValue}
          value={props.defaultValue}
          onChange={(e) => props.onChange(e?.value)}
          placeholder={props.placeholder}
          name="color"
         
          options={props?.options}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              padding: 0,
              paddingTop: "5px",
              paddingBottom: "5px",
              width: "100%",
              backgroundColor: "transparent",
              minHeight: 0,
            }),
            input: (baseStyles, state) => ({
              ...baseStyles,
              padding: 0,
              width: "100%",
              backgroundColor: "transparent",
            }),
            container: (baseStyles, state) => ({
              ...baseStyles,
              width: "100%",
              padding: 0,
              paddingTop: 0,
            }),
            singleValue: (baseStyles, state) => ({
              ...baseStyles,
            }),
            placeholder: (baseStyles, state) => ({
              ...baseStyles,
            }),
          }}
        />
        {props.error && props.istouched ? (
          <p className="text-red-500">{props.error}</p>
        ) : null}
      </div>
    </div>
  );
}