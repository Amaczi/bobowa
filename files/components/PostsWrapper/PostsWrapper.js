// React & style imports
import React, { useEffect, useState } from "react";
import styles from "./postswrapper.module.css";

// Component and other imports
import Post from "../Post/Post";
import PostPagination from "../PostPagination/PostPagination";
import PostSearchBar from "../PostSearchBar/PostSearchBar";
import Loader from "../Loader/Loader";
import { dangerousData, scrollToTop } from "../../utils/basic";
import { apiConnect } from "../../api/basic";

// Defaults
const DEFAULT_PER_PAGE = 8;
const DEFAULT_PAGE = 1;
const DEFAULT_SEARCH = "";
const DEFAULT_CATEGORY = "";

export default function PostsWrapper({ categoryName }) {
  const [posts, setPosts] = useState();
  const [maxPages, setMaxPages] = useState();
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [perpage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [searchPhrase, setSearchPhrase] = useState(DEFAULT_SEARCH);
  const [categoryId, setCategoryId] = useState("");

  async function getCategoryId(name) {
    if (name !== "undefined") {
      const data = await apiConnect(
        `https://bobowa24.pl/wp-json/wp/v2/categories/?slug=${name}`
      );
      setCategoryId(data.posts[0].id);
    }
  }

  useEffect(() => {
    getCategoryId(dangerousData(categoryName || DEFAULT_CATEGORY));
    loadData();
    scrollToTop();
  }, [page, perpage, searchPhrase, categoryName, categoryId]);

  async function loadData() {
    const link = `https://bobowa24.pl/wp-json/wp/v2/posts/?per_page=${perpage}&page=${page}`;
    let data = await apiConnect(
      categoryId !== ""
        ? `${link}&search=${searchPhrase}&categories=${categoryId}`
        : `${link}&search=${searchPhrase}`
    );
    setMaxPages(data.maxPages);
    setPosts(data.posts);
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
              setPage={setPage}
              defaultPage={DEFAULT_PAGE}
            />
            <PostPagination
              setPage={setPage}
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
