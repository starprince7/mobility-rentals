import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export interface IVehicleTrim {
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
    data: VehicleTrim[]
}

export interface VehicleTrim {
    id: number
    name: string
    make_model_id: number
    year: 2019
    description: string
    msrp: string
    invoice: string
    created: string
    modified: string
}

export function useVehicleTrim(make: string, model: string) {
    return useQuery<IVehicleTrim>({
        queryKey: ["vehicle_trim", make, model],
        queryFn: () => fetchVehicleTrim(make, model),
        retry: 3,
        staleTime: 10 * 60 * 1000, // 10 minutes
    })
}

export async function fetchVehicleTrim(make: string, model: string) {
    if (!make || !model) return []
    const hostUri = `https://carapi.app/api/trims?make=${make}`
    const { data } = await axios.get(hostUri)

    return data
}
