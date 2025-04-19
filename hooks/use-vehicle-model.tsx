import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export interface IVehicleModel {
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
  data: VehicleModel[]
}

export interface VehicleModel {
  id: number
  make_id: number
  name: string
  __message: string
}

/*
 * This hook uses the make of a car to get the
 * available models of the car.
 */
export function useVehicleModel(make?: string) {
  return useQuery<IVehicleModel>({
    queryKey: ["vehicle_year", make],
    queryFn: () => fetchVehicleModel(make),
    retry: 3,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export async function fetchVehicleModel(make?: string) {
  if (!make) return []
  const hostUri = `https://carapi.app/api/models?make=${make}`
  const { data } = await axios.get(hostUri)

  return data
}
