<script setup lang="ts">
import { ref } from "vue";
import WeatherCard from '@/components/WeatherCard.vue'
import { TempUnit } from "@/types/weatherTypes";

const defaultLat = "48.367470"
const defaultLng = "14.516010"
const locationName = "Hagenberg im Mühlkreis"

const selectedUnit = ref<TempUnit>("_c");
const options = [
    { value: "_c", text: 'Celsius' },
    { value: '_f', text: 'Fahrenheit' },
];

</script>

<template>
    <div class="container">
        <h1>Weather Dashboard</h1>
        <b-form-select v-model="selectedUnit" :options="options" size="sm" class="unit-select"></b-form-select>
        <Suspense>
            <WeatherCard :lat="defaultLat" :lng="defaultLng" :location-name="locationName" :tempUnit="selectedUnit" />
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
