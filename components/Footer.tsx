import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin, FaSquareXTwitter, FaGithub } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className={"border-t lg:border-0 w-full bg-black py-12 flex flex-col "}
    >
      <nav
        className={
          "flex flex-col gap-8 self-center w-full max-w-[90%]  lg:max-w-[80%] text-neutral-400"
        }
      >
        <div className={"flex flex-wrap"}>
          Pytania? Napisz wiadomość na adres mailowy:&nbsp;
          <a
            href="mailto:karolprzygodastudia@gmail.com"
            className={"hover:underline hover:text-white"}
          >
            karolprzygodastudia@gmail.com
          </a>
        </div>
        <div>
          <ul
            className={
              "flex flex-wrap justify-between lg:justify-start gap-y-5 text-sm"
            }
          >
            <li
              className={
                "basis-[calc(50%-0.75rem)] lg:basis-[calc(25%-0.75rem)]"
              }
            >
              <Link href="/faqPage" className={"underline hover:text-white"}>
                Często zadawane pytania
              </Link>
            </li>
            <li
              className={
                "basis-[calc(50%-0.75rem)] lg:basis-[calc(25%-0.75rem)] "
              }
            >
              <Link
                href="#"
                target={"_blank"}
                className={"underline hover:text-white"}
              >
                Warunki korzystania
              </Link>
            </li>
            <li
              className={
                "basis-[calc(50%-0.75rem)] lg:basis-[calc(25%-0.75rem)]"
              }
            >
              <Link
                href="#"
                target={"_blank"}
                className={"underline hover:text-white"}
              >
                Centrum pomocy
              </Link>
            </li>
            <li
              className={
                "basis-[calc(50%-0.75rem)] lg:basis-[calc(25%-0.75rem)]"
              }
            >
              <Link
                href="#"
                target={"_blank"}
                className={"underline hover:text-white"}
              >
                Informacje o firmie
              </Link>
            </li>
            <li
              className={
                "basis-[calc(50%-0.75rem)] lg:basis-[calc(25%-0.75rem)]"
              }
            >
              <Link
                href="#"
                target={"_blank"}
                className={"underline hover:text-white"}
              >
                Ustawienia plików cookie
              </Link>
            </li>
            <li
              className={
                "basis-[calc(50%-0.75rem)] lg:basis-[calc(25%-0.75rem)]"
              }
            >
              <Link
                href="#"
                target={"_blank"}
                className={"underline hover:text-white"}
              >
                Ustawienia reklam
              </Link>
            </li>
            <li
              className={
                "basis-[calc(50%-0.75rem)] lg:basis-[calc(25%-0.75rem)]"
              }
            >
              <Link
                href="#"
                target={"_blank"}
                className={"underline hover:text-white"}
              >
                Prywatność
              </Link>
            </li>
          </ul>
        </div>
        <div className={"flex items-center gap-5 flex-wrap"}>
          &copy; Wszelkie prawa zastrzeżone Karol Przygoda
          <ul className={"flex gap-3"}>
            <li>
              <a
                href="https://github.com/karolprzygoda"
                target={"_blank"}
                className={"text-xl hover:text-white"}
              >
                <FaGithub />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/karol-przygoda-953286246/"
                target={"_blank"}
                className={"text-xl hover:text-white"}
              >
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=100004371135704"
                target={"_blank"}
                className={"text-xl hover:text-white"}
              >
                <FaFacebookSquare />
              </a>
            </li>
            <li>
              <a
                href="https://x.com/JohnsonWeedrow"
                target={"_blank"}
                className={"text-xl hover:text-white"}
              >
                <FaSquareXTwitter />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
}
