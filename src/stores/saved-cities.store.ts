import { City } from "@/types/city";
import { defineStore } from "pinia";

export const useSavedCitiesStore = defineStore("saved-cities", {
    state: () => {
        const cities = localStorage.getItem("cities");
        return {
            cities: cities ? JSON.parse(cities) : [],
        } as { cities: City[] };
    },
    actions: {
        addCity(city: City) {
            this.cities.unshift(city);
        },
        removeCity(city: City) {
            this.cities.splice(this.cities.findIndex((c) => c.lat === city.lat && c.lng === city.lng), 1);
        },
    },
});