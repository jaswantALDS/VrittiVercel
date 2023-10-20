"use client";
import Authentication from "./authentication/page";
import PersonalDetails from "./personaldetails/page";
import Verification from "./verification/page";

function employe() {
  return (
    <>
      <div className="flex justify-center">
        <div className="">
          <Authentication />
        </div>
      </div>
    </>
  );
}
export default employe;
