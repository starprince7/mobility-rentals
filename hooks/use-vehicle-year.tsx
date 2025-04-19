import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export function useVehicleYears() {
  return useQuery<string[]>({
    queryKey: ["vehicle_year"],
    queryFn: () => fetchVehicleYears(),
    retry: 3,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export async function fetchVehicleYears() {
  try {
    const hostUri = `https://carapi.app/api/years`
    const { data } = await axios.get(hostUri)

    return data
  } catch (e: any) {
    console.log("Error fetching from server:", e)
  }
}
