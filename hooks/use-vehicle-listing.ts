
import { useQuery } from "@tanstack/react-query";
import { IVehicle } from "@/types";
import apiClient from "@/config/api";

interface ListingApiResponse {
  vehicles: IVehicle[],
  pagination: {
    total: number,
    page: number,
    limit: number,
    totalPages: number,
  },
}

export function useVehicleListing() {
  return useQuery<ListingApiResponse>({
    queryKey: ["availableVehicleListing"],
    queryFn: fetchVehicleListing,
    retry: 3,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

async function fetchVehicleListing() {
  try {
    const { data } = await apiClient.get("/vehicles");
    console.log('Vehicles Listing:', data)
    return data;
  } catch (e: any) {
    console.log("Error fetching from server:", e);
  }
}
