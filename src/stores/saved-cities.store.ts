import { City } from "@/types/city";
import { defineStore } from "pinia";

function isCityEqual(a: City, b: City) {
    return a.lat === b.lat && a.lng === b.lng;
}

export const useSavedCitiesStore = defineStore("saved-cities", {
    state: () => {
        const cities = localStorage.getItem("cities");
        return {
            cities: cities ? JSON.parse(cities) : [],
        } as { cities: City[] };
    },
    actions: {
        addCity(city: City) {
            if (city.name === "Your current location") {
                const currentLocationIndex = this.cities.findIndex((c) => c.name === "Your current location");
                if (currentLocationIndex !== -1) this.cities.splice(currentLocationIndex, 1);
            }
            if (this.cities.some((c) => isCityEqual(c, city))) return;
            this.cities.unshift(city);
        },
        removeCity(city: City) {
            this.cities.splice(this.cities.findIndex((c) => isCityEqual(c, city)), 1);
        },
    },
});