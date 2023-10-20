import React from "react";
import { InputHTMLAttributes, ReactNode, useState } from "react";

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  lefticon?: ReactNode;
  label: string;
  error?: string;
  istouched: any;
}
export default function TextInput(props: ITextInputProps) {
  return (
    <div>
      <div className="flex flex-col space-y-2 ">
        <label htmlFor={props.name} className="font-semibold">
          {props.label}
        </label>
        <div className="flex items-center justify-between w-full px-2 bg-white border border-gray-400 rounded-md focus-within:outline focus-within:outline-2 focus-within:outline-blue-400">
          {props.lefticon && props.lefticon}

          <input
            {...props}
            id={props.name}
            className={`w-full border-none outline-none font-medium font-optima text-primary text-md ${
              props.lefticon && "px-2"
            } py-3`}
          />
        </div>
  
        {props.error && props.istouched ? (
          <p className="text-red-500">{props.error}</p>
        ) : null}
      </div>
    </div>
  );
}
