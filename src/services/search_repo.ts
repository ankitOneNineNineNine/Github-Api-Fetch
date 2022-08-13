import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "./api";
import { toastFail } from "./toast";

interface ISearchRepoParams {
  q: string;
  sort: string;
  order: string;
  page: number;
  per_page: number;
}
interface IRepo {
  allow_forking: boolean;
  archive_url: string;
  archived: boolean;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: string;
  default_branch: string;
  deployments_url: string;
  description: string;
  disabled: boolean;
  downloads_url: string;
  events_url: string;
  fork: boolean;
  forks: number;
  forks_count: number;
  forks_url: string;
  full_name: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  has_downloads: boolean;
  has_issues: boolean;
  has_pages: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  homepage: string;
  hooks_url: string;
  html_url: string;
  id: number;
  is_template: boolean;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  language: string;
  languages_url: string;
  license: { [key: string]: any };
  merges_url: string;
  milestones_url: string;
  mirror_url: null;
  name: string;
  node_id: string;
  notifications_url: string;
  open_issues: number;
  open_issues_count: number;
  owner: { [key: string]: any };
  private: boolean;
  pulls_url: string;
  pushed_at: string;
  releases_url: string;
  score: number;
  size: number;
  ssh_url: string;
  stargazers_count: number;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  topics: string[];
  trees_url: string;
  updated_at: string;
  url: string;
  visibility: string;
  watchers: number;
  watchers_count: number;
  web_commit_signoff_required: boolean;
}
interface IRepoResponse {
  incomplete_results: boolean;
  total_count: number;
  items: IRepo[];
}

/**
 * Axios Get Call to fetch repos based on search query
 * @param {ISearchRepoParams} params
 * @returns AxiosResponse<IRepoResponse>
 */
const searchRepo = (params: ISearchRepoParams) => () => {
  return axios.get<IRepoResponse>(api.repo.fetch, {
    params,
  });
};

/**
 * Axios Get Call to get repo by Id
 * @param {string} id
 * @returns AxiosResponse<IRepo>
 */
const getRepoById = (id: string) => () => {
  return axios.get<IRepo>(api.repo.fetchById.replace("{id}", id));
};

/**
 * Use Query to Fetch Repositories
 * @param {ISearchRepoParams} params
 * @export useSearchRepo
 * @returns UseQueryResult
 */
export const useSearchRepo = (params: ISearchRepoParams) => {
  return useQuery(
    [api.repo.fetch, JSON.stringify(params)],
    searchRepo(params),
    {
      enabled:
        !!params.q && (!!params.sort || !!params.page || !!params.per_page),
      onError: (
        error: AxiosError<{
          message: string;
        }>
      ) => {
        toastFail(error?.response?.data?.message || "Something Went Wrong");
      },
    }
  );
};

/**
 * Use Query to Fetch Repo By Id
 * @param {string} id
 * @export useGetRepoById
 * @returns UseQueryResult
 */
export const useGetRepoById = (id: string) => {
  return useQuery([api.repo.fetch, id], getRepoById(id), {
    enabled: !!id,
    select: ({ data }) => data,
    onError: (
      error: AxiosError<{
        message: string;
      }>
    ) => {
      toastFail(error?.response?.data?.message || "Something Went Wrong");
    },
  });
};
