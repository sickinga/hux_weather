<script setup lang="ts">
import { defineProps, computed } from "vue";
import { TempUnit } from "@/types";

import ForecastListItem from "../ForecastListItem.vue";
import { useWeatherApi } from "./weather-card.hook";

const props = defineProps({
    lat: String,
    lng: String,
    locationName: String,
    tempUnit: String as () => TempUnit,
})

function getTempKey() {
    return props.tempUnit === '°F' ? "temp_f" : "temp_c"
}
function getTempFeelsLikeKey() {
    return props.tempUnit === '°F' ? "feelslike_f" : "feelslike_c"
}

const query = useWeatherApi(props.lat ?? '', props.lng ?? '')
const currentData = () => query?.data.value?.current
const forecastData = () => query?.data.value?.forecast

const getTempUnitPostfix = computed(() => {
    return props.tempUnit === '°F' ? "_f" : "_c"
})
</script>

<template>
    <div class="weather-card">
        <h2>{{ props.locationName }}</h2>
        <div class="weather-info" v-if="query?.data?.value">
            <b-container class="grid-container">
                <b-row class="text-center" align-v="center">
                    <b-col class="current-temp">
                        {{ query?.data?.value?.current[getTempKey()] }} {{ props.tempUnit }}
                    </b-col>
                    <b-col><img class="current-icon" :src="currentData()?.condition.icon"
                            :alt="currentData()?.condition.text" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        Feels like: {{ query?.data?.value?.current[getTempFeelsLikeKey()] }} {{ props.tempUnit }}
                    </b-col>
                    <b-col>{{
                        currentData()?.condition.text }}</b-col>
                </b-row>
                <b-row>
                    <b-list-group v-for="d in forecastData()?.forecastday" v-bind:key="d.date" class="forecast-list">
                        <forecast-list-item :data="d" :temp-unit="props.tempUnit"
                            :temp-unit-postfix="getTempUnitPostfix"></forecast-list-item>
                    </b-list-group>
                </b-row>
                <b-row>
                    <div class="updated-text">Last updated at: {{ currentData()?.last_updated }}</div>
                </b-row>
            </b-container>
        </div>
        <div v-else-if="query?.isPending">
            <b-spinner label="Spinning"></b-spinner>
        </div>
        <div v-else-if="query?.isError">
            <p>Error fetching data</p>
        </div>
    </div>
</template>
  

  
<style scoped>
.grid-container {
    padding-right: 0px;
}

.weather-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.weather-info {
    margin-top: 10px;
}

.current-temp {
    font-size: 3rem;
    font-weight: bold;
}

div {
    font-size: 18px;
}

.current-icon {
    width: 100px;
    height: 100px;
}

.forecast-icon {
    width: 50px;
    height: 50px;
}

.forecast-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.forecast-list {
    margin-top: 10px;
}

.updated-text {
    margin-top: 5px;
    text-align: end;
    font-size: small;
}

/* Responsive styles */
@media (min-width: 768px) {
    .grid-container {
        padding-right: 15px;
        /* Adjust as needed for desktop layout */
    }
}

@media (min-width: 992px) {
    .weather-card {
        max-width: 600px;
        /* Limit width on larger screens for better readability */
        margin: 10px auto;
        /* Center the card on larger screens */
    }
}
</style>