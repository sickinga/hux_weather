import { useQuery } from "@tanstack/vue-query";

export function useCitySearch() {
    const test = useQuery({ queryKey: ["city-search"], queryFn: () => {} });
}
