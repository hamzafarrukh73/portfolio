<script setup>
const layoutStore = useLayoutStore()
const userStore = useUserStore()

const sidebarToggleClassList = computed(() => {
    return {
        'hidden': layoutStore.isSidebarToggleHidden,
    };
});

const navitems = [
    {
        label: 'Home',
        to: '/'
    },
    {
        label: 'Skills',
        to: '/skills'
    },
    {
        label: 'Projects',
        to: '/projects'
    },
    
]
</script>

<template>
    <div class="topbar-start">
        <h3 class="font-bold">Portfolio</h3>
    </div>
    <div class="topbar-center">
        <UButton :label="items.label" :to="items.to" color="neutral" variant="ghost" v-for="items in navitems" :key="items"></UButton>
    </div>
</template>

<style scoped>
.topbar-start,
.topbar-center,
.topbar-end {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.topbar-start {
    width: 25%;
    justify-content: start;
}
.topbar-center {
    flex-grow: 1;
    justify-content: end;
    gap: 1.5rem;
}
.topbar-end {
    width: 25%;
    justify-content: end;
}
</style>