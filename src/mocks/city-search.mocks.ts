import { ref } from "vue";

export const citySearchTerm = ref("Denver");

export const citySearchResponse = {
    features: [
        {
            place_name: "Denver, Colorado, United States",
            center: [-104.9847, 39.7392],
        },
        {
            place_name: "Denver International Airport (DEN), 8500 Peña Boulevard, Denver, Colorado 80249, United States",
            center: [-104.6737, 39.8617],
        },
        {
            place_name: "Denver, North Carolina, United States",
            center: [-81.0251, 35.5314],
        },
    ],
}
