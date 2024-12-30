import apiClient from "@/config/api";

export async function fetchKey() {
  try {
    const { data } = await apiClient.get("/stripe/publishable-key");
    console.log("stripe data:", data);
    return data;
  } catch (e) {
    console.log("Error fetching publishable key:", e);
  }
}

interface FetchPaymentIntentProps {
  email?: string;
  amount: number;
  currency: string;
}
type PaymentIntentResponse = {
  error: string | null;
  data: { clientSecret: string; paymentIntentId: string };
};
export async function fetchPaymentIntent({
  email,
  amount,
  currency,
}: FetchPaymentIntentProps): Promise<PaymentIntentResponse> {
  try {
    const { data } = await apiClient.post("/stripe/payment-intent", {
      email,
      amount,
      currency,
    });
    console.log("stripe payment-intent data:", data);
    return { data, error: null };
  } catch (e: any) {
    console.log("Error fetching payment-intent:", e);
    console.log("Error fetching payment-intent response:", e.response);
    return { data: null, error: e.message };
  }
}

export async function verifyPayment(paymentIntentId: string) {
  try {
    const { data } = await apiClient.post("/stripe/verify-payment", {
      paymentIntentId,
    });
    console.log("stripe verify-payment data:", data);
    return { status: data.status, error: null };
  } catch (e: any) {
    console.log("Error verifying payment:", e);
    console.log("Error verifying payment response:", e.response);
    return { status: null, error: e.message };
  }
}
