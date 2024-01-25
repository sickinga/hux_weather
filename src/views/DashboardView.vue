<script setup lang="ts">
import { ref, watch } from "vue";
import WeatherCard from '@/components/weather-card/WeatherCard.vue'

const defaultLat = "48.367470"
const defaultLng = "14.516010"
const locationName = "Hagenberg im Mühlkreis"


const selectedUnit = ref<string>(localStorage.getItem('tempUnit') || "_c");
const options = [
    { value: "_c", text: 'Celsius' },
    { value: '_f', text: 'Fahrenheit' },
];

watch(() => selectedUnit.value, () => {
    localStorage.setItem('tempUnit', selectedUnit.value)
})

</script>

<template>
    <div class="container">
        <h1>Weather Dashboard</h1>
        <b-form-select v-model="selectedUnit" :options="options" size="sm" class="unit-select" />
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