<script setup lang="ts">
import { ref, watch } from "vue";
import { useCitySearch } from "./city-search.hook";
import { GeocoderFeature } from "@/types";

const searchTerm = ref("");
const suggestionsVisible = ref(false);
const query = useCitySearch(searchTerm);

watch(searchTerm, () => {
    suggestionsVisible.value = true;
});

document.onclick = () => {
    suggestionsVisible.value = false;
};

function handleInput(city: GeocoderFeature) {
    searchTerm.value = city.place_name;
}
</script>

<template>
    <div class="city-search">
        <input
            v-model="searchTerm"
            placeholder="Search for a city"
            class="city-search__input"
        />
        <div v-bind:hidden="!suggestionsVisible" class="city-search__suggestions">
            <div
                class="city-search__suggestion"
                v-for="city in query.data.value?.features"
                v-bind:key="city.id"
                v-on:click="handleInput(city)"
            >
                {{ city.place_name }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.city-search {
    position: relative;
}

.city-search__input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
}

.city-search__suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 10rem;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    cursor: pointer;
}

.city-search__suggestion:hover {
    background-color: #bebebe;
}
</style>
