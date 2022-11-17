// React & Styles imports
import { createContext, useContext, useState } from "react";

// Defaults
const DEFAULT_PER_PAGE: number = 8;
const DEFAULT_PAGE: number = 1;
const DEFAULT_SEARCH: string = "";
const DEFAULT_CATEGORY: string = "";

// Interfaces
interface ContextProps {
  state: any;
  query: any;
  maxpages: any;
  page: any;
  perpage: any;
  phrase: any;
  category: any;
}

const Context = createContext<ContextProps>(null);

export function AppContext({ children }): JSX.Element {
  let [sharedState, updateSharedState] = useState();
  let [sharedQuery, updateSharedQuery] = useState();
  let [sharedMaxPages, updateSharedMaxPages] = useState();
  let [sharedPage, updateSharedPage] = useState(DEFAULT_PAGE);
  let [sharedPerPage, updateSharedPerPage] = useState(DEFAULT_PER_PAGE);
  let [sharedSearchPhrase, updateSharedSearchPhrase] = useState(DEFAULT_SEARCH);
  let [sharedCategory, updateSharedCategory] = useState(DEFAULT_CATEGORY);

  return (
    <Context.Provider
      value={{
        state: [sharedState, updateSharedState],
        query: [sharedQuery, updateSharedQuery],
        maxpages: [sharedMaxPages, updateSharedMaxPages],
        page: [sharedPage, updateSharedPage],
        perpage: [sharedPerPage, updateSharedPerPage],
        phrase: [sharedSearchPhrase, updateSharedSearchPhrase],
        category: [sharedCategory, updateSharedCategory],
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAppContext(): ContextProps {
  return useContext(Context);
}
