import React from "react";

export default function ErrorsControl({ error }: any) {
  return (
    <div>
      <p className={` w-full  text-red-500 text-xs -ml-3 mt-2`}>{error}</p>
    </div>
  );
}
