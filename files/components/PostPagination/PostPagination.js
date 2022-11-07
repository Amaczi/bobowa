// React & style imports
import React, { useRef } from "react";
import styles from "./postpagination.module.css";
import ReactPaginate from "react-paginate";

export default function PostPagination({
  setPage,
  setPerPage,
  page,
  maxPages,
}) {
  const pageNumber = useRef();

  const updatePage = (e) => {
    if (e.selected !== undefined) {
      setPage(e.selected + 1);
    } else {
      e.preventDefault();
      pageNumber.current.value !== "" && setPage(pageNumber.current.value);
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
          <option value="6">Wyświetl na stronie: 6</option>
          <option value="12">Wyświetl na stronie: 12</option>
          <option value="20">Wyświetl na stronie: 20</option>
        </select>
        <form
          onSubmit={(e) => {
            updatePage(e);
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
            <i className="ph-magnifying-glass-light"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
