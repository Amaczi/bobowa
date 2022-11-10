// React imports
import { createContext, useContext, useState } from "react";

// Next.js
const Context = createContext();

// Defaults
const DEFAULT_PER_PAGE = 8;
const DEFAULT_PAGE = 1;
const DEFAULT_SEARCH = "";
const DEFAULT_CATEGORY = "";

export function AppContext({ children }) {
  let [sharedState, updateSharedState] = useState();
  let [sharedQuery, updateSharedQuery] = useState();
  let [sharedMaxPages, updateSharedMaxPages] = useState();
  let [sharedPage, updateSharedPage] = useState(DEFAULT_PAGE);
  let [sharedPerPage, updateSharedPerPage] = useState(DEFAULT_PER_PAGE);
  let [sharedSearchPhrase, updateSharedSearchPhrase] = useState(DEFAULT_SEARCH);
  let [sharedCategory, updateSharedCategory] = useState(DEFAULT_CATEGORY);

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
