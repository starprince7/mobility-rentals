import { useEffect } from "react";
import * as Linking from "expo-linking";

export function useDeepLinks() {
  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      if (event.url.includes("booking-success")) {
        // Payment successful logic
        alert("Handle Payment successful");
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Check for initial URL (if app was opened via deep link)
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => subscription.remove();
  }, []);
}
