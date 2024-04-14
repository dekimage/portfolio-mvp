"use client";
import { BadgeCheck, MoveRight } from "lucide-react";
import { StripeProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import secureByImg from "../assets/secureby.png";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

const stripePromise = loadStripe("your_publishable_key_here");

const MyCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // Here you can handle the submission of payment details to your server
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "white",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#a0aec0",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-background p-4 rounded-lg shadow-md"
    >
      <div>
        <Label className="mt-4">Cardholder Name</Label>
        <Input label="Name" placeholder="Cardholder Name" className="mb-4" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium ">Card Details</label>
        <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
          <CardElement options={CARD_ELEMENT_OPTIONS} className="p-2" />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Pay VIP $1
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="flex flex-col items-center sm:flex-row h-screen">
        <div className="p-[2%] w-full sm:w-1/2">
          <div className="text-2xl font-bold mb-2">
            Pirate`s Deception{" "}
            <span className="text-yellow-400">VIP ACCESS</span>
          </div>
          <div className="flex gap-4">
            <Link href="/landing-page">
              <div className="text-gray-400">Landing Page</div>
            </Link>
            <MoveRight />
            <div className="text-blue-400">Checkout</div>
            <MoveRight />
            <div className="text-gray-400">Confirmation</div>
          </div>

          <div className="flex gap-2  mt-8 mb-[150px]">
            <BadgeCheck size={40} />
            <div className="font-bold">
              After you checkout you`ll receive an email from us with more
              information about the launch
            </div>
          </div>

          <div className="font-lg font-bold mt-8 mb-2">Reservation Review</div>

          <div className="flex justify-between border-b pb-4 w-full">
            <div>VIP RESERVATION</div>
            <div className="text-green-400 text-2xl font-bold">$1</div>
          </div>

          <div className="pt-4 text-gray-400  text-sm">
            Pirate`s Deception is almost complete. The final designs may change
            a little. We will send you an email before the campaign launches.
          </div>
        </div>

        {/* Stripe */}

        <div className="p-[2%] w-full sm:w-1/2 bg-slate-800 h-full flex flex-col justify-center">
          <Card className="p-4 rounded-lg shadow-md mb-4">
            <div className="text-2xl font-bold">1. Information</div>
            <div className="text-gray-400 text-sm mb-4">
              All transactions are secured and encrypted
            </div>
            <Label className="mt-4">Email</Label>
            <Input label="Email" placeholder="Email" className="mb-4" />
            <Label className="mt-4">Zip Code</Label>
            <Input label="Zip Code" placeholder="Zip Code" className="mt-2" />
          </Card>

          <Card className="p-4 rounded-lg shadow-md">
            <div className="text-2xl font-bold">2. Payment Details</div>
            <div className="text-gray-400 text-sm">
              All transactions are secured and encrypted
            </div>
            <MyCheckoutForm />
            <div className="w-full flex justify-center pb-2">
              <Image src={secureByImg} alt="Stripe" width={250} height={200} />
            </div>
          </Card>
        </div>
      </div>
    </Elements>
  );
};

export default CheckoutPage;
