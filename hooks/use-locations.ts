import apiClient from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";

// GeoJSON Feature type for location results
export interface ILocationFeature {
  type: "Feature";
  bbox?: [number, number, number, number];
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    place_id: string;
    datasource: {
      sourcename: string;
      attribution: string;
      license: string;
      url: string;
    };
    name?: string;
    country: string;
    country_code: string;
    state: string;
    county?: string;
    city?: string;
    suburb?: string;
    street?: string;
    postcode?: string;
    category?: string;
    formatted: string;
    address_line1: string;
    address_line2: string;
    lat: number;
    lon: number;
    result_type: string;
    rank: {
      confidence: number;
      confidence_city_level?: number;
      match_type: string;
      importance?: number;
    };
    iso3166_2?: string;
    timezone: {
      name: string;
      offset_STD: string;
      offset_STD_seconds: number;
      offset_DST: string;
      offset_DST_seconds: number;
      abbreviation_STD: string;
      abbreviation_DST: string;
    };
    plus_code: string;
    plus_code_short?: string;
  };
}

export interface GeocodingResponse {
  features: ILocationFeature[];
  type: "FeatureCollection";
}

interface UseSearchLocationsOptions {
  debounceTime?: number; // Time in milliseconds to debounce the search
  minQueryLength?: number; // Minimum query length before searching
}

export function useSearchLocations(options: UseSearchLocationsOptions = {}) {
  const { 
    debounceTime = 300, // Default debounce of 300ms
    minQueryLength = 2  // Default minimum query length of 2 characters
  } = options;
  
  const [inputQuery, setInputQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle the debouncing effect
  useEffect(() => {
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // If the query is shorter than the minimum length, don't search
    if (inputQuery.length < minQueryLength) {
      setDebouncedQuery("");
      return;
    }

    // Set a new timer
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(inputQuery);
    }, debounceTime);

    // Cleanup on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputQuery, debounceTime, minQueryLength]);

  const {
    data,
    isLoading,
    error
  } = useQuery<GeocodingResponse>({
    queryKey: ["location-suggestions", debouncedQuery],
    queryFn: () => fetchLocationSuggestions(debouncedQuery),
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: debouncedQuery.length >= minQueryLength, // Only run when we have a debounced query
  });

  // Extract results from the response data
  const locationResults = data?.features || [];

  // Function to set the query from outside the hook
  const setQuery = (query: string) => {
    setInputQuery(query);
  };

  return {
    setQuery,
    locationResults,
    isLoading,
    error,
    currentQuery: inputQuery // Optionally expose the current input query
  };
}

async function fetchLocationSuggestions(searchQuery: string): Promise<GeocodingResponse> {
  if (!searchQuery) return { features: [], type: "FeatureCollection" };
  
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchQuery}&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`;
  
  try {
    const { data } = await apiClient.get<GeocodingResponse>(url);
    return data;
  } catch (e: any) {
    console.log("Error fetching from server:", e);
    return { features: [], type: "FeatureCollection" };
  }
}