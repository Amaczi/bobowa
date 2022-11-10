// React & style imports
import React, { useEffect, useState } from "react";
import styles from "./postswrapper.module.css";

// Next.js imports
import Router, { useRouter } from "next/router";

// Component and other imports
import Post from "../Post/Post";
import PostPagination from "../PostPagination/PostPagination";
import PostSearchBar from "../PostSearchBar/PostSearchBar";
import Loader from "../Loader/Loader";
import { dangerousData, scrollToTop } from "../../utils/basic";
import { apiConnect } from "../../api/basic";
import { useAppContext } from "../../../files/context/basic";

// Defaults
const DEFAULT_PAGE = 1;
const DEFAULT_CATEGORY = "";

export default function PostsWrapper({ categoryName }) {
  const { query, isReady } = useRouter();
  const [routerLoading, setRouterLoading] = useState(true);
  const [
    posts,
    setPosts,
    postsQuery,
    setPostsQuery,
    maxPages,
    setMaxPages,
    page,
    setPage,
    perpage,
    setPerPage,
    searchPhrase,
    setSearchPhrase,
    categoryId,
    setCategoryId,
  ] = useAppContext();
  const [categoryFetching, setCategoryFetching] = useState(true);

  async function getCategoryId(name) {
    categoryFetching === false && setCategoryFetching(true);
    if (name !== "") {
      const data = await apiConnect(
        `https://bobowa24.pl/wp-json/wp/v2/categories/?slug=${name}`
      );
      if (data.posts[0] !== undefined) {
        setCategoryId(data.posts[0].id);
        setPage(DEFAULT_PAGE);
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

  function updatePageParam(value) {
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
    loadData();
    scrollToTop();
  }, [page, perpage, searchPhrase, categoryFetching]);

  async function loadData() {
    if (categoryFetching === false && routerLoading === false) {
      const baseLink = `https://bobowa24.pl/wp-json/wp/v2/posts/?per_page=${perpage}&page=${page}`;
      const linkPhrase = `&search=${searchPhrase}`;
      const linkCategory = `&categories=${categoryId}`;
      const link = `${baseLink}${searchPhrase !== "" ? linkPhrase : ""}${
        categoryId !== "" ? linkCategory : ""
      }`;
      if (postsQuery !== link) {
        let data = await apiConnect(link);
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
