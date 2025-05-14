import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoOptions } from "react-icons/io5";
import { useState, useEffect } from "react";

const SearchBar = ({ value, onChange, disabled }) => {
  return (
    <div className="border-8 border-[#152d53] mb-3 rounded-md">
      <div className="flex items-center border-10 border-[#152d53]">
        <div className="relative flex-grow">
          <input
            className="py-2 pl-10 pr-4 w-full"
            type="text"
            placeholder="Búsqueda"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
          <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
