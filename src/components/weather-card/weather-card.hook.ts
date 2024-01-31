import type { AllWeatherData } from "@/types";
import { useQuery, type UseQueryReturnType } from "@tanstack/vue-query";
import { Ref, toValue } from "vue";

function url(lat: string, lng: string) {
    return `https://api.weatherapi.com/v1/forecast.json?q=${lat}%2C${lng}&days=3&lang=en&alerts=no&aqi=no&key=${process.env.VUE_APP_WEATHER_API}`;
}

export function useWeatherApi(
    lat: Ref<string> | string,
    lng: Ref<string> | string
): UseQueryReturnType<AllWeatherData, Error> {
    const fetchWeatherData = async (lat: string, lng: string) => {
        const response = await fetch(url(lat, lng));

        if (!response.ok) {
            // https://github.com/TanStack/query/issues/2258
            throw new Error("Network response was not ok");
        }
        return response.json();
    };

    const query = useQuery<AllWeatherData>({
        queryKey: ["weather", lat, lng],
        queryFn: () => fetchWeatherData(toValue(lat), toValue(lng)),
    });

    return query;
}
