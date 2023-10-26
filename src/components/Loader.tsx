import React from "react";

const Loader = ({ size }: any) => {
  const loaderSize = size || 24; // Default size is 24px, but you can adjust as needed

  return (
    <div className="flex justify-center items-center">
      <div className={`w-${loaderSize} h-${loaderSize} animate-spin`}>
        <div className="relative rounded-full border-t-8 border-blue-500 border-solid animate-spin h-full w-full">
          <div
            className="absolute inset-0 border-5 border-solid border-white rounded-full animate-prix-clip-fix"
            style={{ borderColor: "#FF3D00" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
