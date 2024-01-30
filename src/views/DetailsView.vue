<script  setup lang="ts">
import { useRoute } from "vue-router";

import WeatherDetailCard from '@/components/weather-detail-card/WeatherDetailCard.vue'
import ForecastDetailItem from '@/components/forecast-detail-item/ForecastDetailItem.vue'
import { useWeatherApi } from "../components/weather-card/weather-card.hook";

const route = useRoute();
const query = useWeatherApi(route.query.lat as string ?? '', route.query.lng as string ?? '')
const name = route.query.name as string ?? ''

</script>
<template>
    <div>
        <h1 class="details-view-header">{{ name }}</h1>
        <div class="weather-info" v-if="query?.data?.value">
            <WeatherDetailCard :current-data="query?.data?.value.current" />
            <li v-for="data in query?.data?.value.forecast.forecastday" :key="data.date">
                <ForecastDetailItem :f-data="data" />
            </li>
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
li {
    list-style-type: none;
}

.details-view-header {
    padding: 0 10px;
}
</style>