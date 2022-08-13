import React from "react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "../Tooltip/tooltip.component";
import styles from "./card.module.css";

/**
 * Card Component
 * @param {ICardProps} props
 * @export Card
 * @returns JSX.Element
 */
export const Card: React.FC<ICardProps> = (props) => {
  const { name, stars, watchers, forks, description, last_update, id } = props;

  return (
    <div className={styles["card-container"]}>
      <div className={styles["container-top"]}>
        <NavLink to={`/details/${id}`}>
          <p className={styles.name}>{name}</p>
        </NavLink>
        <div className={styles["info-container"]}>
          <Tooltip text={stars} icon="fa fa-star" tip="Total Stars" />
          <Tooltip text={watchers} icon="fa fa-eye" tip="Total Watchers" />
          <Tooltip text={forks} icon="fa fa-code-fork" tip="Total Forks" />
        </div>
      </div>
      <div>
        <p className={styles.description}>{description || "No Description"}</p>
      </div>
      <div className={styles.date}>
        <span>
          Last Updated On: {new Date(last_update).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

/**
 * interface for Card Props
 */
interface ICardProps {
  name: string;
  stars: number;
  watchers: number;
  forks: number;
  description: string;
  last_update: string;
  id: number;
}
