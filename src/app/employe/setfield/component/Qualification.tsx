"use client";
import React, { useState } from "react";
import TextInput from "@/components/textinput";
import EmployeeController from "@/controllers/employee";

import { Formik, FieldArray } from "formik";
import { MdDeleteForever } from "react-icons/md";
import { QualificationDetails } from "@/settings/validations";
import Combobox from "@/components/controls/ComboBox";

type Certificate = {
  doc_type: number;
  name: string;
  document: File | null;
};

type QualificationsProps = {
  handleNext: () => void;
  handlePrev: () => void;
  user: any;
};

type schema = {
  qualification: string;
  academy: string;
};

export default function Qualifications({
  handleNext,
  user,
}: QualificationsProps) {
  const auth = new EmployeeController(user.accessToken);
  const [qualType, setQualType] = useState<any>("");
  const [isReady, setIsReady] = useState<any>(true);

  const QualificationData = async () => {
    try {
      let { data } = await auth.employee_QualificationType();
      const arr = await Promise.all(
        data.map(async (item: any) => {
          return {
            key: item.id,
            value: item.id,
            label: item.name,
            relative: item.related_name,
          };
        })
      );
      return arr;
    } catch (error) {}
  };

  const submitRegister = async (
    values: any,
    { setSubmitting, setFieldError, resetForm }: any
  ) => {
    let newValues = {
      qualification: values?.qualification,
      college: values?.college,
    };

    await auth
      .employee_Qualification(newValues)
      .then(async (res: any) => {
        console.log("Response", res);
        const apiPromises = values.certificates.map(async (item: any) => {
          const formData: any = new FormData();
          Object.keys(item).map(async (i: any) => {
            let obj = item[i];
            if (i == "document") {
              formData.append("document", obj);
            } else {
              formData.append(i, obj);
            }
          });

          try {
            const response = await auth.addDocuments(formData);
            console.log("QualificationDocUpload", response);
            return response;
          } catch (error) {
            throw error; // Re-throw the error to stop Promise.all if an error occurs
          }
        });
        // Use Promise.all to wait for all API calls to complete
        try {
          const responses = await Promise.all(apiPromises);
          setSubmitting(false);
          setIsReady(true);
          handleNext();
        } catch (error) {
          setIsReady(true);
          setSubmitting(false);
        }
      })
      .catch((err: any) => {
        console.log("error", err);
        setSubmitting(false);
        setIsReady(true);
      });
  };

  return (
    <Formik
      initialValues={{
        qualification: "",
        college: "",
        certificates: Array(1).fill({
          doc_type: 8,
          name: "",
          document: null,
        }),
      }}
      validationSchema={QualificationDetails}
      onSubmit={submitRegister}
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
          <div className="">
            <div className="mt-[10px] p-5 ">
              {/* QualificationType */}
              <div className="">
                <Combobox
                  label={"Qualification"}
                  name={"qualification"}
                  onChange={(e: any) => {
                    console.log("quali_", e.value);
                    setQualType(e.relative);
                    setFieldValue("qualification", e.value);
                  }}
                  placeholder={"Select Qualification"}
                  loadOptions={QualificationData}
                  error={errors.qualification}
                  istouched={touched.qualification}
                />
              </div>

              {/* Qualification Relative */}
              <div className="mt-2  ">
                <TextInput
                  name={"college"}
                  type="text"
                  placeholder={qualType ? qualType : "Academy"}
                  label={qualType != "" ? qualType : `Academy`}
                  value={values?.college}
                  onChange={(e) => {
                    setFieldValue("college", e.target.value);
                  }}
                  onBlur={(e) => {
                    handleBlur("college")(e);
                  }}
                  error={errors.college}
                  istouched={touched.college}
                />
              </div>

              {/* Certificates */}
              <FieldArray
                name="certificates"
                render={(arrayHelpers) => (
                  <>
                    <div className="my-2">
                      <label className="block  font-semibold leading-6 text-gray-900">
                        Certificates
                      </label>
                    </div>
                    <div className="mt-2">
                      {values.certificates.map(
                        (certificate: Certificate, index: number) => (
                          <div
                            key={index}
                            className="border rounded-md bg-[#F1F5F9] mt-2 p-2"
                          >
                            <div className="w-full flex gap-2 items-center">
                              <input
                                className=" w-[92%] rounded-md bg-white placeholder:text-gray-500 p-2 text-gray-900 text-sm leading-3 focus:border-blue-500 "
                                type="text"
                                placeholder="Certificate Name"
                                value={certificate.name}
                                onChange={(e) =>
                                  arrayHelpers.replace(index, {
                                    ...certificate,
                                    name: e.target.value,
                                  })
                                }
                              />
                              <MdDeleteForever
                                className="text-lg text-gray-400 hover:cursor-pointer"
                                onClick={() => arrayHelpers.remove(index)}
                              />
                            </div>
                            <input
                              type="file"
                              className=" rounded-md w-full p-1 text-xs mt-2"
                              onChange={(e) => {
                                if (
                                  e.target.files &&
                                  e.target.files.length > 0
                                ) {
                                  arrayHelpers.replace(index, {
                                    ...certificate,
                                    document: e.target.files[0],
                                  });
                                }
                              }}
                            />
                          </div>
                        )
                      )}
                      <div className="flex justify-end text-sm my-2 ">
                        <button
                          type="button"
                          className="border p-1 rounded-md bg-[#F1F5F9]"
                          onClick={() =>
                            arrayHelpers.push({
                              doc_type: 8,
                              name: "",
                              document: null,
                            })
                          }
                        >
                          + Add Certificates
                        </button>
                      </div>
                    </div>
                  </>
                )}
              />

              {/* Next Button */}
              <div className="flex w-full justify-end">
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-yellow-300 mt-5 w-28 mb-4 rounded-xl px-2 py-3 text-center cursor-pointer"
                  >
                    Next
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
