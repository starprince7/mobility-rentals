import { fetchKey } from "@/http";
import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";

interface Props {
  children: React.JSX.Element;
}

export function StripeConfigProvider(props: Props) {
  const [publishableKey, setPublishableKey] = React.useState("");

  const fetchPublishableKey = async () => {
    const key = await fetchKey(); // fetch key from your server here
    setPublishableKey(key);
  };

  React.useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="com.starprince.rentit.payments" // required for 3D Secure and bank redirects
    >
      {props.children}
    </StripeProvider>
  );
}

