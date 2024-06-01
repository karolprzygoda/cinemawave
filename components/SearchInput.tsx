import { FaSearch } from "react-icons/fa";
import { useRef, useState } from "react";

export default function SearchInput() {
  const [clicked, setClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    setClicked(!clicked);
    timeoutRef.current = setTimeout(() => {
      if (!clicked && inputRef.current) {
        inputRef.current.focus();
      }
    }, 200);
  };

  return (
    <div
      className={` flex text-gray-200 hover:text-gray-300   ${clicked ? " bg-black bg-opacity-60 border border-white ps-2" : "bg-transparent "} `}
    >
      <button onClick={handleClick}>
        <FaSearch />
      </button>
      <input
        onBlur={handleClick}
        ref={inputRef}
        className={`focus:transition-none outline-0 focus:ring-0 bg-transparent border-0 transition-all ${clicked ? "max-[1400px]:w-32 w-60 px-2 ms-2 py-1" : "w-0  p-0"}`}
        type="text"
        placeholder={"Wyszukaj...."}
      />
    </div>
  );
}
