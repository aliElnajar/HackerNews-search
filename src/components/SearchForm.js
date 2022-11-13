import React, { useContext } from "react";
import Context from "../Store/Context";
const SearchForm = () => {
  const { searchHandler, query } = useContext(Context);

  const changeHandler = (e) => {
    searchHandler(e.target.value);
  };
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Search in hacker news:</h2>
      <input
        type="text"
        className="form-input"
        placeholder="search here"
        onChange={changeHandler}
        value={query}
      />
    </form>
  );
};
export default SearchForm;
