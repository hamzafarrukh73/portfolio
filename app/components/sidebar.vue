<script setup>
const sideNavs = ref([
    { id: 'dashboardNav', name: 'Dashboard', link: '/dashboard', icon: 'i-fa-home' },
    { id: 'productsNav', name: 'Products', link: '/products', icon: 'i-fa-folder-open' },
    { id:'inventoryNav', name: 'Inventory', link: '/inventory', icon: 'i-fa-cubes' },
    { id: 'checkoutNav', name: 'Checkout', link: '/checkout', icon: 'i-fa-shopping-cart' },
    { id: 'historyNav',  name: 'History', link: '/history', icon: 'i-fa-history' },
    { id: 'settingsNav',  name: 'Settings', link: '/dashboard', icon: 'i-fa-cog' },

]);

</script>

<template>
    <div class="container-navs">
       <UTooltip arrow :text="nav.name" v-for="nav in sideNavs" :key="nav.id" :id="nav.id">
            <UButton type="button" :to="nav.link" :label="nav.name" :icon="nav.icon" 
            class="flex-row rounded text-sm w-full px-2" variant="ghost" size="xl" active-color="primary" active-variant="solid" />
       </UTooltip>
    </div>
</template>

<style scoped>
.container-navs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    overflow-y: auto;
}
</style>
