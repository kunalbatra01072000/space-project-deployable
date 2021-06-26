import React, { useState } from "react";

const Search = ({ Setalert, Searchnasaimg }) => {
  const [text, settext] = useState("");

  const updatetext = (e) => {
    settext(e.target.value);
  };

  const submitform = (e) => {
    e.preventDefault();
    if (text === "") {
      Setalert("Please enter something");
    } else {
      Searchnasaimg(text);
      settext("");
    }
  };

  return (
    <form onSubmit={submitform}>
      <input
        type="text"
        onChange={updatetext}
        placeholder="Search..."
        value={text}
        name="text"
        style={{ fontSize: "1.5rem" }}
      ></input>
      <input
        type="submit"
        value="Lets Go!"
        className="btn btn-dark btn-block"
        style={{ fontSize: "1.5rem" }}
      ></input>
    </form>
  );
};

export default Search;
