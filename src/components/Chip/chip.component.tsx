import React from "react";
import styles from "./chip.module.css";

/**
 * Chip Component
 * @param {IChipProps} props
 * @export Chip
 * @returns JSX.Element
 */
export const Chip: React.FC<IChipProps> = (props) => {
  const { text } = props;
  return <div className={styles.chip}>{text}</div>;
};

/**
 * interface for Chip Props
 */
interface IChipProps {
  text: string;
}
