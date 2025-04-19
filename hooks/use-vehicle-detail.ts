import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IVehicle } from "@/types";

const HOST_URL = process.env.EXPO_PUBLIC_APP_API_URL

export function useVehicleDetail(id: string | string[] | number) {
  return useQuery<IVehicle>({
    queryKey: ["vehicleDetail", id],
    queryFn: () => fetchVehicleDetail(id),
    retry: 3,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export async function fetchVehicleDetail(id: string | string[] | number) {
  try {
    const hostUri = `${HOST_URL}/vehicle/${id}`;
    const { data } = await axios.get(hostUri);

    return data;
  } catch (e: any) {
    console.log("Error fetching from server:", e);
  }
}
