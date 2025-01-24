import { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import * as style from "./Checkbox.css";

export type CheckboxProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  const [checked, setChecked] = useState(props.checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    props.onChange?.(e);
  };

  return (
    <label className={style.label}>
      <input type="checkbox" {...props} onChange={handleChange} />
      {checked ? (
        <MdCheckBox className={style.checked} />
      ) : (
        <MdCheckBoxOutlineBlank className={style.unchecked} />
      )}
      {label}
    </label>
  );
};
