import { InputHTMLAttributes, ReactNode, useState } from "react";

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: string;
  istouched: any;
}

export default function Checkbox(props: ITextInputProps) {
  return (
    <div>
      <div className="flex  items-center space-x-2">
        <div className="mt-[2px] flex">
          <input {...props} type="checkbox" aria-label={props.name} />
        </div>
        <div>
          <label htmlFor={props.id} className="font-[500] text-gray-700 ">
            {props.label}
          </label>
        </div>
      </div>
      {props.error && props.istouched ? (
        <p className="text-red-500 mt-2">{props.error}</p>
      ) : null}
    </div>
  );
}
