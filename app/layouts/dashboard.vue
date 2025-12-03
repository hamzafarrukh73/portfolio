<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = computed<NavigationMenuItem[]>(() => [
    {
        label: 'Home',
        to: '/',
    }, 
    // {
    //     label: 'Projects',
    //     to: '/projects',
    // }, 
    {
        label: 'Contact',
        to: '/contact',
    },
])
</script>

<template>
    <UDashboardGroup>
        <UDashboardPanel>
            <template #header>
                <UDashboardNavbar mode="slideover" :toggle="false" toggleSide="right" :menu="{ side: 'right' }">
                    <template #leading>
                        <!-- <UDashboardSidebarCollapse /> -->
                    </template>
                    <template #title>
                        <h3 class="font-bold">Portfolio</h3>
                    </template>


                    <template #right>
                        <!-- <UDashboardSearchButton collapsed />
                        <UDashboardSearch /> -->
                        <UColorModeButton />
                        <UNavigationMenu :items="items" orientation="horizontal" color="neutral" variant="pill" />
                    </template>

                    <template #body>
                        <UNavigationMenu :items="items" orientation="vertical" variant="pill" />
                    </template>
                </UDashboardNavbar>
            </template>

            <template #body>
                <slot />
            </template>
            <!-- <template #footer>
                <h3 class="font-bold ">POS System</h3>
            </template> -->
        </UDashboardPanel>
    </UDashboardGroup>
</template>

<style scoped></style>