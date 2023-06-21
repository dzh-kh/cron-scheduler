import Select from "react-select";
import { IOption } from "../../../types";
import "./custom-select.css";
interface IData {
  colCount: number;
  options: IOption[];
  prefix: string;
  name: string;
  key?: string;
  placeholder?: string;
}
type Props = {
  data: IData;
  isDisabled?: boolean;
  value: IOption | IOption[];
  onChange: any;
  isMulti?: boolean;
  closeMenuOnSelect?: boolean;
};

const CustomSelect = ({
  data,
  isDisabled = false,
  value,
  onChange,
  isMulti = true,
  closeMenuOnSelect,
}: Props) => {
  const { colCount, options, prefix, name, placeholder } = data;
  return (
    <div className={`select__wrapper --col-count-${colCount}`}>
      <span>{prefix}</span>
      <Select
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
        isMulti={isMulti}
        name={name}
        isSearchable={false}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        hideSelectedOptions={false}
        closeMenuOnSelect={closeMenuOnSelect}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomSelect;
