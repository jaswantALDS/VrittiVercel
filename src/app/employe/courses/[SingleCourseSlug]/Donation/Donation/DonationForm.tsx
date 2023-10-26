import { loadStripe } from "@stripe/stripe-js";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DonationForm = ({ currency }: any) => {
  const [isReady, setIsReady] = useState(true);
  const router = useRouter();
  const stripePromise = loadStripe("your-public-stripe-key");

  const handleSubmit = async (values: any, { setFieldError }: any) => {
    setIsReady(false);
    const { amount } = values;

    try {
      const stripe: any = await stripePromise;
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100, // Stripe deals with cents
          currency: currency.toLowerCase(),
        }),
      });

      const { clientSecret } = await response.json();
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: stripe.elements.getElement("card"),
        },
      });

      if (error) {
        console.error(error);
        setIsReady(true);
      } else {
        // Payment succeeded, navigate to success page or handle accordingly
        router.push("/success");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setIsReady(true);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          amount: "",
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
        }: any) => (
          <div className="flex flex-wrap items-center mt-10">
            <div className="pb-8 w-full cyan lg:px-4">
              <input
                value={values.amount}
                onChange={handleChange("amount")}
                onBlur={handleBlur("amount")}
                name="amount"
                type="number"
                placeholder="Amount"
                className="pb-2 bg-transparent focus:bg-transparent w-full placeholder-[#8F8F8F] border-b-[1px] border-colorTwo text-space"
              />
              {errors.amount && touched.amount ? (
                <p className="text-red-500">{errors.amount}</p>
              ) : null}
            </div>

            <div className="w-full flex justify-center items-center">
              {isReady ? (
                <div className="flex flex-row justify-center items-center w-full">
                  <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className={`bg-colorTwo rounded-full px-10 lg:px-20 mt-10 py-2`}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <button className={`bg-[#ececec5e] rounded-full px-20 py-3`}>
                  Loading
                </button>
              )}
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default DonationForm;
