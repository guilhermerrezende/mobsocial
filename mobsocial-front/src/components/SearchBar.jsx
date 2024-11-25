import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-md p-3 mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite sua pesquisa..."
        className="flex-grow px-4 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none focus:ring-0"
      />
      <button
        onClick={handleSearch}
        className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
      >
        <FaSearch className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SearchBar;
