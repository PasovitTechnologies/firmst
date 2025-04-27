import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import "../utils/i18n";
import { FaGlobe } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", name: "English", flag: "/flags/us_flag.png" },
    { code: "ru", name: "Русский", flag: "/flags/russia_flag.png" },
  ];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLang(lang);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [prevScrollPos]);

  return (
    <nav
      className={`bg-white shadow-md h-20 flex items-center px-4 md:px-6 fixed w-full top-0 left-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        <div>
          <img
            src="/images/FIRMST_SA_Hor_Logo.png"
            alt="Logo"
            className="w-24 md:w-36"
          />
        </div>
        <div className="flex flex-row-reverse md:flex-row gap-5 md:gap-3 items-center">
          <div className="flex flex-col-reverse md:flex-row gap-1 items-center md:gap-6">
            <span className="md:mr-3 text-[0.65rem] md:text-lg text-purple-950">
              +7-931-111-44-55
            </span>
            <div className="flex gap-2 md:gap-3">
              <a href="https://telegram.org/" target="_blank">
                <img
                  src="/images/telegram.png"
                  alt="Telegram"
                  className="w-5 md:w-7 h-5 md:h-7 rounded-lg"
                />
              </a>
              <a href="https://web.whatsapp.com/" target="_blank">
                <img
                  src="/images/whatsapp.png"
                  alt="WhatsApp"
                  className="w-5 md:w-7 h-5 md:h-7 rounded-lg"
                />
              </a>
              <a
                href="https://www.instagram.com/firmst_2020?igsh=OTBkZXo4dGh0aWtq"
                target="_blank"
              >
                <img
                  src="/images/instagram.png"
                  alt="Instagram"
                  className="w-5 md:w-7 h-5 md:h-7 rounded-lg"
                />
              </a>
            </div>
          </div>

          <div
            className="relative md:ml-6 flex gap-1 md:gap-2 items-center"
            ref={dropdownRef}
          >
            <FaGlobe className="text-xl md:text-2xl text-gray-800" />
            <div className="relative">
              <button
                className="cursor-pointer border border-transparent text-white font-semibold bg-[#002379] hover:bg-[#001379] md:text-base px-2 py-1 rounded-lg text-xs flex items-center gap-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={
                    languages.find((lang) => lang.code === selectedLang)?.flag
                  }
                  alt="Flag"
                  className="w-3 md:w-4 h-3 md:h-4"
                />
                {languages.find((lang) => lang.code === selectedLang)?.name}
                <IoIosArrowDown className="text-white text-sm " />
              </button>

              {dropdownOpen && (
                <ul className="absolute md:top-9 w-full bg-white border border-[#002379] rounded-lg shadow-md mt-1 right-0 z-10 overflow-hidden">
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      className="flex items-center gap-2 px-2 md:px-3 py-1 hover:bg-gray-200 cursor-pointer text-xs md:text-base"
                      onClick={() => changeLanguage(lang.code)}
                    >
                      <img
                        src={lang.flag}
                        className="w-3 md:w-4 h-3 md:h-4"
                        alt={`${lang.name} Flag`}
                      />
                      {lang.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
