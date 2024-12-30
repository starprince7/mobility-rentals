import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IAvailableVehicles } from "@/types";
import apiClient from "@/config/api";

export function useVehicleListing() {
  return useQuery<IAvailableVehicles[]>({
    queryKey: ["availableVehicleListing"],
    queryFn: fetchVehicleListing,
    retry: 3,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

async function fetchVehicleListing() {
  try {
    const { data } = await apiClient.get("/vehicle/listing");

    return data;
  } catch (e: any) {
    console.log("Error fetching from server:", e);
  }
}
