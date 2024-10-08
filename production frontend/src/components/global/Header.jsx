import { useEffect, useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    // Check if the scroll position is past a certain threshold
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`  w-full transition-all duration-300 z-20 fixed top-0 ${
        isSticky
          ? " top-0 bg-[#030D03] py-3"
          : "2xl:py-[58px] py-[20px] lg:py-[30px]"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center sm:gap-[14px] gap-2">
            <img
              src="assets/images/logo.svg"
              className="w-[42px] lg:w-[57px]"
              alt=""
            />
            <span className="text-[#06AE0B] sen-font text-[24px] lg:text-[36px] font-semibold">
              MORPHEUS
            </span>
          </Link>
          <nav className="hidden xl:flex items-center gap-[60px]">
            {navItems.map((it, i) => (
              <Link
                to={it.link}
                key={i}
                className="text-white font-normal text-[20px] transition-all duration-150 ease-linear hover:text-primary"
              >
                {it.title}
              </Link>
            ))}
          </nav>

          <button className="gd-btn urbanist-font px-[26px] py-[10px] rounded-[20px] text-white font-semibold text-[16px] transition-all duration-150 ease-linear hidden xl:block">
            Connect Wallet
          </button>

          <Drawer />
        </div>
      </div>
    </header>
  );
}

const navItems = [
  {
    title: "Mint",
    link: "/",
  },
  {
    title: "Burn",
    link: "/",
  },
  {
    title: "Team",
    link: "/",
  },
  {
    title: "Contracts",
    link: "/",
  },
];

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative z-10 xl:hidden">
      {/* Backdrop */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out  ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-52 h-full bg-[#090909] shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="flex justify-end w-fit ml-auto"
          >
            <IoClose color="#06AE0B" size={32} />
          </button>

          <nav className="flex flex-col  gap-[20px] items-center pt-8">
            {navItems.map((it, i) => (
              <Link
                onClick={() => setIsOpen(false)}
                to={it.link}
                key={i}
                className="text-white font-normal text-[20px] transition-all duration-150 ease-linear hover:text-primary"
              >
                {it.title}
              </Link>
            ))}

            <button
              onClick={() => setIsOpen(false)}
              className="gd-btn urbanist-font px-[26px] py-[10px] rounded-[20px] text-white font-semibold text-[16px] transition-all duration-150 ease-linear mt-2"
            >
              Connect Wallet
            </button>
          </nav>
        </div>
      </div>

      {/* Button to open drawer */}
      <button className=" " onClick={() => setIsOpen(true)}>
        <CgMenuRightAlt color="#06AE0B" size={32} />
      </button>
    </div>
  );
};
