import { InputHTMLAttributes, ReactNode } from "react";
interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  lefticon?: ReactNode;
  label?: string;
  error?: string;
  istouched?: any;
}
export default function TextInput(props: ITextInputProps) {
  return (
    <div>
      <div className="flex flex-col space-y-1 ">
        <label
          htmlFor={props.name}
          className="block  font-medium leading-6 text-gray-900"
        >
          {props.label}
        </label>
        <div
          className={`${
            props.error ? "border-red-500" : " border-gray-400 "
          } border-gray-400  focus-within:outline-blue-400 flex items-center justify-between w-full px-2 bg-white border  rounded-md focus-within:outline focus-within:outline-2 `}
        >
          {props.lefticon && props.lefticon}
          <input
            {...props}
            id={props.name}
            className={`w-full border-none bg-slate-100 rounded-xl outline-none font-medium font-optima text-gray-600 text-sm ${
              props.lefticon && "px-2"
            } py-3`}
          />
        </div>
        {props.error && props.istouched ? (
          <p className="text-red-500 text-sm">{props.error}</p>
        ) : null}
      </div>
    </div>
  );
}
