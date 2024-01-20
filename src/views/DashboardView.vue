<script setup lang="ts">
import WeatherCard from '@/components/WeatherCard.vue'

const defaultLat = "48.367470"
const defaultLng = "14.516010"
const locationName = "Hagenberg im Mühlkreis"

</script>

<template>
    <div>
        <h1>Weather Dashboard</h1>
        <Suspense>
            <WeatherCard :lat="defaultLat" :lng="defaultLng" :location-name="locationName" />
        </Suspense>
    </div>
</template>
