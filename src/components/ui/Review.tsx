import React, { useState } from "react";
import { BsDot, BsStarFill } from "react-icons/bs";

interface ReviewProps {
  authorInitials: string;
  authorName: string;
  rating: number;
  date: string;
  content: string;
}

const Review: React.FC<ReviewProps> = ({
  authorInitials,
  authorName,
  rating,
  date,
  content,
}) => {
  return (
    <div className="review-container p-4 border border-gray-300 my-4 rounded-md flex items-center justify-between">
      <div>
        <div className="flex items-center">
          <div className="initials-container mr-2  rounded-full p-3 bg-gray-500 text-white">
            <div className="initials" aria-hidden="true">
              {authorInitials}
            </div>
          </div>
          <div className="author-name">{authorName}</div>
        </div>
        <div className="flex items-center my-2 gap-2">
          <BsStarFill className="text-orange-500 " />
          <span className="rating pt-[3px]">{rating}</span>
          <p className="review-date  pt-[3px] flex items-center">
            <BsDot />
            Reviewed on {date}
          </p>
        </div>
      </div>
      <div
        className={`review-content mt-2 w-[60%] text-sm font-medium text-gray-500 font-space`}
      >
        <div className="content">
          <div className="content-inner">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
