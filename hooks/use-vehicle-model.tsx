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
  console.log('The make: ', make)
  return useQuery<IVehicleModel>({
    queryKey: ["vehicle_model", make],
    queryFn: () => fetchVehicleModel(make),
    retry: 3,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export async function fetchVehicleModel(make?: string) {
  if (!make) return []
  console.log('Making API call for models')
 try {
    // const hostUri = `https://carapi.app/api/models?make=${make}`
    // const hostUri = `https://api.api-ninjas.com/v1/carmodels?make=${make}`
    const hostUri = `https://api.api-ninjas.com/v1/carmodels?make=audi&year=2022`
    const headers = {
      'X-Api-Key': 'GjSau4HJjEV6WhzoicyuGA==aQHg0K54vErqU4Bq',
    }
    const { data } = await axios.get(hostUri, { headers })
    console.log('The cara data: ', data)
    return data
 } catch (error) {
    console.log('Error fetching vehicle model: ', error)
    return []
 }
}
