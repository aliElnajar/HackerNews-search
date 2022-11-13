import React, { useReducer, useEffect, children } from "react";
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const Context = React.createContext();
const initialState = {
  isLoading: false,
  hits: [],
  query: "react",
  page: 0,
  nOfPages: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };
    case "SET_HITS":
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nOfPages: action.payload.pages,
      };
    case "REMOVE_STORY":
      const filteredHits = state.hits.filter(
        (hits) => hits.objectID !== action.payload
      );
      return {
        ...state,
        hits: filteredHits,
      };
    case "SEARCH_HANDLING":
      return { ...state, query: action.payload, page: 0 };
    case "NEXT_PAGE":
      return { ...state, page: state.page + 1 };
    case "PREV_PAGE":
      return { ...state, page: state.page - 1 };
    case "PAGE_LAST":
      return { ...state, page: state.nOfPages - 1 };
    case "PAGE_FIRST":
      return { ...state, page: 0 };
    default:
      throw new Error("Something went wrong");
  }
};
export const ContextProvider = ({ children }) => {
  const [state, stateDispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    stateDispatch({ type: "SET_LOADING" });
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("failed to fetch");
      const data = await response.json();
      stateDispatch({
        type: "SET_HITS",
        payload: { hits: data.hits, pages: data.nbPages },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeStoryHandler = (id) => {
    stateDispatch({ type: "REMOVE_STORY", payload: id });
  };

  const searchHandler = (e) => {
    stateDispatch({ type: "SEARCH_HANDLING", payload: e });
  };

  const pageHandler = (event) => {
    if (event === "add") {
      if (state.page >= state.nOfPages - 1)
        return stateDispatch({ type: "PAGE_FIRST" });
      else {
        stateDispatch({ type: "NEXT_PAGE" });
      }
    } else {
      if (state.page <= 0) return stateDispatch({ type: "PAGE_LAST" });
      else {
        stateDispatch({ type: "PREV_PAGE" });
      }
    }
  };

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);
  return (
    <Context.Provider
      value={{ ...state, removeStoryHandler, searchHandler, pageHandler }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
