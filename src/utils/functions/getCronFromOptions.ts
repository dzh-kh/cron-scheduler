import { IOptions } from "../../types/index";

import { MONTH_MIN, MINS, HOURS, DAYS, WEEKS, MONTHS } from "../../consts";

const getAscRangesString = (arr: any[]) => {
  let res = [];
  let start = arr[0];
  let end = 0;
  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    const next = arr[i + 1];
    if (next - curr === 1) {
      end = next;
    } else {
      if (end > start) {
        res.push(`${start}-${end}`);
      } else res.push(`${start}`);
      start = next;
    }
  }
  return res.join();
};

const getNthRangesString = (slicedArr: number[], arr: number[]) => {
  const min = slicedArr[0];
  const max = slicedArr[slicedArr.length - 1];
  console.log(slicedArr);
  console.log(arr);
  if (!(min < max)) return;

  const minIndex = arr.indexOf(min);
  const maxIndex = arr.indexOf(max);
  let nth = 0;
  for (let i = 0; i < slicedArr.length; i++) {
    const res = arr.indexOf(slicedArr[i]);
    console.log(res);
    if (nth === 0) nth = res;
    else if (res % nth != 0 || nth === 1) return;
  }
  return `${arr[minIndex]}-${arr[maxIndex]}/${nth}`;
};

const getCronString = (options: any[], arr: number[]) => {
  if (options.length === arr.length || !options.length) return "*";
  if (options.length === 1) return `${options[0]}`;
  const nthRanges = getNthRangesString(options, arr);
  if (!nthRanges) {
    return getAscRangesString(options);
  }
  return nthRanges;
};

export const getCronFromOptions = (options: IOptions) => {
  const { min, hour, day, month, week } = options;
  let cron = [];
  const minString = getCronString(min, MINS);
  const hourtring = getCronString(hour, HOURS);
  const dayString = getCronString(day, DAYS);
  const monthsIndexArr = Object.keys(MONTHS).map(
    (_, index) => index + MONTH_MIN
  );
  const monthString = getCronString(month, monthsIndexArr);
  const weeksIndexArr = Object.keys(WEEKS).map((_, index) => index);
  const weekString = getCronString(week, weeksIndexArr);
  cron.push(minString, hourtring, dayString, monthString, weekString);
  return cron.join(" ");
};
