import { MONTHS, DAYS, MINS, WEEKS, HOURS } from "../../consts";
import { ISelectOptions } from "../../types";

export const selectOptionsData = {
  min: MINS.map((item) => ({
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

export const selectData = [
  {
    key: "5",
    prefix: "in",
    name: "month",
    options: selectOptionsData.month,
    colCount: 1,
    placeholder: "every month",
  },
  {
    key: "3",
    prefix: "on",
    name: "day",
    options: selectOptionsData.day,
    colCount: 4,
    placeholder: "every day of the month",
  },
  {
    key: "4",
    prefix: "and",
    name: "week",
    options: selectOptionsData.week,
    colCount: 1,
    placeholder: "every day of the week",
  },
  {
    key: "2",
    prefix: "at",
    name: "hour",
    options: selectOptionsData.hour,
    colCount: 4,
    placeholder: "every hour",
  },
  {
    key: "1",
    prefix: ":",
    name: "min",
    options: selectOptionsData.min,
    colCount: 7,
    placeholder: "every minute",
  },
];

export const selectOrderObject = {} as ISelectOptions;
selectData.forEach(
  (i) => (selectOrderObject[i.name as keyof ISelectOptions] = [])
);

export const format = {
  prefix: "Every",
  name: "format",
  options: selectOptionsData.every,
  colCount: 1,
  defaultValue: selectOptionsData.every[0],
};
