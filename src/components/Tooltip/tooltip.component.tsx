import React, { useState } from "react";
import styles from "./tooltip.module.css";
/**
 * Tooltip Component
 * @param {ITooltipProps} props
 * @export Tooltip
 * @returns JSX.Element
 */
export const Tooltip: React.FC<ITooltipProps> = (props) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  return (
    <div style={{ position: "relative", boxShadow: "none " }}>
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <i className={props.icon} /> {props.text}
      </div>
      {showTooltip && <div className={styles.tooltip}>{props.tip}</div>}
    </div>
  );
};

/**
 * interface for Tooltip props
 */

interface ITooltipProps {
  text: string | number;
  icon: string;
  tip: string;
}
