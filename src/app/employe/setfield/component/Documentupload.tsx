"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import TextInput from "@/components/textinput";
import ComboSelectBox from "./ComboSelectBox";
import ComboEbox from "@/components/controls/ComboEbox";
import EmployeeController from "@/controllers/employee";
import CustomComboBox from "@/components/controls/OptionsCombox";
import { DocumentValidations } from "@/settings/validations";
import ThankYouModal from "@/components/ThankYouComp";
import Combobox from "@/components/controls/ComboBox";

export default function Documentupload({ handleNext, user }: any) {
  const auth = new EmployeeController(user.accessToken);
  const [countryId, setCountryId] = useState<any>(null);
  const [nationalIds, setNationalIds] = useState<any>([]);
  const [countryData, setCountryData] = useState<any>([]);
  const [isReady, setIsReady] = useState<any>(true);
  const [showModal, setShowModal] = useState(false);

  const CountryData = async () => {
    try {
      let data = await auth.CountryApi("");
      const arr = await Promise.all(
        data.map(async (item: any) => {
          return { key: item.id, value: item.id, label: item.name };
        })
      );
      setCountryData(data);
      return arr;
    } catch (error) {}
  };

  const residentialTypData = async () => {
    const data = [
      {
        name: "Company Attached",
        id: "Company Attached",
      },
      { name: "Freelance", id: "Freelance" },
    ];
    try {
      const arr = await Promise.all(
        data.map(async (item: any) => {
          return { key: item.id, value: item.id, label: item.name };
        })
      );
      setCountryData(data);
      return arr;
    } catch (error) {}
  };

  const getNationalID = async () => {
    try {
      let data = await auth.GetNationalID(countryId);
      const arr = await Promise.all(
        data.map(async (item: any) => {
          return { key: item.id, value: item.id, label: item.name };
        })
      );
      console.log("nationalId", data);
      setNationalIds(data);
      return arr;
    } catch (error) {}
  };

  const handleFormSubmit = async (
    values: any,
    { setSubmitting, setFieldError, resetForm, setFieldValue }: any
  ) => {
    if (values.national_Card_Doc.country) {
      if (!values.national_Card_Doc.nationalCard) {
        setFieldError(
          "national_Card_Doc.nationalCard",
          "National Card is required"
        );
      }
      if (!values.national_Card_Doc.residentialTyp) {
        setFieldError(
          "national_Card_Doc.residentialTyp",
          "Residential Type is required"
        );
      }
      if (!values.national_Card_Doc.residentialId) {
        setFieldError(
          "national_Card_Doc.residentialId",
          "Residential ID is required"
        );
      }
    } else {
      setFieldError("national_Card_Doc.nationalCard", "");
      setFieldError("national_Card_Doc.residentialTyp", "");
      setFieldError("national_Card_Doc.residentialId", "");
    }

    setIsReady(false);
    // Create an array to store promises for each API call
    const apiPromises = Object.keys(values).map(async (i: any) => {
      if (values[i]?.document) {
        let obj = values[i];
        const formData: any = new FormData();
        Object.keys(values[i]).map((key) => formData.append(key, obj[key]));
        formData.append("document", values[i].document);
        try {
          const response = await auth.addDocuments(formData);
          console.log(response);
          return response;
        } catch (error: any) {
          console.log(error.response);
          throw error; // Re-throw the error to stop Promise.all if an error occurs
        }
      }
    });

    // Use Promise.all to wait for all API calls to complete
    try {
      const responses = await Promise.all(apiPromises);
      console.log("firstREs", responses);
      const value = {
        is_completed: true,
        documents_profile_completed: true,
      };
      await auth.employee_update(value).then((res: any) => {
        console.log("Success", res);
        handleNext();

        setIsReady(true);
        setSubmitting(false);
      });
    } catch (error) {
      console.log("error", error);
      setIsReady(true);
      setSubmitting(false);
      // Handle the error as needed
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          national_Card_Doc: {
            name: "National Card",
            country: null,
            doc_type: 5,
            nationalCard: "",
            residentialTyp: "",
            residentialId: "",
            documentNo: "",
            document: "",
          },
          passport_Card: {
            name: "Passport",
            documentNo: "",
            document: "",
            doc_type: 7,
            expiry_date: "",
          },
        }}
        validationSchema={DocumentValidations}
        onSubmit={handleFormSubmit}
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
          <div className="py-3">
            {/* national card document */}
            <div className="space-y-4 border p-5 rounded-md">
              <div className="">
                <h1 className="font-semibold leading-6">
                  National Card Document
                </h1>
              </div>

              {/* Country */}
              <div className="mt-2 relative">
                <CustomComboBox
                  label="Country"
                  placeholder="Select Country"
                  onInputChange={(inputString: string) => CountryData()}
                  options={countryData}
                  initialValue={values?.national_Card_Doc?.country}
                  onOptionSelect={(e: any) => {
                    console.log("Selected Country:", e);
                    setCountryId(e.id);
                    setFieldValue("national_Card_Doc.country", e.id);
                  }}
                  errors={errors?.national_Card_Doc?.country}
                  touched={touched?.national_Card_Doc?.country}
                />
              </div>

              {/* National Card */}
              {countryId && (
                <>
                  <div className="mt-2 relative">
                    <CustomComboBox
                      label="National Card"
                      placeholder="Select National Card"
                      onInputChange={(inputString: string) => getNationalID()}
                      options={nationalIds}
                      initialValue={values?.national_Card_Doc?.nationalCard}
                      onOptionSelect={(selectedOption: any) => {
                        console.log("Selected National Card:", selectedOption);
                        setFieldValue(
                          "national_Card_Doc.nationalCard",
                          selectedOption.id
                        );
                      }}
                      errors={errors?.national_Card_Doc?.nationalCard}
                      touched={touched?.national_Card_Doc?.nationalCard}
                    />
                  </div>

                  <div className="mt-2">
                    <Combobox
                      label={"Residential Type"}
                      name={"national_Card_Doc.residentialTyp"}
                      onChange={(selectedOption: any) => {
                        console.log(
                          "Selected Residential Type:",
                          selectedOption.value
                        );
                        setFieldValue(
                          "national_Card_Doc.residentialTyp",
                          selectedOption.value
                        );
                      }}
                      placeholder={"Select Residential Type"}
                      loadOptions={() => residentialTypData()}
                      istouched={touched?.national_Card_Doc?.residentialTyp}
                      error={errors?.national_Card_Doc?.residentialTyp}
                    />
                  </div>

                  <div className="mt-2">
                    <TextInput
                      name="national_Card_Doc.residentialId"
                      type="text"
                      placeholder="Residential ID"
                      label="Residential ID"
                      value={values?.national_Card_Doc?.residentialId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors?.national_Card_Doc?.residentialId}
                      istouched={touched?.national_Card_Doc?.residentialId}
                    />
                  </div>
                </>
              )}

              <div className="mt-2">
                <TextInput
                  name="national_Card_Doc.documentNo"
                  type="text"
                  placeholder="Document Number"
                  label="Document Number"
                  value={values?.national_Card_Doc?.documentNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.national_Card_Doc?.documentNo}
                  istouched={touched?.national_Card_Doc?.documentNo}
                />
              </div>

              <div className="mt-2">
                <TextInput
                  name="national_Card_Doc.document"
                  type="file"
                  label="Document"
                  onChange={(e: any) =>
                    setFieldValue(
                      "national_Card_Doc.document",
                      e.target.files[0]
                    )
                  }
                  error={errors?.national_Card_Doc?.document}
                  istouched={touched?.national_Card_Doc?.document}
                />
              </div>
            </div>

            {/* Passport */}
            <div className="space-y-4 border p-5 rounded-md mt-5">
              <div className="">
                <h1 className="font-semibold leading-6">Passport Document</h1>
              </div>

              <div className="mt-2">
                <TextInput
                  name="passport_Card.documentNo"
                  type="text"
                  placeholder="Document Number"
                  label="Document Number"
                  value={values?.passport_Card?.documentNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.passport_Card?.documentNo}
                  istouched={touched?.passport_Card?.documentNo}
                />
              </div>

              <div className="mt-2">
                <TextInput
                  name="passport_Card.document"
                  type="file"
                  label="Document"
                  onChange={(e: any) =>
                    setFieldValue("passport_Card.document", e.target.files[0])
                  }
                  error={errors?.passport_Card?.document}
                  istouched={touched?.passport_Card?.document}
                />
              </div>

              {/* Expiry */}
              <div className="mt-2">
                <TextInput
                  name={`passport_Card.expiry_date`}
                  type={`date`}
                  label={`Expiry Date`}
                  value={values.expiry_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.passport_Card?.expiry_date}
                  istouched={touched?.passport_Card?.expiry_date}
                />
              </div>
            </div>

            <div
              className="my-4 bg-yellow-300 rounded-xl px-2 py-3 text-center cursor-pointer "
              onClick={handleSubmit}
            >
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}
