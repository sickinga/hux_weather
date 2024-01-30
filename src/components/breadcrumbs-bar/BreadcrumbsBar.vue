<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

var isDashboardPage = computed(() => {
    return (
        (router.currentRoute.value.name?.toString() ?? "").indexOf(
            "dashboard"
        ) > -1
    );
});

var currentCity = computed(() => {
    return router.currentRoute.value.query?.name?.split(",")[0] ?? "";
});
</script>

<template>
    <div v-if="!isDashboardPage" class="breadcrumbs-bar">
        <router-link :to="{ name: 'dashboard' }">
            <b-button variant="link">Dashboard</b-button>
        </router-link>
        /
        <b-button variant="link">{{ currentCity }}</b-button>
    </div>
</template>

<style scoped>
.breadcrumbs-bar {
    display: flex;
    align-items: center;
}

@media (hover: none) {
    .breadcrumbs-bar {
        display: none;
    }
}
</style>
