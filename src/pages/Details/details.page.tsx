import React from "react";

import styles from "./detail.module.css";
import { useParams } from "react-router-dom";
import { useGetRepoById } from "../../services/search_repo";
import { Chip } from "../../components/Chip/chip.component";
import { Tooltip } from "../../components/Tooltip/tooltip.component";

/**
 * Details Page
 * @export DetailsPage
 * @returns JSX.Element
 */
export const DetailsPage = () => {
  const { id } = useParams();
  const { data: repoDetails } = useGetRepoById(id || "");

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles["img-container"]}>
          <img src={repoDetails?.owner?.avatar_url} alt="owner" />
        </div>
        <div className={styles["heading-details"]}>
          <a href={repoDetails?.html_url}>
            <h1>{repoDetails?.name}</h1>
          </a>

          <a href={repoDetails?.owner?.html_url}>
            <span>{repoDetails?.owner?.login}</span>
          </a>
        </div>
      </div>
      <div className={styles["info-container"]}>
        <div className={styles.info}>
          <Tooltip
            tip="Default Branch"
            text={repoDetails?.default_branch || ""}
            icon="fa fa-code-fork"
          />
          <Tooltip
            tip="Open Issues"
            text={repoDetails?.open_issues || ""}
            icon="fa fa-github"
          />
          <Tooltip
            tip="License"
            text={repoDetails?.license?.name || ""}
            icon="fa fa-balance-scale"
          />
          <Tooltip
            tip="Language"
            text={repoDetails?.language || ""}
            icon="fa fa-book"
          />
          <Tooltip
            tip="Fork Counts"
            text={repoDetails?.forks_count || ""}
            icon="fa fa-code-fork"
          />
          <Tooltip
            tip="Stars"
            text={repoDetails?.stargazers_count || ""}
            icon="fa fa-star"
          />

          {repoDetails?.private ? (
            <Tooltip tip="Private" icon="fa fa-lock" text="" />
          ) : (
            <Tooltip tip="Public" icon="fa fa-unlock" text="" />
          )}
        </div>
        <div>
          <h3>Description</h3>
          <p>{repoDetails?.description || "No Descriptions"}</p>
        </div>
        <div>
          <h5>Topics</h5>
          {repoDetails?.topics?.length ? (
            repoDetails?.topics?.map((topic, i) => (
              <Chip key={i} text={topic} />
            ))
          ) : (
            <p>No Topics</p>
          )}
        </div>
        <div className={styles["dates"]}>
          <div>
            <h3>Created At</h3>
            <p>
              {new Date(repoDetails?.created_at || "").toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3>Last Updated On</h3>
            <p>
              {new Date(repoDetails?.updated_at || "").toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
