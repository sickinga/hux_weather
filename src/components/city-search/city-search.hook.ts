import type { GeocoderResult } from "@/types";
import { useQuery, type UseQueryReturnType } from "@tanstack/vue-query";
import { type Ref, toValue, watch } from "vue";

function url(searchTerm: string) {
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}&types=place`;
}

export function useCitySearch(
    searchTerm: Ref<string>,
): UseQueryReturnType<GeocoderResult, Error> {
    const fetchCities = async (searchTerm: string) => {
        if (searchTerm.length < 3) return Promise.resolve({} as GeocoderResult);
        const response = await fetch(url(searchTerm));
        return response.json();
    };

    const query = useQuery<GeocoderResult>({
        queryKey: ["city-search", searchTerm],
        queryFn: () => fetchCities(toValue(searchTerm)),
    });

    watch(searchTerm, () => query.refetch());

    return query;
}
