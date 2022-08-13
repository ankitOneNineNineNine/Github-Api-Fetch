import React from "react";
import styles from "./pagination.module.css";

/**
 * Pagination Component
 * @param {IPaginationProps} props
 * @export Pagination
 * @returns JSX.Element
 */
export const Pagination: React.FC<IPaginationProps> = (props) => {
  const { maxPage, onChangePage, current } = props;
  let fromPage = current - 5 >= 0 ? current - 5 : 0;
  let toPage = current + 5 <= maxPage ? current + 4 : maxPage;
  let paginationArray: number[] = [];
  for (let i = fromPage; i < toPage; i++) {
    paginationArray[i] = i;
  }

  return (
    <div className={styles["paginate-container"]}>
      {paginationArray.map((page) => (
        <div
          onClick={() => onChangePage(page + 1)}
          key={page}
          className={styles.pages}
          style={page + 1 === current ? { backgroundColor: "#5298E9" } : {}}
        >
          {page + 1}
        </div>
      ))}
      {!!maxPage && current !== maxPage && toPage !== maxPage && (
        <>
          <span className={styles.paginateDots}>....</span>
          <div onClick={() => onChangePage(maxPage)} className={styles.pages}>
            {maxPage}
          </div>
        </>
      )}
    </div>
  );
};

/**
 * interface for Pagination Props
 */
interface IPaginationProps {
  maxPage: number;
  onChangePage: (value: number) => void;
  current: number;
}
