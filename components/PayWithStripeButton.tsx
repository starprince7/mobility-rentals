import React from "react";
import { useSelector } from "react-redux";
import {
  PaymentSheetError,
  StripeError,
  useStripe,
} from "@stripe/stripe-react-native";
import { fetchPaymentIntent, verifyPayment } from "@/http";
import { NiceButton } from "./ui";
import { selectBookingInformation } from "@/store/booking-info-slice";
import { sleep } from "@/utils";

interface Props {
  onSuccess: (paymentDetails: {
    stripeClientId: string;
    paymentIntentClientSecret: string;
    paymentStatus: string;
  }) => void;
  onFailure: (error: StripeError<PaymentSheetError> | undefined) => void;
}

export function PayWithStripeButton({ onSuccess, onFailure }: Props) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { totalPrice } = useSelector(selectBookingInformation);
  const [paymentState, setPaymentState] = React.useState({
    paymentIntentClientSecret: "",
    paymentIntentId: "",
    isLoading: false,
  });

  const initializePaymentSheet = React.useCallback(async () => {
    if (!paymentState.paymentIntentClientSecret) return;

    try {
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Rentit, Inc.",
        paymentIntentClientSecret: paymentState.paymentIntentClientSecret,
        returnURL: "renit://booking-success",
      });

      if (error) {
        console.error("Error initializing stripe payment:", error);
        alert(`Error initializing stripe payment: ${error.message}`);
        onFailure(error);
      }
    } catch (error) {
      console.error(
        "Unexpected error during payment sheet initialization:",
        error
      );
      onFailure(error as StripeError<PaymentSheetError>);
    }
  }, [paymentState.paymentIntentClientSecret, onFailure]);

  React.useEffect(() => {
    initializePaymentSheet();
  }, [paymentState.paymentIntentClientSecret, initializePaymentSheet]);

  const handlePaymentSuccess = React.useCallback(
    async (paymentIntentId: string, paymentIntentClientSecret: string) => {
      if (!paymentIntentId) return;

      try {
        const { status, error: verificationError } = await verifyPayment(
          paymentIntentId
        );

        if (verificationError) {
          throw new Error(`Payment verification failed: ${verificationError}`);
        }

        onSuccess({
          stripeClientId: paymentIntentClientSecret,
          paymentIntentClientSecret: paymentIntentClientSecret,
          paymentStatus: status,
        });
      } catch (error) {
        console.error("Error handling payment success:", error);
        onFailure(error as StripeError<PaymentSheetError>);
      }
    },
    [onSuccess, onFailure]
  );

  const checkout = React.useCallback(async () => {
    setPaymentState((prev) => ({ ...prev, isLoading: true }));

    try {
      const { data, error: paymentIntentError } = await fetchPaymentIntent({
        amount: totalPrice,
        currency: "usd",
        email: "hardcodedemail@gmail.com",
      });

      if (paymentIntentError) {
        throw new Error(`Error creating payment intent: ${paymentIntentError}`);
      }

      const paymentIntentClientSecret = data.clientSecret;
      const paymentIntentId = data.paymentIntentId;

      setPaymentState((prev) => ({
        ...prev,
        paymentIntentClientSecret,
        paymentIntentId,
      }));

      await sleep(200);
      const { error: presentationError } = await presentPaymentSheet();

      if (presentationError) {
        throw presentationError;
      }

      // Will handle payment verification at the server-side.
      await handlePaymentSuccess(paymentIntentId, paymentIntentClientSecret);
    } catch (error) {
      console.error("Error during checkout:", error);
      onFailure(error as StripeError<PaymentSheetError>);
    } finally {
      setPaymentState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [totalPrice, handlePaymentSuccess, presentPaymentSheet, onFailure]);

  return (
    <NiceButton loading={paymentState.isLoading} onPress={checkout}>
      Checkout
    </NiceButton>
  );
}
