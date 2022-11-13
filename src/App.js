import { Fragment } from "react";
import SearchForm from "./components/SearchForm.js";
import Stories from "./components/Stories";
import Buttons from "./components/Buttons.js";
function App() {
  return (
    <Fragment>
      <SearchForm />
      <Buttons />
      <Stories />
    </Fragment>
  );
}

export default App;
