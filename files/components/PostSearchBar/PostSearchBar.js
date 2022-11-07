// React & style imports
import React, { useRef } from "react";
import styles from "./postsearchbar.module.css";

export default function PostSearchBar({
  setSearchPhrase,
  setPage,
  defaultPage,
}) {
  const phraseRef = useRef();

  const setSearchByPhrase = (e) => {
    e.preventDefault();
    setPage(defaultPage);
    setSearchPhrase(phraseRef.current.value);
  };

  return (
    <div id={styles.post_searchbar_wrapper}>
      <form onSubmit={(e) => setSearchByPhrase(e)}>
        <input
          type="text"
          placeholder="Wpisz wyszukiwaną frazę..."
          ref={phraseRef}
        ></input>
        <button>
          <i className="ph-magnifying-glass-light"></i>
        </button>
      </form>
    </div>
  );
}
