import { useState, FC } from "react";
import Schedule from "../schedule/Schedule";
import AddCron from "../add-cron/AddCron";
import { selectOrderObject } from "../schedule/data";
import { ISelectOptions } from "../../types";
import "./main.css";

const Main: FC = () => {
  const [options, setOptions] = useState<ISelectOptions>(selectOrderObject);
  return (
    <div className="main__wrapper">
      <Schedule options={options} setOptions={setOptions} />
      <AddCron options={options} setOptions={setOptions} />
    </div>
  );
};

export default Main;
