// React & Styles imports
import React, { useRef } from "react";
import styles from "./postpagination.module.css";
import ReactPaginate from "react-paginate";
import { MagnifyingGlass } from "phosphor-react";

// Interfaces
interface FunctionsProps {
  updatePageParam: Function;
  setPerPage: Function;
  page: number;
  maxPages: number;
}

interface PaginationProps {
  selected?: number;
  preventDefault?: Function;
}

export default function PostPagination({
  updatePageParam,
  setPerPage,
  page,
  maxPages,
}: FunctionsProps): JSX.Element {
  const pageNumber = useRef<HTMLInputElement>();

  const updatePage = (e: PaginationProps): void => {
    if (e.selected !== undefined) {
      updatePageParam(e.selected + 1);
    } else {
      e.preventDefault();
      pageNumber.current.value !== "" &&
        updatePageParam(pageNumber.current.value);
    }
  };

  return (
    <div id={styles.post_pagination_wrapper}>
      <div id={styles.post_pagination}>
        <ReactPaginate
          nextLabel=">"
          previousLabel="<"
          onPageChange={(e) => updatePage(e)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={Math.ceil(maxPages) || Math.ceil(page)}
          forcePage={Math.ceil(page - 1)}
          breakLabel="..."
          activeClassName={styles.post_pagination_current}
          renderOnZeroPageCount={null}
        />
      </div>
      <div id={styles.post_pagination_options}>
        <select onChange={(e) => setPerPage(e.target.value)}>
          <option value="8">Wyświetl na stronie: 8</option>
          <option value="16">Wyświetl na stronie: 16</option>
          <option value="24">Wyświetl na stronie: 24</option>
        </select>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updatePageParam(pageNumber.current.value);
          }}
        >
          <input
            type="number"
            placeholder="Wpisz numer strony..."
            min="1"
            max={maxPages}
            ref={pageNumber}
          ></input>
          <button>
            <MagnifyingGlass size={32} color="#424242" weight="light" />
          </button>
        </form>
      </div>
    </div>
  );
}
