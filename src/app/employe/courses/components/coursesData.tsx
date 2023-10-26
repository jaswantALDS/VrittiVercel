"use client";
import CourseCard from "@/components/ui/CourseCard";
import { AppAssets } from "@/constants/assets";
import EmployeeController from "@/controllers/employee";
import { useAppSelector } from "@/store";
import React, { useEffect, useState } from "react";

const CoursesData = () => {
  const user: any = useAppSelector((state) => state.userReducer.user);
  const auth = new EmployeeController(user.accessToken);
  const [data, setData] = useState([]);
  console.log(user);
  useEffect(() => {
    auth
      .getCourses()
      .then((res: any) => {
        setData(res.data.results);
        console.log("courses", res);
      })
      .catch((err: any) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-5">
      {data.map((item: any, index: number) => (
        <div key={index} className="w-[20rem]">
          <CourseCard
            href={`/employe/courses/${item?.slug}/`}
            title={item?.title}
            playTime={item?.play_time}
            price={item?.discount_price}
            cardImage={JSON.stringify(item?.feature_image)}
          />
        </div>
      ))}
    </div>
  );
};

export default CoursesData;
