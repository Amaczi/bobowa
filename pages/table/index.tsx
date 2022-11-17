// React & Styles imports
import React, { useEffect } from "react";
import styles from "./table.module.css";
import { format } from "date-fns";

// Next.js imports
import Link from "next/link";

// Components & Other imports
import { useTable } from "react-table";
import { useAppContext } from "../../files/context/basic";
import { apiConnect } from "../../files/api/basic";
import Navbar from "../../files/components/Navbar/Navbar";
import Loader from "../../files/components/Loader/Loader";

function Table({ columns, data }) {
  if (data !== undefined) {
    console.log(columns);
  }
}

export default function table() {
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
  async function loadData() {
    const baseLink = `https://bobowa24.pl/wp-json/wp/v2/posts/?per_page=${perpage}&page=${page}`;
    if (postsQuery !== "undefined") {
      let data = await apiConnect(baseLink);
      setPosts(data.posts);
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];

  return (
    <>
      <Navbar />
      <Table data={posts} columns={columns} />
    </>
  );
}
