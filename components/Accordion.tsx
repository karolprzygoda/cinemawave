import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { FaChevronDown } from "react-icons/fa6";

type AccordionContextType = {
  selected: number | null | undefined;
  setSelected: (value: number | null | undefined) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);

export default function Accordion({
  children,
  value,
  onChange,
  ...props
}: {
  children: ReactNode;
  onChange?: any;
  value?: number;
}) {
  const [selected, setSelected] = useState<number | null | undefined>(value);

  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]);

  return (
    <ul {...props}>
      <AccordionContext.Provider value={{ selected, setSelected }}>
        {children}
      </AccordionContext.Provider>
    </ul>
  );
}

function Item({
  children,
  value,
  trigger,
  isLast,
  ...props
}: {
  children: ReactNode;
  value: number;
  trigger: string;
  isLast?: boolean;
} & React.HTMLAttributes<HTMLLIElement>) {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("AccordionItem musi być użyty wewnątrz Accordion");
  }

  const { selected, setSelected } = context;
  const open = selected === value;

  const ref = useRef<HTMLDivElement>(null);

  return (
    <li
      className={`${isLast ? "" : "border-b border-neutral-800"} `}
      {...props}
    >
      <header
        role="button"
        onClick={() => setSelected(open ? null : value)}
        className="ms-2 flex justify-between items-center  py-3 "
      >
        {trigger}
        <FaChevronDown
          size={16}
          className={`transition-transform me-3 ${open ? "rotate-180" : ""}`}
        />
      </header>
      <div
        className="overflow-y-hidden transition-all"
        style={{ height: open ? ref.current?.offsetHeight || 0 : 0 }}
      >
        <div className="px-2 pb-4 pt-1" ref={ref}>
          {children}
        </div>
      </div>
    </li>
  );
}

Accordion.Item = Item;
