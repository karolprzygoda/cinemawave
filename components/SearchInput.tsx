import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

export default function SearchInput() {
  const [clicked, setClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleClick = () => {
    setClicked(!clicked);
    timeoutRef.current = setTimeout(() => {
      if (!clicked && inputRef.current) {
        inputRef.current.focus();
      }
    }, 200);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/search?query=${searchTerm}`);
    }
  };

  return (
    <form
      className={`flex text-gray-200 hover:text-gray-300 ${clicked ? "bg-black bg-opacity-60 border border-white ps-2" : "bg-transparent"}`}
      onSubmit={handleSearch}
    >
      <button type="button" onClick={handleClick}>
        <FaSearch />
      </button>
      <input
        onBlur={handleClick}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        ref={inputRef}
        className={`focus:transition-none outline-0 focus:ring-0 bg-transparent border-0 transition-all ${clicked ? "w-60 px-2 ms-2 py-1" : "w-0 p-0"}`}
        type="text"
        placeholder="Wyszukaj...."
      />
    </form>
  );
}
