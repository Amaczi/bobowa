// React & Styles imports
import React, { useEffect, useState } from "react";
import styles from "./postswrapper.module.css";

// Next.js & Typescript imports
import Router, { useRouter } from "next/router";

// Components & Other imports
import Post from "../Post/Post";
import Loader from "../Loader/Loader";
import PostPagination from "../PostPagination/PostPagination";
import PostSearchBar from "../PostSearchBar/PostSearchBar";
import { dangerousData, scrollToTop } from "../../utils/basic";
import { apiConnect } from "../../api/basic";
import { useAppContext } from "../../context/basic";
import { ParsedUrlQuery } from "querystring";

// Defaults
const DEFAULT_PAGE = 1;
const DEFAULT_CATEGORY = "";

// Interfaces
interface PostsWrapperProps {
  categoryName?: string | string[];
}

interface QueryProps {
  query: ParsedUrlQuery;
  isReady: boolean;
}

export default function PostsWrapper({
  categoryName,
}: PostsWrapperProps): JSX.Element {
  const { query, isReady }: QueryProps = useRouter();
  const [routerLoading, setRouterLoading] = useState(true);
  const [categoryFetching, setCategoryFetching] = useState(true);
  const [posts, setPosts] = useAppContext().state;
  const [postsQuery, setPostsQuery] = useAppContext().query;
  const [maxPages, setMaxPages] = useAppContext().maxpages;
  const [page, setPage] = useAppContext().page;
  const [perpage, setPerPage] = useAppContext().perpage;
  const [searchPhrase, setSearchPhrase] = useAppContext().phrase;
  const [categoryId, setCategoryId] = useAppContext().category;

  async function getCategoryId(name: string): Promise<void> {
    categoryFetching === false && setCategoryFetching(true);
    if (name !== "") {
      const data: { posts: object; maxPages: number } = await apiConnect(
        `https://bobowa24.pl/wp-json/wp/v2/categories/?slug=${name}`
      );
      if (data.posts[0] !== undefined) {
        setPage(DEFAULT_PAGE);
        setCategoryId(data.posts[0].id);
        setCategoryFetching(false);
      } else {
        setCategoryId(DEFAULT_CATEGORY);
        setCategoryFetching(false);
      }
    } else {
      setCategoryId(DEFAULT_CATEGORY);
      setCategoryFetching(false);
    }
  }

  useEffect(() => {
    if (query.page !== undefined && isReady) {
      updatePageParam(query.page);
      setRouterLoading(false);
    } else if (isReady) {
      updatePageParam(1);
      setRouterLoading(false);
    }
  }, [query.page]);

  function updatePageParam(value: any): void {
    setPage(value);
    if (dangerousData(categoryName) !== "undefined") {
      Router.push({
        pathname: `/category/${categoryName}/`,
        query: { page: encodeURI(value) },
      });
    } else {
      Router.push({
        pathname: `/`,
        query: { page: encodeURI(value) },
      });
    }
  }

  useEffect(() => {
    getCategoryId(dangerousData(categoryName || DEFAULT_CATEGORY));
  }, [categoryName]);

  useEffect(() => {
    scrollToTop();
    loadData();
  }, [page, perpage, searchPhrase, categoryFetching]);

  async function loadData(): Promise<void> {
    if (categoryFetching === false && routerLoading === false) {
      const baseLink: string = `https://bobowa24.pl/wp-json/wp/v2/posts/?per_page=${perpage}&page=${page}`;
      const linkPhrase: string = `&search=${searchPhrase}`;
      const linkCategory: string = `&categories=${categoryId}`;
      const link: string = `${baseLink}${
        searchPhrase !== "" ? linkPhrase : ""
      }${categoryId !== "" ? linkCategory : ""}`;
      if (postsQuery !== link) {
        let data: { posts: object; maxPages: number } = await apiConnect(link);
        setMaxPages(data.maxPages);
        setPosts(data.posts);
        setPostsQuery(link);
      }
    }
  }

  return (
    <>
      <div id={styles.postswrapper}>
        {posts ? (
          posts.map((data, index) => {
            return <Post data={data} key={index} />;
          })
        ) : (
          <Loader loading="posts" />
        )}
      </div>
      <div>
        {posts ? (
          <>
            <PostSearchBar
              setSearchPhrase={setSearchPhrase}
              updatePageParam={updatePageParam}
              defaultPage={DEFAULT_PAGE}
            />
            <PostPagination
              updatePageParam={updatePageParam}
              setPerPage={setPerPage}
              maxPages={maxPages}
              page={page}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
