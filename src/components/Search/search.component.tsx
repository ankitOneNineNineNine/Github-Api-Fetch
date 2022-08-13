import React from "react";
import styles from "./search.module.css";

/**
 * Search Component
 * @param {ISearchProps} props
 * @export Search
 * @returns JSX.Element
 */
export const Search: React.FC<ISearchProps> = (props) => {
  const { setSearchQuery } = props;
  return (
    <div className={styles["search-container"]}>
      <input
        type="search"
        placeholder="Search Query ..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

/**
 * interface for Search Props
 */
interface ISearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}
