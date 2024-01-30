<script setup lang="ts">
import { ref, watch } from "vue";
import WeatherCard from "@/components/weather-card/WeatherCard.vue";
import { TempUnit } from "@/types";
import { useSavedCitiesStore } from "@/stores/saved-cities.store";

const store = useSavedCitiesStore();

const selectedUnit = ref<TempUnit>(
    (localStorage.getItem("tempUnit") as TempUnit) || "°C"
);
const options = [
    { value: "°C", text: "Celsius" },
    { value: "°F", text: "Fahrenheit" },
];

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
</style>
