import React from "react";
import Select from "react-select";

export interface IOption {
  value: number;
  label: string;
}
interface IData {
  colCount: number;
  options: IOption[];
  prefix: string;
  name: string;
  isMulti?: boolean;
  closeMenuOnSelect?: boolean;
  defaultValue?: IOption;
  key?: string;
}
type Props = {
  data: IData;
  isDisabled?: boolean;
  onChange?: any;
  value: any;
  setValue: any;
};

const CustomSelect = ({ data, isDisabled = false, value, setValue }: Props) => {
  const {
    colCount,
    options,
    prefix,
    name,
    isMulti = true,
    closeMenuOnSelect = false,
    defaultValue,
  } = data;
  const handleChange = (option: IOption) => {
    setValue(option.value);
  };
  return (
    <div className={`select__wrapper --col-count-${colCount}`}>
      <span>{prefix}</span>
      <Select
        value={value}
        //defaultValue={defaultValue}
        onChange={handleChange}
        isDisabled={isDisabled}
        isMulti={isMulti}
        name={name}
        isSearchable={false}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        hideSelectedOptions={false}
        closeMenuOnSelect={closeMenuOnSelect}
        placeholder={`every ${name}`}
      />
    </div>
  );
};

export default CustomSelect;
