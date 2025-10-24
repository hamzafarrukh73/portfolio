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
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 10% 90%;
    grid-template-areas: 
        "topbar"
        "page-content";
    box-sizing: border-box;
    /* gap: 1.5rem; */
}
.topbar, .page-content {
    width: 100%;
    height: 100%;
    padding: 2rem;
    padding-inline: 3rem;
    display: flex;
    box-sizing: border-box;
    place-content: center;
    gap: 0.5rem;
}
.topbar {
    grid-area: topbar;
}
.page-content {
    grid-area: page-content;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
} 
</style>