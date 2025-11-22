<script setup>
// Get the store instance
const layoutStore = useLayoutStore();

const layoutClassList = computed(() => {
    return {
        'layout-mobile': !layoutStore.isSidebarOpen,
    };
});

const sidebarClassList = computed(() => {
    return {
        'hidden': !layoutStore.isSidebarOpen,
    };
});
</script>

<template>    
    <div class="layout">
        <div class="topbar">
            <topbar />
        </div>
        <div class="page-content">
            <NuxtPage />
        </div>
    </div>
</template>

<style scoped>
.layout {
    width: 100vw;
    min-height: 100vh;
    display: grid;
    box-sizing: border-box;
    grid-template-rows: min-content auto;
    grid-template-areas: 
        "topbar"
        "page-content";
    /* gap: 1.5rem; */
}
.topbar, .page-content {
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    place-content: center;
    gap: 0.5rem;
}
.topbar {
    grid-area: topbar;
    padding: 1.5rem;
    padding-inline: 3rem;
}
.page-content {
    grid-area: page-content;
    padding: 1.5rem;
    padding-inline: 3rem;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
} 
</style>