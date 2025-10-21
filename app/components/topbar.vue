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
        label: 'Projects',
        to: '/projects'
    },
    {
        label: 'Contact Me',
        to: '/contact'
    },
]
</script>

<template>
    <div class="flex place-content-center gap-3 w-1/2 py-1 bg-black rounded">
        <UButton :label="items.label" :to="items.to" class="" v-for="items in navitems" :key="items"></UButton>
    </div>
</template>

<style scoped>
.topbar-start,
.topbar-center,
.topbar-end {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.topbar-start {
    width: 25%;
    justify-content: start;
}
.topbar-center {
    flex-grow: 1;
    justify-content: center;
}
.topbar-end {
    width: 25%;
    justify-content: end;
}
</style>