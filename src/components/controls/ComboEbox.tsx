import { PropsValue } from "react-select";
import AsyncSelect from "react-select/async";
import Image from "next/image";
import { FaGlobe } from "react-icons/fa";

const options = [
  { value: "chocolate", label: "Chocolate", image: "path/to/chocolate/image" },
  {
    value: "strawberry",
    label: "Strawberry",
    image: "path/to/strawberry/image",
  },
  { value: "vanilla", label: "Vanilla", image: "path/to/vanilla/image" },
  // Add more options as needed
];

interface Option {
  value: any;
  label: any;
  image: string;
}

interface IComboEboxProps {
  label?: string;
  error?: string;
  labelRightIcon?: React.ReactNode;
  istouched: any;
  name: string;
  onChange: Function;
  loadOptions: (inputValue: string) => Promise<Option[]>;
  placeholder?: string;
  value?: Option;
}

const ComboEbox = (props: IComboEboxProps) => {
  const getOptionLabel = (option: any): any => (
    <div style={{ display: "flex", alignItems: "center" }}>
      {option.image != null ? (
        <Image width={20} height={20} src={option.image} alt={option.label} />
      ) : (
        <FaGlobe />
      )}
      <div className="text-sm">{option.label}</div>
    </div>
  );

  const getOptionValue = (option: Option): string => option.value;

  // const getOptionLabel = (option: Option) => (
  //   <div style={{ display: 'flex', alignItems: 'center' }}>
  //     <img src={option.image} alt={option.label} style={{ marginRight: '8px', width: '24px', height: '24px' }} />
  //     {option.label}
  //   </div>
  // );

  // const getOptionValue = (option: Option) => option.value;

  return (
    <div>
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-center">
          <label
            htmlFor={props.name}
            className="block  font-medium leading-6 text-gray-900"
          >
            {props.label}
          </label>
          <div>{props.labelRightIcon && props.labelRightIcon}</div>
        </div>

        <AsyncSelect
          options={options}
          defaultOptions
          // cacheOptions

          value={props?.value}
          loadOptions={props.loadOptions}
          onChange={(e) => props.onChange(e)}
          placeholder={props.placeholder}
          getOptionLabel={getOptionLabel} // Use the custom getOptionLabel function
          getOptionValue={getOptionValue}
          styles={{
            menuList: (provided) => ({
              ...provided,
              maxHeight: "150px", // Set the maximum height of the dropdown options
              overflowY: "auto",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              scrollbarColor: "gray transparent",
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              padding: 0,
              paddingTop: "0px",
              paddingBottom: "0px",
              width: "100%",
              backgroundColor: "transparent",
              minHeight: 0,
            }),
            input: (baseStyles, state) => ({
              ...baseStyles,
              padding: 6,
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
              fontWeight: "lighter",
              fontSize: "14px",
            }),
          }}
        />

        {props.error && props.istouched ? (
          <p className="text-red-500 text-sm">{props.error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default ComboEbox;
