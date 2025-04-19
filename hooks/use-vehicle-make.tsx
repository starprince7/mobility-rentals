import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export interface IVehicleMake {
  collection: {
    url: string
    count: number
    pages: number
    total: number
    next: string
    prev: string
    first: string
    last: string
  }
  data: VehicleMake[]
}

export interface VehicleMake {
  id: number
  name: string
}

export function useVehicleMake(year?: string) {
  return useQuery<IVehicleMake>({
    queryKey: ["vehicle_year", year],
    queryFn: () => fetchVehicleMake(year),
    retry: 3,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export async function fetchVehicleMake(year?: string) {
  if (!year) return []
  const hostUri = `https://carapi.app/api/makes?year=${year}`
  const { data } = await axios.get(hostUri)

  return data
}
