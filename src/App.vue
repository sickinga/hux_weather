<script setup lang="ts">
import CitySearch from "@/components/city-search/CitySearch.vue";
import BreadcrumbsBar from "@/components/breadcrumbs-bar/BreadcrumbsBar.vue";
</script>

<template>
    <div class="city-search-wrapper">
        <CitySearch />
        <BreadcrumbsBar />
    </div>
    <router-view />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

@media (min-width: 992px) {
    .city-search-wrapper {
        /* Limit width on larger screens for better readability */
        max-width: 600px;
        /* Center the card on larger screens */
        margin: 10px auto;
    }
}
</style>
