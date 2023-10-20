"use client";
import React from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import TextInput from "@/components/textinput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EmployeeController from "@/controllers/employee";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Valid email").required("Email is required"),
});

type schema = {
  email: string;
  phone:number;
};

export default function Authentication() {

  const router = useRouter();
  const auth = new EmployeeController();
  const handleSubmit = (
    values: schema,
    { setFieldError, setSubmitting }: FormikHelpers<schema>
  ) => {
    if (!Object.values(values)[0]) {

      setFieldError("email", "Email is required");
    } else {
      
      // console.log(values);
      setSubmitting(true);
      auth.employeeverify(values)
      .then((res) => {
        if(res.email == false){
          router.push("employe/verification");
        } 
      }
     )
     .catch((err)=>{
      if(err.response.status == 403){
        setFieldError("email", "User is Already Exist");
      }
     })
    }
  }

  
  return (
    <Formik
      initialValues={{
        email: "",
        phone:123,
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
                    src="/avatar/virtti1.png"
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
                  <h2 className="text-xl font-[200]  py-2 text-left">
                    sign up
                  </h2>
                  <p className="text-sm text-stone-600">
                    elevate your access : registered useres,unleash
                    possibillties.
                  </p>
                </div>
              </div>
              <div className="">
                <div className="text-2xl font-[600] text-left flex items-center gap-4">
                  <h1> Authentication</h1>
                  <div className="w-10 h-1 bg-gray-600"></div>
                </div>
                <div className="space-y-4 py-4">
                  <div>
                    <TextInput
                      name="email"
                      type="email"
                      placeholder="Your email"
                      label=""
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      error={errors.email}
                      istouched={touched.email}
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
