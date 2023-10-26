import CardPrototype from "@/components/ui/CardPrototype";
import React from "react";
import CoursesData from "./components/coursesData";
import Providers from "@/store/Providers";

const courses = () => {
  return (
    <Providers>
      <div className=" h-screen">
        <CardPrototype>
          <CoursesData />
        </CardPrototype>
      </div>
    </Providers>
  );
};

export default courses;
