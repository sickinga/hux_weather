<script setup lang="ts">
import { ref, watch } from "vue";
import { useCitySearch } from "./city-search.hook";
import { GeocoderFeature } from "@/types";
import { useSavedCitiesStore } from "@/stores/saved-cities.store";
import { useRouter } from "vue-router";

const searchTerm = ref("");
const suggestionsVisible = ref(false);
const query = useCitySearch(searchTerm);
const store = useSavedCitiesStore();
const router = useRouter();

watch(searchTerm, () => {
    suggestionsVisible.value = true;
});

document.onclick = () => {
    suggestionsVisible.value = false;
};

function focusInput(event: Event) {
    event.stopPropagation();
    suggestionsVisible.value = true;
}

function navigateToDetails(city: GeocoderFeature) {
    router.push({
        name: "details",
        query: {
            name: city.place_name,
            lat: city.center[1],
            lng: city.center[0],
        },
    });
}

function saveCity(city: GeocoderFeature) {
    searchTerm.value = city.place_name;
    var newCity = {
        name: city.place_name,
        lat: city.center[1],
        lng: city.center[0],
    };
    store.addCity(newCity);
}
</script>

<template>
    <div class="city-search">
        <b-form-input
            v-model="searchTerm"
            placeholder="Search for a city"
            class="city-search__input"
            type="search"
            @click="focusInput"
        ></b-form-input>

        <div
            v-bind:hidden="!suggestionsVisible"
            class="city-search__suggestions"
        >
            <div
                class="city-search__suggestion"
                v-for="city in query?.data.value?.features"
                v-bind:key="city.id"
                v-on:click="navigateToDetails(city)"
            >
                {{ city.place_name }}
                <b-button variant="link" @click="saveCity(city)">
                    <b-icon-bookmark-star-fill></b-icon-bookmark-star-fill>
                </b-button>
                </div>
        </div>
    </div>
    <div
        v-bind:hidden="
            !suggestionsVisible ||
            !query?.data.value?.features ||
            query?.data.value?.features?.length == 0
        "
        class="backdrop"
    ></div>
</template>

<style scoped>
.city-search {
    position: relative;
    z-index: 2;
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
    z-index: 1;
}

.city-search__suggestion {
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
        color: #6c757d;
    }
}

.city-search__suggestion:hover {
    background-color: #e9ecef;
    svg {
        color: #495057;
    }

    b-button:hover {
        color: #212529;
    }
}

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.8);
}
</style>
