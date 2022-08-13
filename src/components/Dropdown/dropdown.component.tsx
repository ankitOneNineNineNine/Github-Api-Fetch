import React from "react";
import styles from "./dropdown.module.css";

/**
 * Dropdown Component
 * @param {IDropDownProps} props
 * @export Dropdown
 * @returns JSX.Element
 */
export const Dropdown: React.FC<IDropDownProps> = (props) => {
  const { options, currentValue, changeValue } = props;
  return (
    <div>
      <select
        className={styles.select}
        onChange={(e) => changeValue(e.target.value)}
        defaultValue={currentValue}
      >
        {Object.keys(options).map((sort) => {
          return (
            <option key={options[sort]} value={options[sort]}>
              {sort}
            </option>
          );
        })}
      </select>
    </div>
  );
};

/**
 * interface for Dropdown Props
 */
interface IDropDownProps {
  changeValue: (value: string | number) => void;
  currentValue: string;
  options: { [key: string]: string };
}
