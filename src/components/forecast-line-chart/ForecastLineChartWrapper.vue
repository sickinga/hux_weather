<script setup lang="ts">
import { defineProps } from "vue";
import { HourData } from "@/types";
import ForecastLineChart from "../forecast-line-chart/ForecastLineChart.vue";

const props = defineProps({
    hourData: Object as () => HourData[],
    tempKey: String
})

const data = {
    labels: props.hourData?.map((d) => new Date(d.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
    datasets: [
        {
            label: "Temperature",
            backgroundColor: "grey",
            data: props.hourData?.map((d) => d[props.tempKey]),
        },
    ],
};

</script>

<template>
    <ForecastLineChart :data="data" />
</template>
  

  
<style scoped></style>