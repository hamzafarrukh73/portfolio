<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = computed<NavigationMenuItem[]>(() => [
    {
        label: 'Home',
        to: '/',
    }, 
    {
        label: 'Projects',
        to: '/projects',
    }, 
    {
        label: 'Contact',
        to: '/contact',
    },
])
</script>

<template>
    <UApp>
       <UHeader title="Portfolio" class="w-screen" mode="slideover" :toggle="{ class: 'hidden' }" >
            <template #left>
                <h3 class="font-bold">Portfolio</h3>
            </template>

            <template #default class="flex md:flex">
                <UNavigationMenu :items="items" orientation="vertical" variant="pill" />
            </template>
            
            <template #right>
                <UNavigationMenu :items="items" orientation="horizontal" color="neutral" variant="pill" />
            </template>

            <template #content>
                <UNavigationMenu :items="items" orientation="vertical" variant="pill" />
            </template>
        </UHeader>

        <UMain class="">
            <NuxtLayout name="default">
                <NuxtPage />
            </NuxtLayout>
        </UMain>
    </UApp>
</template>

<style>

</style>