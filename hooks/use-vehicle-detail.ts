import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IAvailableVehicles } from "@/types";

export function useVehicleDetail(id: string | number) {
  return useQuery<IAvailableVehicles>({
    queryKey: ["vehicleDetail", id],
    queryFn: () => fetchVehicleDetail(id),
    retry: 3,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export async function fetchVehicleDetail(id: string | number) {
  try {
    const hostUri = `https://api.starprince.dev/api/vehicle/${id}`;
    const { data } = await axios.get(hostUri);

    return data;
  } catch (e: any) {
    console.log("Error fetching from server:", e);
  }
}
