import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [formValue, setFormValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleChange = e => {
    setFormValue(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    let result = await axios.get(`/api/questionset?name=${formValue}`);
    console.log(result.data);
    setLoading(false);

    setSearchResult(result.data);
  };

  const renderResult = () => {
    if (searchResult.length > 0 && searchResult[0].name) {
      return searchResult.map(e => {
        return (
          <Link to={`/questionset/${e._id}`}>
            <div className="card p-1">{e.name}</div>
          </Link>
        );
      });
    }
  };

  return (
    <form className="mb-5" onSubmit={handleSubmit}>
      <div class="input-group ">
        <input
          type="text"
          className="form-control bg-light border-0 "
          placeholder="Search for..."
          onChange={handleChange}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            type="button"
          >
            <i className="fas fa-search fa-sm"></i>
          </button>
        </div>
      </div>
      {isLoading && <div>searching ...</div>}
      {renderResult()}
    </form>
  );
};

export default SearchBar;
