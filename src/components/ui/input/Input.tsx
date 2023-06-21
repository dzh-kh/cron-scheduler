import React from "react";
import "./input.css";

type Props = {
  onChange: any;
  value: string;
  placeholder?: string;
  type?: string;
  required: boolean;
  isValide: boolean;
};

const Input = ({ onChange, value, isValide, ...rest }: Props) => {
  return (
    <input
      onChange={onChange}
      className={!isValide ? "input-ui --error" : "input-ui"}
      value={value}
      {...rest}
    ></input>
  );
};

export default Input;
