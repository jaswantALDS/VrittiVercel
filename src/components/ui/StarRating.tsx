"use client";
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  onClick?: (rating: number) => void;
  starSize: number;
  canMark?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  onClick,
  rating,
  starSize,
  canMark = false,
}) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          onClick={() => {
            if (onClick) onClick(index + 1);
          }}
          className={`ml-1 focus:outline-none`}
          disabled={!canMark}
        >
          {index < rating ? (
            <FaStar size={starSize} color="#FFD700" />
          ) : (
            <FaRegStar size={starSize} color="#A9A9A9" />
          )}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
