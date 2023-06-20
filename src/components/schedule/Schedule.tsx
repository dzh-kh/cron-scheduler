import React, { useState } from "react";
import CustomSelect from "../ui/custom-select/CustomSelect";
import { MONTHS, DAYS, MINS, WEEKS, HOURS } from "../../consts";
type Props = {};

const Schedule = (props: Props) => {
  const [everyFormat, setEveryFormat] = useState(-1);
  const [min, setMin] = useState([]);
  const [hour, setHour] = useState([]);
  const [day, setDay] = useState([]);
  const [month, setMonth] = useState([]);
  const [weekDay, setWeekDay] = useState([]);

  const setObj: any = {
    minute: [min, setMin],
    hour: [hour, setHour],
    day: [day, setDay],
    week: [weekDay, setWeekDay],
    month: [month, setMonth],
  };

  const items = selectData.map((data, index) => {
    const idDisabled = everyFormat >= index;
    console.log(data.name);
    const [value, setValue] = setObj[data.name];
    return (
      <CustomSelect
        value={value}
        setValue={setValue}
        isDisabled={idDisabled}
        key={data.key}
        data={data}
      />
    );
  });
  return (
    <div className="schedule schedule__wrapper">
      <div>
        {
          <CustomSelect
            //value={everyFormat}
            setValue={setEveryFormat}
            data={every}
            defaultValue={every.defaultValue}
          />
        }
      </div>
      <div className="schedule__input-group">{items}</div>
    </div>
  );
};

export default Schedule;

const selectOptionsData = {
  minute: MINS.map((item) => ({
    value: item,
    label: `${item}`,
  })),
  hour: HOURS.map((item) => ({
    value: item,
    label: `${item}`,
  })),
  day: DAYS.map((item) => ({
    value: item,
    label: `${item}`,
  })),
  week: Object.keys(WEEKS).map((item, index) => {
    return { value: index, label: item };
  }),
  month: Object.keys(MONTHS).map((item, index) => {
    return { value: index + 1, label: item };
  }),
  every: [
    { value: -1, label: "year" },
    { value: 0, label: "month" },
    { value: 1, label: "week" },
    { value: 2, label: "day" },
    { value: 3, label: "hour" },
    { value: 4, label: "minute" },
  ],
};

const selectData = [
  {
    key: "5",
    prefix: "in",
    name: "month",
    options: selectOptionsData.month,
    colCount: 1,
  },
  {
    key: "3",
    prefix: "on",
    name: "day",
    options: selectOptionsData.day,
    colCount: 4,
  },
  {
    key: "4",
    prefix: "and",
    name: "week",
    options: selectOptionsData.week,
    colCount: 1,
  },
  {
    key: "2",
    prefix: "at",
    name: "hour",
    options: selectOptionsData.hour,
    colCount: 4,
  },
  {
    key: "1",
    prefix: ":",
    name: "minute",
    options: selectOptionsData.minute,
    colCount: 7,
  },
];

const every = {
  prefix: "Every",
  name: "",
  options: selectOptionsData.every,
  colCount: 1,
  isMulti: false,
  closeMenuOnSelect: true,
  defaultValue: selectOptionsData.every[0],
};
