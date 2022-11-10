import { createContext, useContext, useEffect, useState } from "react";
const DEFAULT_PER_PAGE = 8;
const DEFAULT_PAGE = 1;
const DEFAULT_SEARCH = "";
const DEFAULT_CATEGORY = "";

const Context = createContext();

export function AppContext({ children }) {
  let [sharedState, updateSharedState] = useState();
  let [sharedQuery, updateSharedQuery] = useState();
  let [sharedMaxPages, updateSharedMaxPages] = useState();
  let [sharedPage, updateSharedPage] = useState(DEFAULT_PAGE);
  let [sharedPerPage, updateSharedPerPage] = useState(DEFAULT_PER_PAGE);
  let [sharedSearchPhrase, updateSharedSearchPhrase] = useState(DEFAULT_SEARCH);
  let [sharedCategory, updateSharedCategory] = useState(DEFAULT_CATEGORY);

  // useEffect(() => {
  //   console.log("");
  //   console.log("state: ", sharedState);
  //   console.log("query: ", sharedQuery);
  //   console.log("maxPages: ", sharedMaxPages);
  //   console.log("Page: ", sharedPage);
  //   console.log("PerPage: ", sharedPerPage);
  //   console.log("Search: ", sharedSearchPhrase);
  //   console.log("Category: ", sharedCategory);
  // }, [
  //   sharedState,
  //   sharedQuery,
  //   sharedMaxPages,
  //   sharedPage,
  //   sharedPerPage,
  //   sharedSearchPhrase,
  //   sharedCategory,
  // ]);

  return (
    <Context.Provider
      value={[
        sharedState,
        updateSharedState,
        sharedQuery,
        updateSharedQuery,
        sharedMaxPages,
        updateSharedMaxPages,
        sharedPage,
        updateSharedPage,
        sharedPerPage,
        updateSharedPerPage,
        sharedSearchPhrase,
        updateSharedSearchPhrase,
        sharedCategory,
        updateSharedCategory,
      ]}
    >
      {children}
    </Context.Provider>
  );
}

export function useAppContext() {
  return useContext(Context);
}
