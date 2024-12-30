import { useDeepLinks } from "@/hooks";

export function DeepLinkListener({ children }: { children: React.ReactNode }) {
  useDeepLinks();

  return <>{children}</>;
}
