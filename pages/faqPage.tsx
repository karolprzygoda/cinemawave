import Accordion from "@/components/Accordion";
import Link from "next/link";
import { FaArrowDown, FaRegEnvelope } from "react-icons/fa6";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  LuMegaphone,
  LuMonitorSmartphone,
  LuUser2,
  LuWrench,
} from "react-icons/lu";
import { IoRocketOutline } from "react-icons/io5";
import {
  MdLockOutline,
  MdOutlineCancel,
  MdOutlinePayment,
} from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Footer from "@/components/Footer";
import FaqSearchInput from "@/components/FaqSearchInput";
import Logo from "@/components/Logo";

export default function FaqPage() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [showHeader, setShowHeader] = useState(false);
  const [value, setValue] = useState("");

  const checkVisibility = useCallback(() => {
    const element = document.getElementById("heroSearchInput");
    const rect = element!.getBoundingClientRect();
    const viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight,
    );
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }, []);

  const handleScroll = useCallback(() => {
    if (!checkVisibility()) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  }, [checkVisibility]);

  useEffect(() => {
    const element = document.querySelector("#indexWrapper");

    element!.addEventListener("scroll", handleScroll);
    return () => {
      element!.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const executeScroll = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div
      className={"w-screen h-screen  overflow-x-auto bg-[#121212]"}
      id={"indexWrapper"}
    >
      <div className={"min-w-[280px] "}>
        {showHeader && (
          <div
            className={
              "search-input-wrapper w-full py-6 border-b border-neutral-800 sticky top-0 bg-[#121212] px-3 z-[999]"
            }
          >
            <FaqSearchInput
              id={"searchInput"}
              value={value}
              onChange={handleChange}
            />
          </div>
        )}
        <div
          className={"w-full bg-[181414] px-4 md:px-16 py-6 flex items-center"}
        >
          <Logo className={"border-e border-neutral-500"} />
          <h2 className={"text-white font-bold text-md sm:text-xl ms-6"}>
            Centrum Pomocy
          </h2>
        </div>
        <div className={"h-full w-full bg-custom-radial "}>
          <div
            className={
              "mb-12 flex flex-col justify-center h-[600px] md:h-[795px]"
            }
          >
            <section className={"py-12 px-3 flex flex-1 flex-col w-full"}>
              <div className={"w-full  max-w-[600px] m-auto"}>
                <h1
                  className={
                    " mb-6 font-bold text-[40px] text-white text-center"
                  }
                >
                  Jak możemy Ci pomóc?
                </h1>
                <FaqSearchInput
                  id={"heroSearchInput"}
                  value={value}
                  onChange={handleChange}
                />
                <div className={"text-center text-neutral-300 mt-6"}>
                  <span className={"font-semibold"}>Polecane dla Ciebie:</span>
                  &nbsp;
                  <Link className={"underline"} href={"#"}>
                    Jak zabezpieczyć konto w serwisie Cinemawave,
                  </Link>
                  &nbsp;
                  <Link className={"underline"} href={"#"}>
                    Kontrola rodzicielska w serwisie Cinemawave,
                  </Link>
                  &nbsp;
                  <Link className={"underline"} href={"#"}>
                    Jak zmienić plan
                  </Link>
                </div>
              </div>
            </section>
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={executeScroll}
              className={
                "transition  text-white font-semibold mx-auto mb-3 flex flex-col items-center hover:underline  cursor-pointer"
              }
            >
              <a className={"mb-3 "}>Przeglądaj tematy</a>
              <FaArrowDown
                className={isHovered ? "animate-arrow" : ""}
                size={20}
              />
            </div>
          </div>
          <section
            className={
              "max-w-[600px] mx-auto px-2 font-semibold text-white mb-14"
            }
          >
            <div
              ref={ref}
              className={
                "rounded-[8px] border border-neutral-800 mb-4 px-3 pt-3 flex flex-col mt-16"
              }
            >
              <div
                className={
                  "flex  items-center  pt-2 pb-5 border-b border-neutral-800 text-xl"
                }
              >
                <LuUser2 size={24} className={"text-[#ff7470] ms-[4px] me-4"} />
                Konto i rozliczenia
              </div>
              <Accordion>
                <Accordion.Item value={1} trigger={"Ustawienia konta"}>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aut beatae debitis distinctio earum incidunt ipsa labore
                    laboriosam libero nobis perspiciatis porro possimus
                    reiciendis rem sunt totam ut vero, voluptatum?
                  </div>
                  <div>
                    Consectetur consequuntur deserunt dolore expedita laborum
                    officia, quaerat reiciendis soluta vel voluptas! Alias,
                    aliquam aspernatur cumque debitis dolore, error esse, maxime
                    neque nesciunt numquam odit perspiciatis provident similique
                    sint voluptatibus.
                  </div>
                </Accordion.Item>
                <Accordion.Item
                  isLast
                  value={2}
                  trigger={"Opłaty za korzystanie z serwisu Cinemawave"}
                >
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aut beatae debitis distinctio earum incidunt ipsa labore
                    laboriosam libero nobis perspiciatis porro possimus
                    reiciendis rem sunt totam ut vero, voluptatum?
                  </div>
                  <div>
                    Consectetur consequuntur deserunt dolore expedita laborum
                    officia, quaerat reiciendis soluta vel voluptas! Alias,
                    aliquam aspernatur cumque debitis dolore, error esse, maxime
                    neque nesciunt numquam odit perspiciatis provident similique
                    sint voluptatibus.
                  </div>
                </Accordion.Item>
              </Accordion>
            </div>
            <div
              className={
                "rounded-[8px] border border-neutral-800 mb-4 px-3 pt-3 flex flex-col "
              }
            >
              <div
                className={
                  "flex  items-center  pt-2 pb-5 border-b border-neutral-800 text-xl"
                }
              >
                <LuWrench
                  size={24}
                  className={"text-[#ff6e95] ms-[4px] me-4"}
                />
                Rozwiązywanie problemów
              </div>
              <Accordion>
                <Accordion.Item value={1} trigger={"Problemy z kontem"}>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aut beatae debitis distinctio earum incidunt ipsa labore
                    laboriosam libero nobis perspiciatis porro possimus
                    reiciendis rem sunt totam ut vero, voluptatum?
                  </div>
                  <div>
                    Consectetur consequuntur deserunt dolore expedita laborum
                    officia, quaerat reiciendis soluta vel voluptas! Alias,
                    aliquam aspernatur cumque debitis dolore, error esse, maxime
                    neque nesciunt numquam odit perspiciatis provident similique
                    sint voluptatibus.
                  </div>
                </Accordion.Item>
                <Accordion.Item value={2} trigger={"Problemy z rozliczeniami"}>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aut beatae debitis distinctio earum incidunt ipsa labore
                    laboriosam libero nobis perspiciatis porro possimus
                    reiciendis rem sunt totam ut vero, voluptatum?
                  </div>
                  <div>
                    Consectetur consequuntur deserunt dolore expedita laborum
                    officia, quaerat reiciendis soluta vel voluptas! Alias,
                    aliquam aspernatur cumque debitis dolore, error esse, maxime
                    neque nesciunt numquam odit perspiciatis provident similique
                    sint voluptatibus.
                  </div>
                </Accordion.Item>
                <Accordion.Item value={3} trigger={"Kody błędu"}>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aut beatae debitis distinctio earum incidunt ipsa labore
                    laboriosam libero nobis perspiciatis porro possimus
                    reiciendis rem sunt totam ut vero, voluptatum?
                  </div>
                  <div>
                    Consectetur consequuntur deserunt dolore expedita laborum
                    officia, quaerat reiciendis soluta vel voluptas! Alias,
                    aliquam aspernatur cumque debitis dolore, error esse, maxime
                    neque nesciunt numquam odit perspiciatis provident similique
                    sint voluptatibus.
                  </div>
                </Accordion.Item>
                <Accordion.Item
                  isLast
                  value={4}
                  trigger={"Problemy z oglądaniem"}
                >
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aut beatae debitis distinctio earum incidunt ipsa labore
                    laboriosam libero nobis perspiciatis porro possimus
                    reiciendis rem sunt totam ut vero, voluptatum?
                  </div>
                  <div>
                    Consectetur consequuntur deserunt dolore expedita laborum
                    officia, quaerat reiciendis soluta vel voluptas! Alias,
                    aliquam aspernatur cumque debitis dolore, error esse, maxime
                    neque nesciunt numquam odit perspiciatis provident similique
                    sint voluptatibus.
                  </div>
                </Accordion.Item>
              </Accordion>
            </div>
            <div
              className={
                "rounded-[8px] border border-neutral-800 mb-4 px-3 pt-3 flex flex-col "
              }
            >
              <div
                className={
                  "flex  items-center  pt-2 pb-5 border-b border-neutral-800 text-xl"
                }
              >
                <LuMonitorSmartphone
                  size={24}
                  className={"text-[#ff7aff] ms-[4px] me-4"}
                />
                Oglądanie i odtwarzanie
              </div>
              <Accordion>
                <Accordion.Item value={1} trigger={"Profile"}>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aut beatae debitis distinctio earum incidunt ipsa labore
                    laboriosam libero nobis perspiciatis porro possimus
                    reiciendis rem sunt totam ut vero, voluptatum?
                  </div>
                  <div>
                    Consectetur consequuntur deserunt dolore expedita laborum
                    officia, quaerat reiciendis soluta vel voluptas! Alias,
                    aliquam aspernatur cumque debitis dolore, error esse, maxime
                    neque nesciunt numquam odit perspiciatis provident similique
                    sint voluptatibus.
                  </div>
                </Accordion.Item>
                <Accordion.Item value={2} trigger={"Funkcje i ustawienia"}>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aut beatae debitis distinctio earum incidunt ipsa labore
                    laboriosam libero nobis perspiciatis porro possimus
                    reiciendis rem sunt totam ut vero, voluptatum?
                  </div>
                  <div>
                    Consectetur consequuntur deserunt dolore expedita laborum
                    officia, quaerat reiciendis soluta vel voluptas! Alias,
                    aliquam aspernatur cumque debitis dolore, error esse, maxime
                    neque nesciunt numquam odit perspiciatis provident similique
                    sint voluptatibus.
                  </div>
                </Accordion.Item>
                <Accordion.Item value={3} trigger={"Filmy, seriale i programy"}>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aut beatae debitis distinctio earum incidunt ipsa labore
                    laboriosam libero nobis perspiciatis porro possimus
                    reiciendis rem sunt totam ut vero, voluptatum?
                  </div>
                  <div>
                    Consectetur consequuntur deserunt dolore expedita laborum
                    officia, quaerat reiciendis soluta vel voluptas! Alias,
                    aliquam aspernatur cumque debitis dolore, error esse, maxime
                    neque nesciunt numquam odit perspiciatis provident similique
                    sint voluptatibus.
                  </div>
                </Accordion.Item>
                <Accordion.Item value={4} trigger={"Kontrola rodzicielska"}>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aut beatae debitis distinctio earum incidunt ipsa labore
                    laboriosam libero nobis perspiciatis porro possimus
                    reiciendis rem sunt totam ut vero, voluptatum?
                  </div>
                  <div>
                    Consectetur consequuntur deserunt dolore expedita laborum
                    officia, quaerat reiciendis soluta vel voluptas! Alias,
                    aliquam aspernatur cumque debitis dolore, error esse, maxime
                    neque nesciunt numquam odit perspiciatis provident similique
                    sint voluptatibus.
                  </div>
                </Accordion.Item>
                <Accordion.Item isLast value={5} trigger={"Gry"}>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aut beatae debitis distinctio earum incidunt ipsa labore
                    laboriosam libero nobis perspiciatis porro possimus
                    reiciendis rem sunt totam ut vero, voluptatum?
                  </div>
                  <div>
                    Consectetur consequuntur deserunt dolore expedita laborum
                    officia, quaerat reiciendis soluta vel voluptas! Alias,
                    aliquam aspernatur cumque debitis dolore, error esse, maxime
                    neque nesciunt numquam odit perspiciatis provident similique
                    sint voluptatibus.
                  </div>
                </Accordion.Item>
              </Accordion>
            </div>
            <div
              className={
                "rounded-[8px] border border-neutral-800 mb-4 px-3 pt-3 flex flex-col "
              }
            >
              <div
                className={
                  "flex  items-center  pt-2 pb-5 border-b border-neutral-800 text-xl"
                }
              >
                <IoRocketOutline
                  size={24}
                  className={"text-[#e3a9ff] ms-[4px] me-4 "}
                />
                Pierwsze kroki
              </div>
              <Accordion>
                <Accordion.Item
                  value={1}
                  trigger={"Dołączanie do serwisu Cinemawave"}
                >
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aut beatae debitis distinctio earum incidunt ipsa labore
                    laboriosam libero nobis perspiciatis porro possimus
                    reiciendis rem sunt totam ut vero, voluptatum?
                  </div>
                  <div>
                    Consectetur consequuntur deserunt dolore expedita laborum
                    officia, quaerat reiciendis soluta vel voluptas! Alias,
                    aliquam aspernatur cumque debitis dolore, error esse, maxime
                    neque nesciunt numquam odit perspiciatis provident similique
                    sint voluptatibus.
                  </div>
                </Accordion.Item>
                <Accordion.Item
                  isLast
                  value={2}
                  trigger={"Konfiguracja urządzenia"}
                >
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aut beatae debitis distinctio earum incidunt ipsa labore
                    laboriosam libero nobis perspiciatis porro possimus
                    reiciendis rem sunt totam ut vero, voluptatum?
                  </div>
                  <div>
                    Consectetur consequuntur deserunt dolore expedita laborum
                    officia, quaerat reiciendis soluta vel voluptas! Alias,
                    aliquam aspernatur cumque debitis dolore, error esse, maxime
                    neque nesciunt numquam odit perspiciatis provident similique
                    sint voluptatibus.
                  </div>
                </Accordion.Item>
              </Accordion>
            </div>
          </section>
          <section className={"w-full  max-w-[600px] m-auto px-2 mb-14"}>
            <h3 className={"text-white font-semibold text-[18px] mb-3"}>
              Szybkie łącza
            </h3>
            <ul className={"text-white"}>
              <li
                className={
                  "flex py-3 border-t border-neutral-800 underline items-center"
                }
              >
                <LuMegaphone size={18} className={"me-3"} />
                <a href="#">Prześlij prośbę o film, serial lub program</a>
              </li>
              <li
                className={
                  "flex py-3 border-t border-neutral-800 underline items-center"
                }
              >
                <FaRegEnvelope size={18} className={"me-3"} />
                <a href="#">Zaktualizuj adres e-mail</a>
              </li>
              <li
                className={
                  "flex py-3 border-t border-neutral-800 underline items-center"
                }
              >
                <MdLockOutline size={18} className={"me-3"} />
                <a href="#">Zaktualizuj hasło</a>
              </li>
              <li
                className={
                  "flex py-3 border-t border-neutral-800 underline items-center"
                }
              >
                <MdOutlinePayment size={18} className={"me-3"} />
                <a href="#">Zaktualizuj metodę płatności</a>
              </li>
              <li
                className={
                  "flex py-3 border-t border-neutral-800 underline items-center"
                }
              >
                <MdOutlineCancel size={18} className={"me-3"} />
                <a href="#">Anuluj konto</a>
              </li>
              <li
                className={
                  "flex py-3 border-t border-neutral-800 underline items-center"
                }
              >
                <RxHamburgerMenu size={18} className={"me-3"} />
                <a href="#">Sprawdź historię płatności</a>
              </li>
            </ul>
          </section>
          <section className={"w-full max-w-[600px] px-2 mx-auto mb-14"}>
            <h3
              className={
                "text-white font-semibold text-[20px] text-center mb-4"
              }
            >
              Potrzebujesz pomocy?
            </h3>
            <a
              className={
                "p-3 text-white bg-[#0f0f0f] rounded w-full block max-w-[216px] mx-auto text-center hover:bg-black"
              }
              href="mailto:karolprzygodastudia@gmail.com"
            >
              Skontaktuj się z nami
            </a>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
}
