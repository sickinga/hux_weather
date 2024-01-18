import { GeocoderResult } from "@/types";
import { useQuery } from "@tanstack/vue-query";
import { Ref, toValue, watch } from "vue";

function url(searchTerm: string) {
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}&types=place`;
}

export function useCitySearch(searchTerm: Ref<string>) {
    const fetchCities = async (searchTerm: string) => {
        if (searchTerm.length < 3) return Promise.resolve({} as GeocoderResult);
        const response = await fetch(url(toValue(searchTerm)));
        return response.json();
    };

    const query = useQuery<GeocoderResult>({
        queryKey: ["city-search", searchTerm],
        queryFn: () => fetchCities(toValue(searchTerm)),
    });

    watch(searchTerm, () => query.refetch());

    return query;
}
