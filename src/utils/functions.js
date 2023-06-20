import CronNotValidError from "../exceptions/CronNotValidError";

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
} from "../consts";

const returnOptionsFromCron = (cron) => {
  const options = {};
  const cronArr = cron.split(" ");
  if (cronArr.length !== 5) return null;
  const [min, hour, day, month, week] = cronArr;

  options.week = getOptions(week, WEEKS, WEEK_MIN, WEEK_MAX);

  options.month = getOptions(month, MONTHS, MONTH_MIN, MONTH_MAX);

  options.min = getOptions(min, MINS, MIN_MIN, MIN_MAX);
  options.hour = getOptions(hour, HOURS, HOUR_MIN, HOUR_MAX);
  options.day = getOptions(day, DAYS, DAY_MIN, DAY_MAX);
  return options;
};

const getOptFromIntRange = (range, arr, validStart, validEnd) => {
  let [start, end] = range.split("-");
  start = +start;
  end = +end;
  if (
    validStart <= start &&
    start <= validEnd &&
    validStart <= end &&
    end <= validEnd &&
    start <= end
  ) {
    return arr.slice(start, end + 1);
  } else throw new CronNotValidError(range);
};

const getOptFromStrRange = (range, obj) => {
  let [start, end] = range.split("-");
  start = stringValidator(start, obj);
  end = stringValidator(end, obj);
  const arr = Object.keys(obj);
  const startIndex = arr.indexOf(start);
  const endIndex = arr.indexOf(end);
  if (startIndex <= endIndex) {
    return arr.slice(startIndex, endIndex);
  } else throw new CronNotValidError(range);
};

const stringValidator = (string, obj) => {
  const stringStart = string.slice(0, 3).toUpperCase();
  const isItemExist = obj[stringStart] === string.toUpperCase() || obj[string];
  if (isItemExist) {
    return stringStart;
  } else throw new CronNotValidError(string);
};

const getNthArrayItem = (arr, nth) => {
  return arr.filter(function (_, index) {
    return index % nth == 0;
  });
};

const getOptions = (val, obj, validStart, validEnd) => {
  const splitedVal = val.split(",");
  const options = new Set();
  const isString = /^[a-z]/gi;
  const isObjArray = Array.isArray(obj);

  if (splitedVal.length === 1 && splitedVal[0] === "*") {
    return isObjArray ? obj : Object.keys(obj);
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
  return options;
};

const getIntOption = (el, arr, validStart, validEnd) => {
  const isRange = /^([0-9]+\-[0-9]+)$/gi;
  const isNthRange = /^([0-9]+\-[0-9]+\/[0-9]+|\*\/[0-9]+)$/gi;
  const isNum = /^[0-9]+$/gi;

  const range = el.match(isRange);
  const nthRange = el.match(isNthRange);
  const num = el.match(isNum);
  if (range) {
    const rangeOptions = getOptFromIntRange(
      range[0],
      arr,
      validStart,
      validEnd
    );
    return rangeOptions;
  }
  if (num) {
    if (validStart <= +num[0] && +num[0] <= validEnd) {
      return [arr[num[0]]];
    } else throw new CronNotValidError(val);
  }

  if (nthRange) {
    let [range, nth] = nthRange[0].split("/");
    if (range !== "*")
      arr = getOptFromIntRange(range, arr, validStart, validEnd);
    const nthRangeOptions = getNthArrayItem(arr, +nth);
    return nthRangeOptions;
  } else {
    throw new CronNotValidError(val);
  }
};

const getStrOption = (el, valObj) => {
  let valObjKeys = Object.keys(valObj);

  const isRange = /^([a-z]+\-[a-z]+)$/gi;
  const isNthRange = /^([a-z]+\-[a-z]+\/[0-9]+)$/gi;
  const isSingleValue = /^[a-z]+$/gi;
  const range = el.match(isRange);
  const nthRange = el.match(isNthRange);
  const singleValue = el.match(isSingleValue);
  if (range) {
    const rangeOptions = getOptFromStrRange(range[0], valObjKeys);
    return rangeOptions;
  }
  if (singleValue) {
    return [stringValidator(singleValue[0], valObj)];
    // const value = stringValidator(singleValue[0], valObj);
    // if (value) return [value];
    // throw new CronNotValidError(val);
  }

  if (nthRange) {
    let [range, nth] = nthRange[0].split("/");
    if (range !== "*") valObjKeys = getOptFromStrRange(range, valObj);
    const nthRangeOptions = getNthArrayItem(valObjKeys, +nth);
    return nthRangeOptions;
  } else {
    throw new CronNotValidError(el);
  }
};

// console.log(returnOptionsFromCron("*/4 * 1-4,7 JAN,MAR,February,April */5"));

const options = {
  day: [1, 2, 3, 4, 7],
  hour: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ],
  min: [0, 4, 8, 12, 16],
  month: [1, 2, 3],
  week: [4],
};

const getAscRangesFromIntArr = (arr) => {
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

const getNthRangesFromIntArr = (slicedArr, arr) => {
  const min = slicedArr[0];
  const max = slicedArr[slicedArr.length - 1];

  if (!(min < max)) return;

  const minIndex = arr.indexOf(min);
  const maxIndex = arr.indexOf(max);
  let nth = 0;
  for (let i = 0; i < slicedArr.length; i++) {
    const res = arr.indexOf(slicedArr[i]);
    if (nth === 0) nth = res;
    else if (res % nth != 0 || nth === 1) return;

    console.log(slicedArr[i], res, nth);
  }
  return `${arr[minIndex]}-${arr[maxIndex]}/${nth}`;
};

const getCronString = (options, arr) => {
  if (options.length === arr.length) return "*";
  if (options.length === 1) return `${options[0]}`;
  const nthRanges = getNthRangesFromIntArr(options, arr);
  if (!nthRanges) {
    return getAscRangesFromIntArr(options);
  }
  return nthRanges;
};

const createCronFromOptions = (options) => {
  const { min, hour, day, month, week } = options;
  let cron = [];
  const minString = getCronString(min, MINS);
  const hourtring = getCronString(hour, HOURS);
  const dayString = getCronString(day, DAYS);
  const monthsIndexArr = Object.keys(MONTHS).map((i, index) => index);
  const monthString = getCronString(month, monthsIndexArr);
  const weeksIndexArr = Object.keys(WEEKS).map((i, index) => index);
  const weekString = getCronString(week, weeksIndexArr);
  cron.push(minString, hourtring, dayString, monthString, weekString);
  return cron.join(" ");
};

console.log(createCronFromOptions(options));
