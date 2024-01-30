<script setup lang="ts">
import { defineProps, computed } from "vue";
import { TempUnit } from "@/types";

import ForecastListItem from "../ForecastListItem.vue";
import { useWeatherApi } from "./weather-card.hook";
import { useSavedCitiesStore } from "@/stores/saved-cities.store";
import { City } from "@/types/city";

// eslint-disable-next-line no-undef

const props = defineProps({
    city: Object as () => City,
    tempUnit: String as () => TempUnit,
});

const store = useSavedCitiesStore();

function getTempKey() {
    return props.tempUnit === "°F" ? "temp_f" : "temp_c";
}
function getTempFeelsLikeKey() {
    return props.tempUnit === "°F" ? "feelslike_f" : "feelslike_c";
}

const query = useWeatherApi(
    props.city?.lat.toString() ?? "",
    props.city?.lng.toString() ?? ""
);
const currentData = () => query?.data.value?.current;
const forecastData = () => query?.data.value?.forecast;

const getTempUnitPostfix = computed(() => {
    return props.tempUnit === "°F" ? "_f" : "_c";
});

function removeCity() {
    if (props.city) store.removeCity(props.city);
}
</script>

<template>
    <div class="weather-card">
        <button class="remove-button" @click="removeCity()">X</button>
        <h2>{{ props.city?.name }}</h2>
        <div class="weather-info" v-if="query?.data?.value">
            <b-container class="grid-container">
                <b-row class="text-center" align-v="center">
                    <b-col class="current-temp">
                        {{ query?.data?.value?.current[getTempKey()] }}
                        {{ props.tempUnit }}
                    </b-col>
                    <b-col
                        ><img
                            class="current-icon"
                            :src="currentData()?.condition.icon"
                            :alt="currentData()?.condition.text"
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="feels-like-temp">
                        Feels like:
                        {{ query?.data?.value?.current[getTempFeelsLikeKey()] }}
                        {{ props.tempUnit }}
                    </b-col>
                    <b-col class="condition">{{
                        currentData()?.condition.text
                    }}</b-col>
                </b-row>
                <b-row>
                    <b-list-group
                        v-for="d in forecastData()?.forecastday"
                        v-bind:key="d.date"
                        class="forecast-list"
                    >
                        <forecast-list-item
                            :data="d"
                            :temp-unit="props.tempUnit"
                            :temp-unit-postfix="getTempUnitPostfix"
                        ></forecast-list-item>
                    </b-list-group>
                </b-row>
                <b-row class="last-row">
                    <b-col>
                        <div class="updated-text">
                            Last updated at: {{ currentData()?.last_updated }}
                        </div>
                    </b-col>
                    <b-col>
                        <router-link
                            :to="{
                                name: 'details',
                                query: {
                                    lat: props.city?.lat,
                                    lng: props.city?.lng,
                                    name: props.city?.name,
                                },
                            }"
                        >
                            <div class="nav-text">Go to details ></div>
                        </router-link>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <div v-else-if="query?.isPending">
            <b-spinner class="spinner" label="Spinning"></b-spinner>
        </div>
        <div v-else-if="query?.isError">
            <p class="error-message">Error fetching data</p>
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
    text-align: start;
    font-size: small;
}

.nav-text {
    margin-top: 5px;
    text-align: end;
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

.last-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
}
</style>
