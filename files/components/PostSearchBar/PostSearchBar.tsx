// React & Styles imports
import React, { useRef } from "react";
import styles from "./postsearchbar.module.css";
import { MagnifyingGlass } from "phosphor-react";

// Interfaces
interface FunctionsProps {
  setSearchPhrase: Function;
  updatePageParam: Function;
  defaultPage: number;
}

interface PhraseRefProps {
  current: {
    value: string;
  };
}

interface PaginationProps {
  selected?: number;
  preventDefault?: Function;
}

export default function PostSearchBar({
  setSearchPhrase,
  updatePageParam,
  defaultPage,
}: FunctionsProps): JSX.Element {
  const phraseRef: PhraseRefProps = useRef();

  const setSearchByPhrase = (e: PaginationProps): void => {
    e.preventDefault();
    updatePageParam(defaultPage);
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
          <MagnifyingGlass size={32} color="#424242" weight="light" />
        </button>
      </form>
    </div>
  );
}
