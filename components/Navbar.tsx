import NavbarItem from "./NavbarItem";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import AccountMenu from "@/components/AccountMenu";
import Offcanvas from "@/components/Offcanvas";
import { useWindowSize } from "react-use";
import SearchInput from "@/components/SearchInput";
import useMountTransition from "@/hooks/useMountTransition";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Logo from "@/components/Logo";
import { useRouter } from "next/router";

const TOP_OFFSET = 66;

export default function Navbar() {
  const [showBackground, setShowBackground] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentPageState, setCurrentPageState] = useState("homePage");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const { data } = useCurrentUser();

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/search?query=${searchTerm}`);
    }
  };

  const hasTransitionedIn = useMountTransition({
    isMounted: categoryOpen,
    unmountDelay: 300,
  });

  const setCurrentPage = (page: string) => {
    setCurrentPageState(page);
    localStorage.setItem("currentPageHeader", page);
  };

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPageHeader");
    if (storedPage) {
      setCurrentPageState(storedPage);
    }
  }, []);

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
    <nav className={"w-full sticky top-0 z-30 "}>
      <div
        className={`px-4 md:px-16 py-6 flex items-center duration-500 ${showBackground ? " bg-zinc-900 bg-opacity-90" : ""} `}
      >
        <Logo />
        <div className={"ml-8 relative hidden lg:inline xl:hidden"}>
          <button
            type={"button"}
            onClick={() => setCategoryOpen(!categoryOpen)}
            onMouseEnter={handleMouseEnterCategory}
            onMouseLeave={handleMouseLeaveCategory}
            className={"flex items-center gap-3"}
          >
            <NavbarItem label={"Przeglądaj"} />
            <FaCaretDown
              className={`hidden lg:block text-white transition duration-300 ${categoryOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          {(hasTransitionedIn || categoryOpen) && (
            <div
              onMouseEnter={handleMouseEnterCategory}
              onMouseLeave={handleMouseLeaveCategory}
              className={`flex border border-neutral-600  absolute  text-nowrap flex-col text-center mt-4 bg-black bg-opacity-80 transition-all duration-300 " ${hasTransitionedIn && categoryOpen ? "opacity-100 " : "opacity-0 "} `}
              style={{ transitionBehavior: "allow-discrete" }}
            >
              <NavbarItem
                href={"/"}
                onClick={() => setCurrentPage("homePage")}
                currentPage={currentPageState === "homePage"}
                className={
                  " duration-500 p-4 bg-opacity-65 hover:bg-neutral-700"
                }
                label={"Strona główna"}
              />
              <NavbarItem
                href={"#"}
                onClick={() => setCurrentPage("seriesPage")}
                currentPage={currentPageState === "seriesPage"}
                className={
                  " duration-500 p-4 bg-opacity-65   hover:bg-neutral-700"
                }
                label={"Seriale"}
              />
              <NavbarItem
                href={"#"}
                onClick={() => setCurrentPage("moviesPage")}
                currentPage={currentPageState === "moviesPage"}
                className={
                  " duration-500 p-4 bg-opacity-65  hover:bg-neutral-700"
                }
                label={"Filmy"}
              />
              <NavbarItem
                href={"#"}
                onClick={() => setCurrentPage("newAndPopularPage")}
                currentPage={currentPageState === "newAndPopularPage"}
                className={
                  " duration-500 p-4 bg-opacity-65   hover:bg-neutral-700"
                }
                label={"Nowe i Popularne"}
              />
              <NavbarItem
                href={"/myList"}
                onClick={() => setCurrentPage("myListPage")}
                currentPage={currentPageState === "myListPage"}
                className={
                  " duration-500 p-4 bg-opacity-65   hover:bg-neutral-700"
                }
                label={"Moja lista"}
              />
            </div>
          )}
        </div>
        <div className={" ml-8 gap-7 hidden xl:flex text-nowrap"}>
          <NavbarItem
            onClick={() => setCurrentPage("homePage")}
            currentPage={currentPageState === "homePage"}
            href={"/"}
            label={"Strona główna"}
          />
          <NavbarItem
            onClick={() => setCurrentPage("seriesPage")}
            currentPage={currentPageState === "seriesPage"}
            href={"#"}
            label={"Seriale"}
          />
          <NavbarItem
            onClick={() => setCurrentPage("moviesPage")}
            currentPage={currentPageState === "moviesPage"}
            className={""}
            href={"#"}
            label={"Filmy"}
          />
          <NavbarItem
            className={""}
            onClick={() => setCurrentPage("newAndPopularPage")}
            currentPage={currentPageState === "newAndPopularPage"}
            href={"#"}
            label={"Nowe i Popularne"}
          />
          <NavbarItem
            className={""}
            onClick={() => setCurrentPage("myListPage")}
            currentPage={currentPageState === "myListPage"}
            href={"/myList"}
            label={"Moja lista"}
          />
        </div>
        <div className={"flex ml-auto gap-7 items-center relative"}>
          {width >= 1024 && <SearchInput />}
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
                className={`hidden lg:block text-white transition duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
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
            <div className={"text-sm"}>{data?.name}</div>
            <div className={"text-xs"}>Przełącz profile</div>
          </div>
        </div>
        <div className={"p-4"}>
          <form
            onSubmit={handleSearch}
            className={` flex text-gray-200 hover:text-gray-300    bg-black bg-opacity-60 border border-white p-2 `}
          >
            <button>
              <FaSearch />
            </button>
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`focus:transition-none outline-0 focus:ring-0 bg-transparent border-0 transition-all w-full px-2 ms-2 py-2" `}
              type="text"
              placeholder={"Wyszukaj...."}
            />
          </form>
        </div>
        <ul
          className={
            "font-semibold p-4 flex flex-col gap-3 border-b border-neutral-400 text-neutral-400"
          }
        >
          <li>
            <NavbarItem label={"Konto"} />
          </li>
          <li>
            <NavbarItem href={"/faqPage"} label={"Centrum Pomocy"} />
          </li>
          <li>
            <NavbarItem onClick={() => signOut()} label={"Wyloguj się"} />
          </li>
        </ul>
        <ul
          className={"font-semibold  p-4 flex flex-col gap-3 text-neutral-400"}
        >
          <li>
            <NavbarItem
              href={"/"}
              hoverOff
              className={
                currentPageState === "homePage"
                  ? "border-s-4 border-red-600 ps-3"
                  : ""
              }
              currentPage={currentPageState === "homePage"}
              onClick={() => setCurrentPage("homePage")}
              label={"Strona Główna"}
            />
          </li>
          <li>
            <NavbarItem
              href={"#"}
              hoverOff
              className={
                currentPageState === "seriesPage"
                  ? "border-s-4 border-red-600 ps-3"
                  : ""
              }
              currentPage={currentPageState === "seriesPage"}
              onClick={() => setCurrentPage("seriesPage")}
              label={"Seriale"}
            />
          </li>
          <li>
            <NavbarItem
              href={"#"}
              hoverOff
              className={
                currentPageState === "moviesPage"
                  ? "border-s-4 border-red-600 ps-3"
                  : ""
              }
              currentPage={currentPageState === "moviesPage"}
              onClick={() => setCurrentPage("moviesPage")}
              label={"Filmy"}
            />
          </li>
          <li>
            <NavbarItem
              href={"#"}
              hoverOff
              className={
                currentPageState === "newAndPopularPage"
                  ? "border-s-4 border-red-600 ps-3"
                  : ""
              }
              currentPage={currentPageState === "newAndPopularPage"}
              onClick={() => setCurrentPage("newAndPopularPage")}
              label={"Nowe i Popularne"}
            />
          </li>
          <li>
            <NavbarItem
              href={"/myList"}
              hoverOff
              className={
                currentPageState === "myListPage"
                  ? "border-s-4 border-red-600 ps-3"
                  : ""
              }
              currentPage={currentPageState === "myListPage"}
              onClick={() => setCurrentPage("myListPage")}
              label={"Moja lista"}
            />
          </li>
        </ul>
      </Offcanvas>
    </nav>
  );
}
