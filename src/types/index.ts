export interface IOptions {
  week: any[];
  day: number[];
  hour: number[];
  min: number[];
  month: any[];
}

export interface ISelectOptions {
  week: IOption[] | [];
  day: IOption[] | [];
  hour: IOption[] | [];
  min: IOption[] | [];
  month: IOption[] | [];
}

export interface IOption {
  value: number;
  label: string;
}
