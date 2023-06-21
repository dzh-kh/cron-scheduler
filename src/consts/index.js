export const MIN_MAX = 59;
export const HOUR_MAX = 23;
export const WEEK_MAX = 6;
export const DAY_MAX = 31;
export const MONTH_MAX = 12;

export const MIN_MIN = 0;
export const HOUR_MIN = 0;
export const WEEK_MIN = 0;
export const DAY_MIN = 1;
export const MONTH_MIN = 1;

export const DAYS = new Array(DAY_MAX).fill(null).map((el, i) => i + 1);
export const MINS = new Array(MIN_MAX + 1).fill(null).map((el, i) => i);
export const HOURS = new Array(HOUR_MAX + 1).fill(null).map((el, i) => i);

export const WEEKS = {
  SUN: "SUNDAY",
  MON: "MONDAY",
  TUE: "TUESDAY",
  WED: "WEDNESDAY",
  THU: "THURSDAY",
  FRI: "FRIDAY",
  SUT: "SATURDAY",
};

export const MONTHS = {
  JAN: "JANUARY",
  FEB: "FEBRUARY",
  MAR: "MARCH",
  APR: "APRIL",
  MAY: "MAY",
  JUN: "JUNE",
  JUL: "JULE",
  AUG: "AUGUST",
  SEP: "SEPTEMBER",
  OCT: "OCTOBER",
  NOV: "NOVEMBER",
  DEC: "DECEMBER",
};
