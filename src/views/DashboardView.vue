<script setup lang="ts">
import { ref, watch } from "vue";
import WeatherCard from "@/components/weather-card/WeatherCard.vue";
import { TempUnit } from "@/types";
import { useSavedCitiesStore } from "@/stores/saved-cities.store";
import { useGeolocation } from "@vueuse/core";

const store = useSavedCitiesStore();

const selectedUnit = ref<TempUnit>(
    (localStorage.getItem("tempUnit") as TempUnit) || "°C"
);
const options = [
    { value: "°C", text: "Celsius" },
    { value: "°F", text: "Fahrenheit" },
];
const geolocation = useGeolocation();
watch((geolocation.coords), () => {
    if (geolocation.coords.value.latitude === undefined || geolocation.coords.value.longitude === undefined) return;
    store.addCity({
        name: "Your current location",
        lat: geolocation.coords.value.latitude ?? 0,
        lng: geolocation.coords.value.longitude ?? 0,
    });
});

watch(
    () => selectedUnit.value,
    () => {
        localStorage.setItem("tempUnit", selectedUnit.value);
    }
);
</script>

<template>
    <div class="container">
        <h1>Weather Dashboard</h1>
        <b-form-select v-model="selectedUnit" size="sm" class="unit-select">
            <b-form-select-option class="c-option" :value="options[0].value">{{
                options[0].text
            }}</b-form-select-option
            >"
            <b-form-select-option class="f-option" :value="options[1].value">{{
                options[1].text
            }}</b-form-select-option
            >"
        </b-form-select>
        <Suspense>
            <WeatherCard
                v-for="city in store.cities"
                :key="city.name"
                :city="city"
                :tempUnit="selectedUnit"
            />
        </Suspense>
        <div v-if="store.cities.length === 0">
            <p class="no-city-placeholder">No cities added yet. Search for a city to add it to your dashboard.</p>
        </div>
    </div>
</template>

<style scoped>
.unit-select {
    width: 150px;
}

.container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.no-city-placeholder {
    margin-top: 10px;
}
</style>
