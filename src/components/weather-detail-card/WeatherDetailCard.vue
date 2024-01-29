<script setup lang="ts">
import { defineProps } from "vue";
import { CurrentWeatherData, TempUnit } from "@/types";

const props = defineProps({
    currentData: Object as () => CurrentWeatherData,

})

const selectedUnit: TempUnit = localStorage.getItem('tempUnit') as TempUnit || "°C";

function getTempKey() {
    return selectedUnit === '°F' ? "temp_f" : "temp_c"
}
function getTempFeelsLikeKey() {
    return selectedUnit === '°F' ? "feelslike_f" : "feelslike_c"
}
</script>

<template>
    <div class="weather-card">
        <h4>Current weather:</h4>
        <b-container class="grid-container">
            <b-row>
                <b-col align-self="end">
                    <b-row>
                        <div class="current-temp">
                            {{ props.currentData?.[getTempKey()] }} {{ selectedUnit }}
                        </div>
                    </b-row>
                    <b-row align-h="center" class="feels-like">
                        Feels like: {{ props.currentData?.[getTempFeelsLikeKey()] }} {{ selectedUnit }}
                    </b-row>
                </b-col>
                <b-col align-self="center">
                    <b-row align-h="center">
                        <img class="current-icon" :src="props.currentData?.condition.icon"
                            :alt="props.currentData?.condition.text" />
                    </b-row>
                    <b-row align-h="center" class="condition">
                        {{ props.currentData?.condition.text }}
                    </b-row>
                </b-col>
                <b-col align-self="center" class="further-data">
                    <div>Wind: {{ props.currentData?.wind_kph }} km/h</div>
                    <div>Precipitation: {{ props.currentData?.precip_mm }} mm</div>
                    <div>Humidity: {{ props.currentData?.humidity }} %</div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
  

  
<style scoped>
.grid-container {
    padding-right: 0px;
}

h4 {
    text-align: start;
}

.weather-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


.current-icon {
    width: 120px;
    height: 100px;
}

.current-temp {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 10px;
}


/* Responsive styles */
@media (min-width: 768px) {
    .grid-container {
        padding-right: 15px;
    }
}

@media (min-width: 992px) {
    .weather-card {
        max-width: 80%;
        margin: 10px auto;
    }
}
</style>