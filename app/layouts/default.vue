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
    height: 100vh;
    display: grid;
    grid-template-rows: 10% 90%;
    grid-template-columns: auto;
    grid-template-areas: 
        "topbar"
        "page-content";
    box-sizing: border-box;
}
.layout-mobile {
    display: grid;
    grid-template-columns: auto;
    grid-template-areas: 
        "topbar"
        "page-content";
}
.topbar {
    grid-area: topbar;
    padding: 0.7rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}
.sidebar {
    grid-area: sidebar;    
    padding: 1.5rem;
    padding-inline: 0.7rem;
}
.page-content {
    grid-area: page-content;
    padding: 1.5rem;
    box-sizing: border-box;
}
</style>