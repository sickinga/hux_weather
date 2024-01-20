<script setup lang="ts">
import { defineProps } from "vue";
import { formatDate } from '../utils/dateUtils.ts'

const props = defineProps({
    data: Object
})
</script>

<template>
    <b-list-group-item class="item">
        <div class="forecast-container">
            <div>{{ formatDate(props.data?.date) }}</div>
            <div><img class="forecast-icon" :src="props.data?.day.condition.icon" :alt="props.data?.day.condition.text" />
            </div>
            <div><span class="max-color">{{ props.data?.day.maxtemp_c.toFixed(1) }} °C</span> | <span class="min-color">{{
                props.data?.day.mintemp_c.toFixed(1) }} °C</span></div>
        </div>

    </b-list-group-item>
</template>
  

  
<style scoped>
.forecast-icon {
    width: 50px;
    height: 50px;
}

.forecast-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.max-color {
    color: red;
}

.min-color {
    color: blue;
}

.item {
    padding-top: 0px;
    padding-bottom: 0px;
}
</style>