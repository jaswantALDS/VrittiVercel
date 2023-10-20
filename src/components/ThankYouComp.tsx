import React from "react";
import { FaThumbsUp } from "react-icons/fa";

interface ThankYouModalProps {
  onClick: () => void;
  content: string;
  button: string;
}

export default function ThankYouModal({
  onClick,
  content,
  button,
}: ThankYouModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-75">
      <div className="bg-white p-8 rounded-lg text-center w-[60vw] h-[60vh] flex flex-col justify-center">
        <FaThumbsUp className="text-orange-400 text-6xl animate-bounce mx-auto " />
        <p className="text-lg text-gray-700 my-4">{content}</p>
        <div className="flex justify-center mt-5">
          <button
            className="bg-orange-400 w-fit hover:bg-orange-500 text-white py-2 px-4 rounded-md transition duration-300"
            onClick={onClick}
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
}
