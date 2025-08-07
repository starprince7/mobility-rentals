import { useQuery } from "@tanstack/react-query";
import { IVehicle } from "@/types";
import apiClient from "@/config/api";


export function useVehicleDetail(id: string | string[] | number) {
  return useQuery<IVehicle>({
    queryKey: ["vehicleDetail", id],
    queryFn: () => fetchVehicleDetail(id),
    retry: 3,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export async function fetchVehicleDetail(id: string | string[] | number) {
  if (!id) return null
  try {
    const { data } = await apiClient.get(`/vehicles/${id}`);

    return data;
  } catch (e: any) {
    console.log("Error fetching from server:", e);
  }
} 
