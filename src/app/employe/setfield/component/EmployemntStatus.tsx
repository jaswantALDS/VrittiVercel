"use client";
import TextInput from "@/components/textinput";
import EmployeeController from "@/controllers/employee";
import { Formik } from "formik";
import Checkbox from "./Checkbox";

export default function EmployemntStatus({ handleNext, user }: any) {
  console.log("user", user);
  const employeeController = new EmployeeController(user.accessToken);

  const handleSubmit = (values: any, { setSubmitting, setFieldError }: any) => {
    if (values?.is_current_employee == true) {
      if (values?.company_name == "") {
        setFieldError("company_name", "Company Name is Required");
        setSubmitting(false);
        return;
      }
      if (values?.job_description == "") {
        setFieldError("job_description", "Job Description is Required");
        setSubmitting(false);
        return;
      }

      let value = {
        is_employee: values?.is_current_employee,
        employment_profile_completed: true,
      };
      employeeController
        .employee_update(value)
        .then((res: any) => {
          let newValue = {
            company_name: values?.company_name,
            is_current_employee: values?.is_current_employee,
            job_description: values?.job_description,
          };

          employeeController
            .employee_employments(newValue)
            .then((res: any) => {
              console.log("employeREs", res);
              setSubmitting(false);
              handleNext();
            })
            .catch((error: any) => {
              console.log("error", error);
              setSubmitting(false);
            });
        })
        .catch((error: any) => {
          console.log("error", error);
          setSubmitting(false);
        });
    } else {
      console.log("not employee");
      let value = {
        is_employee: values?.is_current_employee,
        employment_profile_completed: true,
      };
      employeeController
        .employee_update(value)
        .then((res: any) => {
          console.log(res);
          setSubmitting(false);
          handleNext();
        })
        .catch((error: any) => {
          console.log("error", error);
          setSubmitting(false);
        });
    }
  };
  return (
    <Formik
      initialValues={{
        is_current_employee:
          user && user.is_employee ? user.is_employee : false,
        company_name: "",
        job_description: "",
      }}
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
        isvalid,
      }: any) => (
        <div>
          <div className="my-5">
            <Checkbox
              label="Is Current Employee"
              name="is_current_employee"
              checked={values.is_current_employee}
              onChange={(e) => {
                setFieldValue("is_current_employee", e.target.checked);
              }}
              error={errors.is_current_employee}
              istouched={touched.is_current_employee}
            />
          </div>

          {values?.is_current_employee == true ? (
            <>
              <div className="mt-2">
                <TextInput
                  name={`company_name`}
                  type={`text`}
                  label={`company name`}
                  value={values.company_name}
                  onChange={handleChange(`company_name`)}
                  onBlur={handleBlur("company_name")}
                  error={errors?.company_name}
                  istouched={touched?.company_name}
                />
              </div>

              <div className="mt-2">
                <TextInput
                  name={`job_description`}
                  type={`text`}
                  label={`Job Description`}
                  value={values.job_description}
                  onChange={handleChange(`job_description`)}
                  onBlur={handleBlur("job_description")}
                  error={errors.job_description}
                  istouched={touched.job_description}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="w-full flex justify-end">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-yellow-300 mt-5 w-28 mb-4 rounded-xl px-2 py-3 text-center cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
}
