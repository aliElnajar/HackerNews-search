import React, { useContext } from "react";
import Context from "../Store/Context";
const Buttons = () => {
  const { pageHandler, nOfPages, page, isLoading } = useContext(Context);

  return (
    <div className="btn-container">
      <button
        disabled={isLoading}
        className="btn"
        onClick={() => pageHandler("sub")}
      >
        Prev
      </button>
      <h3>
        {page + 1}/{nOfPages}
      </h3>
      <button
        disabled={isLoading}
        className="btn"
        onClick={() => pageHandler("add")}
      >
        next
      </button>
    </div>
  );
};

export default Buttons;
