<script setup lang="ts">
import { defineProps, computed } from "vue";
import { ForecastData, TempUnit } from "@/types";
import { formatDate } from '../../utils/date.utils.ts'
import ForecastLineChartWrapper from "../forecast-line-chart/ForecastLineChartWrapper.vue";

const props = defineProps({
    fData: Object as () => ForecastData,

})

const selectedUnit: TempUnit = localStorage.getItem('tempUnit') as TempUnit || "°C" as TempUnit;

function getMaxKey() {
    return selectedUnit === '°F' ? "maxtemp_f" : "maxtemp_c"
}

function getMinKey() {
    return selectedUnit === '°F' ? "mintemp_f" : "mintemp_c"
}

const getTempKey = computed(() => {
    return selectedUnit === '°F' ? "temp_f" : "temp_c"
})
</script>

<template>
    <div class="weather-card">
        <div class="forecast-container">
            <div class="date">{{ formatDate(props.fData?.date || "") }}</div>
            <div>Max: {{ props.fData?.day[getMaxKey()].toFixed(1) }} {{
                selectedUnit
            }} <br />Min: {{
    props.fData?.day[getMinKey()].toFixed(1) }} {{ selectedUnit }}</div>

            <div><img class="forecast-icon" :src="props.fData?.day.condition.icon" :alt="props.fData?.day.condition.text" />
                <br />
                {{ props.fData?.day.condition.text }}
            </div>
            <div class="left-align">
                Max. wind: {{ props.fData?.day.maxwind_kph }} km/h <br />
                Total precipitation: {{ props.fData?.day.totalprecip_mm.toFixed(2) }} mm <br />
                Average humidity: {{ props.fData?.day.avghumidity }} %
            </div>
        </div>
        <div class="left-align space">Temperature:</div>
        <div>

            <ForecastLineChartWrapper :hour-data="fData?.hour" :temp-key="getTempKey" />
        </div>
        <div class="astro">
            Sunrise: {{ props.fData?.astro.sunrise }} -> Sunset: {{ props.fData?.astro.sunset }}
        </div>
    </div>
</template>
  

  
<style scoped>
.weather-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.forecast-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.forecast-icon {
    width: 50px;
    height: 50px;
}

.left-align {
    text-align: start;
}

.astro {
    text-align: start;
    margin-top: 10px;
}

.space {
    margin-top: 30px;
}

@media (min-width: 992px) {
    .weather-card {
        max-width: 80%;
        margin: 10px auto;
    }
}

.date {
    font-weight: bold;
}
</style>