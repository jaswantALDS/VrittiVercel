import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full my-2  ">
      <div
        className={`border hover:border-orange-400 rounded-lg overflow-hidden ${
          isOpen ? "shadow-lg" : ""
        }`}
      >
        <div
          className={`p-4 cursor-pointer flex justify-between items-center bg-transparent  `}
          onClick={toggleAccordion}
        >
          <span className="text-lg font-medium">{title}</span>

          <BsChevronDown
            className={`w-5 h-5 transition-transform transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <div
          className={`transition-all duration-300 ${
            isOpen ? " p-4 max-h-96 opacity-100 border-t" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
