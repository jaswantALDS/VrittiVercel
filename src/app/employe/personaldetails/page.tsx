"use client";
import React from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import TextInput from "@/components/textinput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EmployeeController from "@/controllers/employee";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("required"),
  last_name: Yup.string().required("required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

type schema = {
  first_name: string;
  last_name: string;
  password: string;
  source: string;
  email: string;  
};



export default function PersonalDetails() {
  const router = useRouter();
  const auth = new EmployeeController();

  const handleSubmit = (
    values: schema,
    { setFieldError, setSubmitting }: FormikHelpers<schema>
  ) => {
    let val:any = values
    delete val.cpassword
    auth.registerEmployee(val)
    .then((res) => {
      // console.log("nkjdvud",res);
        router.push("/employee");
      }
     )
     .catch((err)=>{
    //  console.log("error",err);
     })
     setSubmitting(true);
  };
  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        password: "",
        source:"web",
        email:"fbdfjggd@gmail.com"
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
        setFieldError,
        isSubmitting,
      }: any) => (
        <>
          <div className="flex items-center justify-center  mt-24">
            <div className=" bg-white  w-[400px] rounded-xl p-5">
              <div className="">
                <div className="flex justify-center bg-white">
                  <Image
                    src="/avatar/virtti.jpg"
                    width={50}
                    height={50}
                    alt="Picture of the author"
                  />
                </div>
                <div className="text-3xl font-[600] text-center uppercase font-serif">
                  <h1>vritti</h1>
                  <p className="text-[8px] -mt-4">authentication employe </p>
                </div>
                <div className=" pb-4 text-left text-2xl capitalize">
                  <div className="text-xl font-[200]  py-4 text-left">
                    sign up
                  </div>
                  <p className="text-sm text-stone-600">
                    elevate your access : registered useres,unleash
                    possibillties.
                  </p>
                </div>
              </div>
              <div className="">
                <div className="text-2xl font-[600] text-left flex items-center gap-4">
                  <h1>Personal Details</h1>
                  <div className="w-10 h-1 bg-gray-600"></div>
                </div>
                <div className="space-y-4 py-4">
                  <div>
                    <TextInput
                      name="first_name"
                      type="text"
                      placeholder="Your first name"
                      label=""
                      value={values.first_name}
                      onChange={handleChange("first_name")}
                      error={errors.first_name}
                      istouched={touched.first_name}
                    />
                  </div>
                  <div>
                    <TextInput
                      name="last_name"
                      type="text"
                      placeholder="Your last name"
                      label=""
                      value={values.last_name}
                      onChange={handleChange("last_name")}
                      error={errors.last_name}
                      istouched={touched.last_name}
                    />
                  </div>
                  <div>
                    <TextInput
                      name="password"
                      type="password"
                      placeholder="password"
                      label=""
                      value={values.password}
                      onChange={handleChange("password")}
                      error={errors.password}
                      istouched={touched.password}
                    />
                  </div>
                  <div>
                    <TextInput
                      name="cpassword"
                      type="password"
                      placeholder="Your confirm password"
                      label=""
                      value={values.cpassword}
                      onChange={handleChange("cpassword")}
                      error={errors.cpassword}
                      istouched={touched.cpassword}
                    />
                  </div>
                </div>
                <div
                  className="px-2 py-3 mt-5  text-center bg-blue-600 cursor-pointer rounded-xl  my-6 mb-12"
                  onClick={handleSubmit}
                >
                  <button
                    type="submit"
                    className="text-white"
                    onClick={() => {
                     
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
}
