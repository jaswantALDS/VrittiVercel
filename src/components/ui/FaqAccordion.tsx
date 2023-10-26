import React, { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqData: FaqItem[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqData }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full my-2">
      {faqData.map((faq, index) => (
        <div key={index} className="mb-2 ">
          <div
            className={`border rounded-lg overflow-hidden ${
              activeIndex === index ? "shadow-lg" : ""
            }`}
          >
            <button
              className={`p-4 cursor-pointer flex gap-3 items-center bg-transparent w-full`}
              onClick={() => handleAccordionClick(index)}
            >
              <BsChevronRight
                className={`w-5 h-5 transition-transform transform ${
                  activeIndex === index ? "rotate-90" : "rotate-0"
                }`}
              />
              <span className="text-md font-medium">{faq.question}</span>
            </button>
            {activeIndex === index && (
              <div
                className={`transition-all duration-300 p-4 max-h-96 opacity-100 border-t overflow-hidden text-sm font-medium text-gray-500 font-space`}
              >
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
