import NavbarItem from "./NavbarItem";
import { FaCaretDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import AccountMenu from "@/components/AccountMenu";
import Offcanvas from "@/components/Offcanvas";
import { useWindowSize } from "react-use";
import SearchInput from "@/components/SearchInput";
import ReactPortal from "@/components/ReactPortal";

const TOP_OFFSET = 66;

export default function Navbar() {
  const [showBackground, setShowBackground] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  useEffect(() => {
    const element = document.querySelector("#indexWrapper");
    const handleScroll = () => {
      if (element!.scrollTop >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    element!.addEventListener("scroll", handleScroll);

    return () => {
      element!.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(width >= 1024);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleMouseEnterCategory = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCategoryOpen(true);
  };

  const handleMouseLeaveCategory = () => {
    timeoutRef.current = setTimeout(() => {
      setCategoryOpen(false);
    }, 200);
  };

  const { width } = useWindowSize();

  return (
    <nav className={"w-full sticky top-0 z-30  "}>
      <div
        className={`px-4 md:px-16 py-6 flex items-center duration-500 ${showBackground ? " bg-zinc-900 bg-opacity-90" : ""} `}
      >
        <img
          className={"h-6 lg:h-10 cursor-pointer"}
          src="/images/logo.png"
          alt="logo"
        />
        <div className={"ml-8 relative hidden lg:inline xl:hidden"}>
          <button
            type={"button"}
            onClick={() => setCategoryOpen(!categoryOpen)}
            onMouseEnter={handleMouseEnterCategory}
            onMouseLeave={handleMouseLeaveCategory}
            className={"flex items-center gap-3"}
          >
            <NavbarItem href={"#"} label={"Przeglądaj"} />
            <FaCaretDown
              className={`hidden lg:block text-white transition ${categoryOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          <div
            onMouseEnter={handleMouseEnterCategory}
            onMouseLeave={handleMouseLeaveCategory}
            className={`border border-neutral-600  absolute  text-nowrap flex-col text-center mt-4 bg-black bg-opacity-60 transition-all duration-300 " ${categoryOpen ? "opacity-100 flex" : "opacity-0 hidden"} `}
            style={{ transitionBehavior: "allow-discrete" }}
          >
            <NavbarItem
              href={"#"}
              className={"duration-500 p-4 bg-opacity-65 hover:bg-neutral-700"}
              label={"Strona główna"}
            />
            <NavbarItem
              href={"#"}
              className={
                "duration-500 p-4 bg-opacity-65   hover:bg-neutral-700"
              }
              label={"Seriale"}
            />
            <NavbarItem
              href={"#"}
              className={"duration-500 p-4 bg-opacity-65  hover:bg-neutral-700"}
              label={"Filmy"}
            />
            <NavbarItem
              href={"#"}
              className={
                "duration-500 p-4 bg-opacity-65   hover:bg-neutral-700"
              }
              label={"Nowe i Popularne"}
            />
            <NavbarItem
              href={"#"}
              className={
                "duration-500 p-4 bg-opacity-65   hover:bg-neutral-700"
              }
              label={"Moja lista"}
            />
          </div>
        </div>
        <div className={" ml-8 gap-7 hidden xl:flex text-nowrap"}>
          <NavbarItem href={"#"} label={"Strona główna"} />
          <NavbarItem href={"#"} label={"Seriale"} />
          <NavbarItem href={"#"} label={"Filmy"} />
          <NavbarItem href={"#"} label={"Nowe i Popularne"} />
          <NavbarItem href={"#"} label={"Moja lista"} />
        </div>
        <div className={"flex ml-auto gap-7 items-center relative"}>
          <SearchInput />
          <div className={"flex items-center gap-2  relative"}>
            <button
              className={"flex items-center gap-3"}
              type={"button"}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={
                width >= 1024
                  ? () => setIsOpen(!isOpen)
                  : () => setShowOffcanvas(true)
              }
            >
              <div
                className={"w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden"}
              >
                <img src="/images/default-blue.png" alt="profile" />
              </div>
              <FaCaretDown
                className={`hidden lg:block text-white transition ${isOpen ? "rotate-180" : "rotate-0"}`}
              />
            </button>
            <AccountMenu
              isOpen={isOpen}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </div>
      <ReactPortal>
        <Offcanvas
          className={"bg-black text-white "}
          isOpen={showOffcanvas}
          handleClose={handleCloseOffcanvas}
        >
          <div className="p-4 flex items-center justify-between   text-base  text-neutral-400 ">
            Menu
            <button type={"button"} onClick={handleCloseOffcanvas}>
              <IoClose />
            </button>
          </div>
          <div className={" flex items-center gap-3 p-4 "}>
            <img
              className={"w-9 h-9  rounded-md"}
              src="/images/default-blue.png"
              alt="profile"
            />
            <div>
              <div className={"text-sm"}>Username</div>
              <div className={"text-xs"}>Przełącz profile</div>
            </div>
          </div>
          <ul
            className={
              "font-semibold p-4 flex flex-col gap-3 border-b border-neutral-400 text-neutral-400"
            }
          >
            <li>Konto</li>
            <li>Centrum pomocy</li>
            <li>Wyloguj się</li>
          </ul>
          <ul
            className={
              "font-semibold  p-4 flex flex-col gap-3 text-neutral-400"
            }
          >
            <li>Strona główna</li>
            <li>Seriale</li>
            <li>Filmy</li>
            <li>Nowe i Popularne</li>
            <li>Moja lista</li>
          </ul>
        </Offcanvas>
      </ReactPortal>
    </nav>
  );
}
