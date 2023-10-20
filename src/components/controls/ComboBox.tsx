import { PropsValue } from "react-select";
import AsyncSelect from "react-select/async";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

interface Option {
  value: any;
  label: any;
}
interface IComboboxProps {
  label?: string;
  error?: string;
  labelRightIcon?: React.ReactNode;
  istouched: any;
  name: string;
  onChange: Function;
  loadOptions: (inputValue: string) => Promise<any>;
  placeholder?: string;
  value?: PropsValue<Option>;
}

const Combobox = (props: IComboboxProps) => (
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
        // isOptionSelected={}
        value={props.value}
        loadOptions={props.loadOptions}
        onChange={(e) => props.onChange(e)}
        placeholder={props.placeholder}
        styles={{
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
        <p className="text-red-500">{props.error}</p>
      ) : null}
    </div>
  </div>
);

export default Combobox;
