import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { Search } from "../../components/Search/search.component";
import { Dropdown } from "../../components/Dropdown/dropdown.component";
import { Card } from "../../components/Card/card.component";
import { Pagination } from "../../components/Pagination/pagination.component";
import { useSearchRepo } from "../../services/search_repo";
import styles from "./search.module.css";

/**
 * Paginate Options
 */
const paginateOptions = {
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  60: "60",
  70: "70",
  80: "80",
  90: "90",
  100: "100",
};

/**
 * Sory By Options
 */
const sortBy = {
  "Most Forks": "forks-desc",
  "Least Forks": "forks-asc",
  "Most Stars": "stars-desc",
  "Least Stars": "stars-asc",
  "Recent Updated": "updated-desc",
  "Oldest Updated": "updated-asc",
};

/**
 * Search Page
 * @export SearchPage
 * @returns JSX.Element
 */

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sort, setSort] = useState<{ sort: string; order: string }>({
    sort: "forks",
    order: "desc",
  });
  const [page, setPage] = useState<number>(1);
  const [per_page, setper_page] = useState<number>(10);
  const { data, isLoading } = useSearchRepo({
    ...sort,
    q: searchQuery,
    page,
    per_page,
  });

  /**
   * debounced search (1s after user stops typing)
   */
  const debouncedSearch = useRef(
    _.debounce((searchTerm) => {
      setSearchQuery(searchTerm);
    }, 1000)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  /**
   * Function to Change Sort Query
   * @param {string|number} value
   */

  const onChangeSort = (value: string | number) => {
    setSort({
      ...sort,
      sort: (value as string).split("-")[0],
      order: (value as string).split("-")[1],
    });
  };

  /**
   * Function to change Per Page Paginate Option
   * @param {string|number} value
   */
  const onChangePerPage = (value: number | string) => {
    setper_page(value as number);
  };

  /**
   * Function to change Page
   * @param {number} page
   */

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const repos = data?.data;
  //max Page set for the fact that github api only allows first 1000 repos result
  const maxPage =
    Math.floor((repos?.total_count || 0) / (per_page || 10)) >
    1000 / (per_page || 10)
      ? Math.ceil(1000 / (per_page || 10))
      : Math.ceil((repos?.total_count || 0) / (per_page || 10));
  return (
    <div>
      <h2 className={styles.header}>Search Github Repositories</h2>
      <div className={styles.nav}>
        <Search searchQuery={searchQuery} setSearchQuery={debouncedSearch} />
        <div className={styles.filter}>
          <Dropdown
            options={sortBy}
            currentValue={`${sort.sort}-${sort.order}`}
            changeValue={onChangeSort}
          />
          <Dropdown
            options={paginateOptions}
            currentValue={per_page.toString()}
            changeValue={onChangePerPage}
          />
        </div>
      </div>
      {!isLoading &&
        (repos?.items?.length ? (
          <>
            <div>
              {repos?.items?.map((repo: any) => (
                <Card
                  key={repo.id}
                  id={repo.id}
                  name={repo.full_name}
                  stars={repo.stargazers_count}
                  watchers={repo.watchers}
                  forks={repo.forks}
                  description={repo.description}
                  last_update={repo.updated_at}
                />
              ))}
            </div>
            <Pagination
              maxPage={maxPage}
              onChangePage={onChangePage}
              current={page}
            />
          </>
        ) : (
          <p className={styles.error}>
            No Data Found, May be search for another?
          </p>
        ))}
    </div>
  );
};
