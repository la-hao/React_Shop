import React, { useState } from "react";

function SearchBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search?name=${name}`);
  };
  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
