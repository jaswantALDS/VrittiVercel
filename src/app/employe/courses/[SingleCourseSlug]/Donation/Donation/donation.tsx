import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import DonationStripe from "./DonationStripe";
import DonationForm from "./DonationForm";
import ModalDerived from "@/components/ui/ModalDerived";

const stripePromise = loadStripe(
  "pk_test_51MgKscSFE6nzDhFSowyGlCzLWMKlLHFptagwMaBm9LjKLZDs8Wnk6jccOdaB2vPHlQCP6VHkFNhBQwxY920tBypw006kbHSett"
);

export default function Donation() {
  const [clientSecret, setClientSecret] = useState<any>("");

  const [isCustomModalVisible, setIsCustomModalVisible] = useState(false);
  const [currency, setCurrency] = useState();

  const getCurrency = async () => {
    // Connect ipapi.co with fetch()
    const response = await fetch(
      "https://api.ipgeolocation.io/ipgeo?apiKey=b53702d65dcb4e77a43d9c4233e72dd9"
    );
    const data = await response.json();
    // Set the IP address to the constant `ip`
    setCurrency(data.currency.code);
  };

  // Run `getCurrency` function above just once when the page is rendered
  useEffect(() => {
    getCurrency();
  }, []);

  const handleUpdateAmount = () => {
    setIsCustomModalVisible(false);
  };

  const clientKey = (e: any) => {
    setClientSecret(e);
    setIsCustomModalVisible(true);
  };

  const appearance = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <ModalDerived
        visibility={isCustomModalVisible}
        onClose={() => setIsCustomModalVisible(false)}
      >
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <DonationStripe />
          </Elements>
        )}
      </ModalDerived>
      <div className="flex flex-col flex-wrap justify-center">
        <div className="w-full  mt-5 lg:mt-0  py-4">
          <h2 className="text-lg   font-light       w-full lg:px-5 ">
            Contribuer{" "}
          </h2>
          <p className="w-full font-light text-sm mt-1 lg:px-5 ">
            Merci d'aider à la croissance notre communauté de potes ! :)
          </p>

          <DonationForm
            currency={currency}
            handleChange={handleUpdateAmount}
            clientKey={clientKey}
          />
        </div>
      </div>
    </>
  );
}
