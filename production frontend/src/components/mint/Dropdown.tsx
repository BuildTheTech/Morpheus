import { useState, useEffect, useRef } from "react";
import { ArrowDown } from "../../Icons";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        dropdownRef.current &&
        event.target &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the dropdown
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const [value, setValue] = useState("TITANX");

  const handleClick = () => {
    setValue("TITANX");
    setIsOpen(false);
  };
  return (
    <div className="relative text-left" ref={dropdownRef}>
      <div>
        <button
          // onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="flex items-center sm:gap-[6px] gap-[2px] justify-center text-white text-[12px] sm:text-[24px] font-normal flex-1 w-full leading-none cursor-default"
        >
          <img
            src="assets/images/titanx.svg"
            className="mb-1 w-[16px] sm:w-[24px]"
            alt=""
          />
          {value}
          {/* <div
            className={`transition-all duration-100 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <ArrowDown />
          </div> */}
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2  w-32 py-2 rounded-md shadow-lg bg-black border border-primary"
          role="menu"
        >
          <div className="flex flex-col gap-1 sm:gap-2 justify-center items-center">
            {" "}
            <div
              className="py-1 flex flex-col items-center cursor-pointer"
              onClick={handleClick}
            >
              <div className="text-[12px] sm:text-[14px] flex text-white leading-none items-center gap-2">
                <img
                  src="assets/images/titanx.svg"
                  className="w-[16px] sm:w-[24px] mb-1"
                  alt=""
                />
                TITANX
              </div>
            </div>
            <div
              className="py-1 flex flex-col items-center cursor-pointer"
              onClick={handleClick}
            >
              <div className="text-[12px] sm:text-[14px] flex text-white leading-none items-center gap-2">
                <img
                  src="assets/images/titanx.svg"
                  className="w-[16px] sm:w-[24px] mb-1"
                  alt=""
                />
                TITANX
              </div>
            </div>
            <div
              className="py-1 flex flex-col items-center cursor-pointer"
              onClick={handleClick}
            >
              <div className="text-[12px] sm:text-[14px] flex text-white leading-none items-center gap-2">
                <img
                  src="assets/images/titanx.svg"
                  className="w-[16px] sm:w-[24px] mb-1"
                  alt=""
                />
                TITANX
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
