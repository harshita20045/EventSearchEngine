import React, { useState } from "react";
import "../styles/SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // ✅ Handle search input change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // ✅ Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // Pass query to parent component
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search events..."
        value={query}
        onChange={handleChange}
      />
      <button type="submit">🔍</button>
    </form>
  );
}
