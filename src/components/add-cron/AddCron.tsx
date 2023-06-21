import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import { getCronFromOptions, getOptionsFromCron } from "../../utils/functions";
import { selectOptionsData } from "../schedule/data";
import { IOptions, ISelectOptions, IOption } from "../../types";
import "./add-cron.css";

type Props = {
  options: ISelectOptions;
  setOptions: React.Dispatch<React.SetStateAction<ISelectOptions>>;
};

const AddCron = ({ setOptions, options }: Props) => {
  const [cron, setCron] = useState("");
  const [isCronValide, setIsCronValide] = useState(true);

  const handleLoadClick = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    setIsCronValide(true);
    try {
      const cronOptions = getOptionsFromCron(cron);
      const min = selectOptionsData.min.filter((i) =>
        cronOptions.min.includes(i.value)
      );
      const hour = selectOptionsData.hour.filter((i) =>
        cronOptions.hour.includes(i.value)
      );
      const day = selectOptionsData.day.filter((i) =>
        cronOptions.day.includes(i.value)
      );
      const month = selectOptionsData.month.filter((i) =>
        cronOptions.month.includes(i.label)
      );
      const week = selectOptionsData.week.filter((i) =>
        cronOptions.week.includes(i.label)
      );

      setOptions({ min, hour, day, month, week });
    } catch (e) {
      setIsCronValide(false);
    }
  };

  const handleSaveClick = () => {
    setIsCronValide(true);
    const values = {} as IOptions;
    for (let [key, value] of Object.entries(options)) {
      values[key as keyof IOptions] = value.map((i: IOption) => i.value);
    }

    const res = getCronFromOptions(values);
    setCron(res);
  };
  const handleCronChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCron(e.target.value);
  };
  return (
    <div>
      <form className="add-cron__form" onSubmit={handleLoadClick}>
        <Input
          type="text"
          onChange={handleCronChange}
          value={cron}
          placeholder="enter cron"
          required
          isValide={isCronValide}
        />
        <div className="add-cron__btn-group">
          <Button type="submit">Load</Button>
          <Button type="button" onClick={handleSaveClick}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCron;
