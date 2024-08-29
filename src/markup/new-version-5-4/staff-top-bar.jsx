import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

const StaffTopBar = ({ handleSubmit, text }) => {

  const [searchText, setSearchText] = useState(text);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchText);
  }

  return (
    <div className="staff-top-bar">
      <form role="search" onSubmit={onSubmit}>
        <div className="input-group">
          <input
            name="text"
            className="form-control"
            placeholder="Type to Search..."
            type="text"
            value={searchText}
            onChange={(event) => {
              event.preventDefault();
              setSearchText(event.target.value);
            }}
          />
          <span className="n">
            <button type="submit" className="btn">
              <i className="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default StaffTopBar;
