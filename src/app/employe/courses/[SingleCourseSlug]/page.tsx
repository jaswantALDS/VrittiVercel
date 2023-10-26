"use client";
import CardPrototype from "@/components/ui/CardPrototype";
import EmployeeController from "@/controllers/employee";
import { useAppSelector } from "@/store";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditorJsonComponents from "../components/EditorJsonComponents";
import Accordion from "@/components/ui/Accordion";
import FaqAccordion from "@/components/ui/FaqAccordion";
import Review from "@/components/ui/Review";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import OffCanvas from "@/components/ui/OffCanvas";
import { AppAssets } from "@/constants/assets";
import Donation from "./Donation/Donation/donation";

const SingleCourse = ({ params }: { params: { SingleCourseSlug: string } }) => {
  const user: any = useAppSelector((state) => state.userReducer.user);
  const auth = new EmployeeController(user.accessToken);
  const [data, setData] = useState<any>();
  const [enrollStatus, setEnrollStatus] = useState<any>(false);
  const [modules, setModules] = useState<any>([]);
  const [faq, setFaq] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openCartModal, setOpenCartModal] = useState(false);

  const tabs = ["About", "Modules", "FAQ's", "Reviews"];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    // get single course Data
    auth
      .getSingleCourse(params.SingleCourseSlug)
      .then((res: any) => {
        setData(res.data);
        console.log("singleCourse", res.data);

        // Check Already enrolled or not
        auth
          .checkEnrollment(res.data.id)
          .then((res: any) => {
            console.log("enrollment", res);
            if (res.data.message == true) {
              setEnrollStatus(true);
            }
          })
          .catch((err: any) => {
            console.log("Error", err);
            if (err.message == false) {
              setEnrollStatus(false);
            }
          });

        // Get Modules
        auth
          .getCourseModules(res.data.id)
          .then((res: any) => {
            console.log("modules", res.data);
            setModules(res.data);
          })
          .catch((err: any) => {
            if (
              err.response.data.course_id[0] ===
              "Select a valid choice. That choice is not one of the available choices."
            ) {
              setModules(err.response.data.course_id[0]);
            }
            console.log("error", err);
          });

        // get FAQ's
        auth
          .getCourseFaq(res.data.id)
          .then((res: any) => {
            console.log("faq's", res.data);
            setFaq(res.data);
          })
          .catch((err: any) => {
            console.log("error", err);
          });

        // get Reviews
        auth
          .getCourseReview(res.data.id)
          .then((res: any) => {
            console.log("reviews's", res.data);
          })
          .catch((err: any) => {
            console.log("error", err);
          });
      })
      .catch((err: any) => {
        console.log("Error", err);
      });
  }, [params.SingleCourseSlug]);

  // Enroll
  const handleEnroll = () => {
    let value = {
      course: data?.id,
    };
    if (!enrollStatus) {
      auth
        .addCart(value)
        .then((res: any) => {
          console.log("adCart", res);
        })
        .catch((err: any) => {
          console.log("error", err);
        });
    }

    setOpenCartModal(true);
  };

  const subtotal = data?.price;
  const taxRate = 10;
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  return (
    <div>
      <CardPrototype>
        {data && (
          <>
            <OffCanvas
              isOpen={openCartModal}
              onClose={() => setOpenCartModal(false)}
            >
              <p className="text-xl border-b p-6">Cart</p>
              <div className="flex flex-col h-[91vh] md:h-[87vh] 2xl:h-[92vh] w-full justify-between">
                <div className="flex justify-center flex-grow ">
                  <div className="w-[90%] my-2">
                    <div className="flex justify-between items-center bg-white rounded-lg p-5">
                      <div className="flex gap-2 items-center">
                        <Image
                          src={data?.feature_image}
                          alt="image"
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                        <p className="text-lg text-gray-800">{data?.title}</p>
                      </div>
                      <p className="text-lg text-gray-800">${data?.price}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-t-2xl text-gray-800">
                  <div className="flex justify-between py-1 px-3 text-md">
                    <span>Sub Total</span>
                    <span>${subtotal}</span> {/* Display subtotal */}
                  </div>
                  <div className="flex justify-between text-md py-1 px-3">
                    <span>All Taxes</span>
                    <span>${taxAmount}</span> {/* Display tax */}
                  </div>
                  <div className="flex justify-between py-1 px-3 text-lg border-t font-semibold">
                    <span>Total</span>
                    <span>${total}</span> {/* Display total */}
                  </div>
                </div>
                <div className="bg-white flex justify-center">
                  <button className="bg-orange-400 hover:bg-orange-300 transition-all w-[95%] rounded-md p-3 my-2 text-white">
                    Payment
                  </button>
                </div>
              </div>
            </OffCanvas>

            <div className="flex justify-between ">
              <div className=" mt-1  h-auto">
                {/* Image and button */}
                <div className="flex justify-between">
                  <div className="h-36 w-72 relative">
                    {data && (
                      <Image
                        src={data?.feature_image}
                        alt="image"
                        layout="fill"
                        objectFit="fill"
                        objectPosition="center"
                        className="rounded-lg border"
                      />
                    )}
                    <div className="absolute bottom-0 bg-white rounded-md flex items-center px-2  m-2 text-xs">
                      <span className=" leading-6  font-medium ">
                        {data?.play_time}
                      </span>
                      <span className="ml-1 leading-6  font-medium ">
                        | {data?.modules} Lessons
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleEnroll}
                      className="bg-orange-500 hover:bg-orange-400 py-2 px-4 text-md rounded-md text-white "
                    >
                      {" "}
                      {enrollStatus ? "Already Enrolled" : "Enroll Now"}
                    </button>
                  </div>
                </div>

                <p className="text-2xl text-gray-800  leading-6  font-medium my-6 ">
                  {data?.title}
                </p>
                <div className="my-4 flex items-center border-b pb-4">
                  <span className="text-lg text-gray-800  leading-6  font-medium ">
                    ${data?.price}
                  </span>
                  <span className="text-sm ml-1">
                    | {data?.category?.title}
                  </span>
                </div>
                <p className="text-lg text-gray-800  leading-6  font-medium my-4 ">
                  Description
                </p>
                <p className="text-sm font-medium text-gray-500 font-space">
                  {data?.short_description}
                </p>
              </div>
            </div>

            <div className="m-5 p-4  ">
              <div className="flex w-full ">
                <nav className="w-full">
                  {/* <ul className="flex justify-around w-full ">
                {tabs.map((tab, index) => (
                  <li key={index}>
                    <a
                      href={`#${tab.toLowerCase()}`}
                      className={`${
                        selectedTab === index
                          ? "bg-orange-400 text-white"
                          : "text-gray-500  hover:bg-orange-400 hover:text-white "
                      } rounded-lg px-4 py-2 transition duration-300`}
                      onClick={() => setSelectedTab(index)}
                    >
                      {tab}
                    </a>
                  </li>
                ))}
              </ul> */}
                  {/* <ul className="mt-3 lg:mt-10  flex  justify-around items-center overflow-auto scrollbar-hide">
                {tabs.map((tab, index) => (
                  <li key={index} className="">
                    <button
                      className={`text-dark transition-all duration-300 font-semibold text-[11px] md:text-base ${
                        selectedTab === index
                          ? "border-b-[4px] border-newBlue"
                          : ""
                      }`}
                      onClick={() => setSelectedTab(index)}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul> */}
                  <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="tabs"
                    sx={{
                      "& .MuiTabs-indicator": {
                        backgroundColor: "#333", // Change the indicator color
                      },
                    }}
                  >
                    {tabs.map((tab, index) => (
                      <Tab
                        key={index}
                        label={tab}
                        sx={{
                          "&.Mui-selected": {
                            fontWeight: 600,
                            color: "#333", // Change the selected tab text color
                            borderBottom: "2px solid #333", // Change the selected tab bottom border color
                          },
                        }}
                      />
                    ))}
                  </Tabs>
                </nav>
              </div>
            </div>

            {/* About */}
            {selectedTab == 0 && (
              <div>
                {data && (
                  <EditorJsonComponents
                    jsonData={JSON.parse(data.description)}
                  />
                )}
              </div>
            )}
            {/* Modules */}
            {selectedTab == 1 && (
              <div>
                <p className="text-lg text-gray-800  leading-6 my-4 font-medium">
                  {`There are ${modules?.count} modules in this course`}
                </p>
                {modules &&
                  modules.results.map((item: any, index: number) => (
                    <div className="flex gap-5 border  rounded-md  p-3">
                      <Image
                        src={item?.feature_image}
                        alt="image"
                        width={100}
                        height={50}
                        objectFit="fill"
                        objectPosition="center"
                        className="rounded-lg"
                      />
                      <div>
                        <div className="flex justify-between items-center">
                          <p className="text-md text-gray-800  leading-6  font-medium my-1 ">
                            {item?.title}
                          </p>
                          <p className="text-xs text-white px-2 py-1 rounded-md bg-orange-400 flex items-center my-2">
                            Duration : {item?.play_time}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-500 font-space">
                          {item?.short_description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* FAQ */}

            {selectedTab == 2 && (
              <div>
                <p className="text-lg text-gray-800  leading-6 my-4 font-medium">
                  Frequently Asked Questions
                </p>
                {faq && <FaqAccordion faqData={faq.results} />}
              </div>
            )}

            {/* Reviews */}
            {selectedTab == 3 && (
              <div className="container mx-auto mt-8">
                {
                  <Review
                    authorInitials="JM"
                    authorName="John Doe"
                    rating={5}
                    date="Jun 12, 2023"
                    content="This course is useful not only for teens, but for anyone. The tips and strategies given by the professor are realistic and doable. Highly recommend."
                  />
                }
              </div>
            )}
          </>
        )}
      </CardPrototype>
    </div>
  );
};

export default SingleCourse;
