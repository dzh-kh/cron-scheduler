import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import CustomSelect from "../ui/custom-select/CustomSelect";
import { selectData, format } from "./data";
import { ISelectOptions, IOption } from "../../types";
import "./schedule.css";

type Props = {
  options: ISelectOptions;
  setOptions: Dispatch<SetStateAction<ISelectOptions>>;
};

const Schedule = ({ options, setOptions }: Props) => {
  const [everyFormat, setEveryFormat] = useState<IOption>(format.defaultValue);
  useEffect(() => {
    const optionKeys = Object.keys(options);
    for (let i = 0; i < optionKeys.length; i++) {
      if (everyFormat.value >= i) {
        setOptions((prev) => ({ ...prev, [optionKeys[i]]: [] }));
      }
    }
  }, [everyFormat]);

  const items = selectData.map((data, index) => {
    const idDisabled = everyFormat.value >= index;
    const onChange = (value: IOption[]) => {
      setOptions((prevState) => ({
        ...prevState,
        [data.name]: value,
      }));
    };
    return (
      <CustomSelect
        value={options[data.name as keyof ISelectOptions]}
        onChange={onChange}
        isDisabled={idDisabled}
        key={data.key}
        closeMenuOnSelect={false}
        data={data}
      />
    );
  });

  const handleFormatChange = (value: IOption) => {
    setEveryFormat(value);
  };

  return (
    <div className="schedule schedule__wrapper">
      <div>
        {
          <CustomSelect
            onChange={handleFormatChange}
            value={everyFormat}
            data={format}
            isMulti={false}
            closeMenuOnSelect={true}
          />
        }
      </div>
      <div className="schedule__input-group">{items}</div>
    </div>
  );
};

export default Schedule;
