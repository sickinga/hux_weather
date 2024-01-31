<script  setup lang="ts">
import { useRoute } from "vue-router";

import WeatherDetailCard from '@/components/weather-detail-card/WeatherDetailCard.vue'
import ForecastDetailItem from '@/components/forecast-detail-item/ForecastDetailItem.vue'
import { useWeatherApi } from "../components/weather-card/weather-card.hook";
import { computed, ref, watch } from "vue";

const route = useRoute();
const lat = ref(route.query.lat as string ?? '');
const lng = ref(route.query.lng as string ?? '');
const query = useWeatherApi(lat, lng);
const name = computed(() =>route.query.name as string ?? '');

watch(() => route.query, () => {
    lat.value = route.query.lat as string ?? '';
    lng.value = route.query.lng as string ?? '';
});

</script>
<template>
    <div>
        <h1>{{ name }}</h1>
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
</style>