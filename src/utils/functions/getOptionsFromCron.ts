import { IOptions } from "../../types/index";
import CronNotValidError from "../../exceptions/CronNotValidError";

import {
  HOUR_MAX,
  HOUR_MIN,
  MIN_MAX,
  MIN_MIN,
  WEEK_MAX,
  WEEK_MIN,
  MONTH_MAX,
  MONTH_MIN,
  DAY_MAX,
  DAY_MIN,
  MINS,
  HOURS,
  DAYS,
  WEEKS,
  MONTHS,
} from "../../consts";

export const getOptionsFromCron = (cron: string) => {
  const options = {} as IOptions;
  const cronArr = cron.split(" ");

  if (cronArr.length !== 5) throw new CronNotValidError();

  const [min, hour, day, month, week] = cronArr;

  options.week = getOptions(week, WEEKS, WEEK_MIN, WEEK_MAX);
  options.month = getOptions(month, MONTHS, MONTH_MIN, MONTH_MAX);
  options.min = getOptions(min, MINS, MIN_MIN, MIN_MAX);
  options.hour = getOptions(hour, HOURS, HOUR_MIN, HOUR_MAX);
  options.day = getOptions(day, DAYS, DAY_MIN, DAY_MAX);

  return options;
};

const getOptFromIntRange = (
  range: string,
  arr: number[],
  validStart: number,
  validEnd: number
): number[] => {
  let [start, end]: string[] | number[] = range.split("-");
  start = +start;
  end = +end;
  if (
    validStart <= start &&
    start <= validEnd &&
    validStart <= end &&
    end <= validEnd &&
    start <= end
  ) {
    return arr.slice(start - validStart, end + 1 - validStart);
  } else throw new CronNotValidError();
};

const getOptFromStrRange = (range: string, obj: any) => {
  let [start, end] = range.split("-");
  start = getValidString(start, obj);
  end = getValidString(end, obj);
  const arr = Object.keys(obj);
  const startIndex = arr.indexOf(start);
  const endIndex = arr.indexOf(end);
  if (startIndex <= endIndex) {
    return arr.slice(startIndex, endIndex);
  } else throw new CronNotValidError();
};

const getValidString = (string: string, obj: any) => {
  const stringStart = string.slice(0, 3).toUpperCase();
  const isItemExist = obj[stringStart] === string.toUpperCase() || obj[string];
  if (isItemExist) {
    return stringStart;
  } else throw new CronNotValidError();
};

const getNthArrayItem = (arr: any[], nth: number) => {
  return arr.filter(function (_, index) {
    return index % nth == 0;
  });
};

const getOptions = (
  val: string,
  obj: any,
  validStart: number,
  validEnd: number
): number[] => {
  const splitedVal = val.split(",");
  const options = new Set<number>();
  const isString = /^[a-z]/gi;
  const isObjArray = Array.isArray(obj);

  if (splitedVal.length === 1 && splitedVal[0] === "*") {
    return [];
  }

  splitedVal.forEach((i) => {
    if (i.match(isString)) {
      getStrOption(i, obj).forEach((item) => options.add(item));
    } else {
      const newObj = isObjArray ? obj : Object.keys(obj);
      getIntOption(i, newObj, validStart, validEnd).forEach((item) =>
        options.add(item)
      );
    }
  });
  const objLenght = isObjArray ? obj.length : Object.keys(obj).length;
  return options.size === objLenght ? [] : [...options];
};

const getIntOption = (
  val: string,
  arr: number[],
  validStart: number,
  validEnd: number
) => {
  const isRange = /^([0-9]+\-[0-9]+)$/gi;
  const isNthRange = /^([0-9]+\-[0-9]+\/[0-9]+|\*\/[0-9]+)$/gi;
  const isSingleValue = /^[0-9]+$/gi;

  const range = val.match(isRange);
  const nthRange = val.match(isNthRange);
  const singleValue = val.match(isSingleValue);
  if (range) {
    const rangeOptions = getOptFromIntRange(
      range[0],
      arr,
      validStart,
      validEnd
    );
    return rangeOptions;
  }
  if (singleValue) {
    if (validStart <= +singleValue[0] && +singleValue[0] <= validEnd) {
      return [arr[+singleValue[0] - validStart]];
    } else throw new CronNotValidError();
  }

  if (nthRange) {
    let [range, nth] = nthRange[0].split("/");
    if (range !== "*")
      arr = getOptFromIntRange(range, arr, validStart, validEnd);
    const nthRangeOptions = getNthArrayItem(arr, +nth);
    return nthRangeOptions;
  } else {
    throw new CronNotValidError();
  }
};

const getStrOption = (val: string, valObj: any) => {
  let valObjKeys = Object.keys(valObj);

  const isRange = /^([a-z]+\-[a-z]+)$/gi;
  const isNthRange = /^([a-z]+\-[a-z]+\/[0-9]+)$/gi;
  const isSingleValue = /^[a-z]+$/gi;
  const range = val.match(isRange);
  const nthRange = val.match(isNthRange);
  const singleValue = val.match(isSingleValue);
  if (range) {
    const rangeOptions = getOptFromStrRange(range[0], valObjKeys);
    return rangeOptions;
  }
  if (singleValue) {
    return [getValidString(singleValue[0], valObj)];
  }

  if (nthRange) {
    let [range, nth] = nthRange[0].split("/");
    if (range !== "*") valObjKeys = getOptFromStrRange(range, valObj);
    const nthRangeOptions = getNthArrayItem(valObjKeys, +nth);
    return nthRangeOptions;
  } else {
    throw new CronNotValidError();
  }
};
