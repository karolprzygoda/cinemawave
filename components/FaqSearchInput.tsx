import { FaSearch } from "react-icons/fa";
import { ChangeEventHandler } from "react";

export default function FaqSearchInput({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: ChangeEventHandler;
}) {
  return (
    <div
      className={` flex  input-border   relative rounded max-w-[600px] mx-auto p-[2px]`}
    >
      <button
        className={"absolute top-1/2  transform  -translate-y-1/2 left-5"}
      >
        <FaSearch size={20} className={"text-white"} />
      </button>
      <input
        id={id}
        value={value}
        onChange={onChange}
        className={`rounded w-full outline-0 focus:ring-0  border-0 py-3 pe-4 ps-14 bg-[#4c4948] text-white placeholder-neutral-300`}
        type="text"
        placeholder={"Wpisz pytanie, temat lub problem"}
        aria-label={"Wpisz pytanie, temat lub problem"}
      />
    </div>
  );
}
