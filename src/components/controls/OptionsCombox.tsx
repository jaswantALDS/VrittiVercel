// import { PropsValue } from "react-select";
// import AsyncSelect from "react-select/async";

// interface Option {
//   value: any;
//   label: any;
// }
// interface IComboboxProps {
//   label: string;
//   error?: string;
//   labelRightIcon?: React.ReactNode;
//   istouched: any;
//   name: string;
//   onChange: Function;
//   loadOptions?: (inputValue: string) => Promise<any>;
//   placeholder: string;
//   value?: PropsValue<Option>;
//   options: any;
// }

// export default function OptionsCombobox(props: IComboboxProps) {
//   console.log("options", props.options);
//   return (
//     <>
//       <div>
//         <div className="flex flex-col space-y-1">
//           <div className="flex justify-between items-center">
//             <label
//               htmlFor={props.name}
//               className="block  font-semibold leading-6 text-gray-900"
//             >
//               {props.label}
//             </label>
//             <div>{props.labelRightIcon && props.labelRightIcon}</div>
//           </div>

//           <AsyncSelect
//             options={props.options}
//             // defaultOptions
//             // cacheOptions
//             value={props?.value}
//             // loadOptions={props?.loadOptions}
//             onChange={(e) => props.onChange(e?.value)}
//             placeholder={props.placeholder}
//             styles={{
//               control: (baseStyles, state) => ({
//                 ...baseStyles,
//                 padding: 0,
//                 paddingTop: "0px",
//                 paddingBottom: "0px",
//                 width: "100%",
//                 backgroundColor: "transparent",
//                 minHeight: 0,
//               }),
//               input: (baseStyles, state) => ({
//                 ...baseStyles,
//                 padding: 0,
//                 width: "100%",
//                 backgroundColor: "transparent",
//               }),
//               container: (baseStyles, state) => ({
//                 ...baseStyles,
//                 width: "100%",
//                 padding: 0,
//                 paddingTop: 0,
//               }),
//               singleValue: (baseStyles, state) => ({
//                 ...baseStyles,
//               }),
//               placeholder: (baseStyles, state) => ({
//                 ...baseStyles,
//                 fontWeight: "lighter",
//                 fontSize: "14px",
//               }),
//             }}
//           />

//           {props.error && props.istouched ? (
//             <p className="text-red-500">{props.error}</p>
//           ) : null}
//         </div>
//       </div>
//     </>
//   );
// }

import { ErrorMessage } from "formik";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

export interface IAirwayCompanyComboProps {
  onInputChange: Function;
  options: any;
  onOptionSelect: Function;
  initialValue: string;
  placeholder: string;
  errors: string;
  touched: string;
  label: string;
}

export default function CustomComboBox({
  onInputChange,
  options,
  onOptionSelect,
  initialValue,
  placeholder,
  errors,
  touched,
  label,
}: IAirwayCompanyComboProps) {
  const [searchString, setSearchString] = useState(initialValue);
  const [selectedOption, setSelectedOption] = useState<null | string>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isModalVisible, setVisibleModel] = useState(false);
  const [openBox, setOpenBox] = useState(false);

  const comboboxRef: any = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setVisibleModel(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render
  useEffect(() => {
    if (searchString !== "" && searchString !== initialValue) {
      onInputChange(searchString);
      setVisibleModel(true);
    }
  }, [searchString]);

  //********************* ( my new code )**********************

  //   const filteredOptions = options.filter((item: any) =>
  //     item.name.toLowerCase().includes(searchString?.toLowerCase())
  //   );

  // console.log(initialValue)

  //********************* ( my new code )**********************

  return (
    <div ref={comboboxRef}>
      <div className="flex justify-between items-center mb-1">
        <label className="block  font-medium leading-6 text-gray-900">
          {label}
        </label>
      </div>
      <div
        className={`   ${
          errors && touched ? "border-secondary border-[1px]" : `grayBorder `
        } border border-gray-300 hover:border-gray-400 font-medium h-[6.5vh] text-md mb-1 rounded-[5px] px-4 py-1.5 flex justify-start items-center w-full`}
      >
        <input
          placeholder={placeholder}
          type="text"
          value={selectedOption ? selectedOption : searchString}
          onChange={({ target: { value } }) => {
            setSearchString(value);
          }}
          onClick={() => {
            onInputChange("a");
            setVisibleModel(true);
          }}
          // @ts-ignore
          autoComplete="off"
          className={`placeholder:text-left text-left  pr-0
              outline-0  rounded-md py-1 w-full placeholder:text-gray-500 placeholder:text-[0.9rem] text-paragraph  text-md lg:text-sm font-medium bg-transparent `}
        />

        {/* {initialValue == undefined ? (
          <div
            onClick={() => {
              onInputChange("a");
              setVisibleModel(!isModalVisible);
            }}
          >
            <BsChevronDown className="text-paragraph h-4 w-4 mr-3" />
          </div>
        ) : initialValue !== "" ? (
          <div className="bg-secondary rounded-full h-5 w-5 flex justify-center items-center p-1">
            <RxCross2
              onClick={() => {
                setVisibleModel(false);
                setSearchString("");
                setSelectedOption(null);
                onOptionSelect("");
              }}
              className="text-white h-4 w-4"
            />
          </div>
        ) : (
          <div
            onClick={() => {
              onInputChange("a");
              setVisibleModel(!isModalVisible);
            }}
          >
            <BsChevronDown className="text-paragraph h-4 w-4 mr-3" />
          </div>
        )} */}
      </div>

      {errors && touched ? <p className="text-red-500"> {errors} </p> : null}

      {options?.length > 0 && isModalVisible && (
        <ul
          className={` ${
            options?.length <= 5 ? "h-[auto]" : "h-[30vh]"
          }   absolute z-10 w-full overflow-y-scroll scrollbar-hide searchBoxScroll rounded-md bg-white border-[1px] border-lightBlue1   bluBoxShadow`}
        >
          {options?.map((item: any, index: number) => (
            <li key={index} className="">
              <div
                onClick={() => {
                  onOptionSelect(item);
                  setSelectedOption(item.name);
                  setVisibleModel(false);
                }}
                key={index}
                className={`flex justify-start items-center gap-3 mb-3 mt-1 ${
                  selectedOption == item?.name && "bg-blue-400"
                }`}
              >
                <p className="text-paragraph font-medium text-md cursor-pointer px-2  ">
                  {item?.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
