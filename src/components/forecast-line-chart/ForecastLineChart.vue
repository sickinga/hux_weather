<template>
    <Line :data="data" :options="options" />
</template>
  
<script lang="ts">
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const options = {
    responsive: true,
    maintainAspectRatio: false,
};

export default {
    name: 'ForecastLineChart',
    components: {
        Line
    },
    props: {
        data: Object,
    },
    data() {
        return {
            options: options
        }
    }
}
</script>
  