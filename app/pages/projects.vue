<script setup>
// definePageMeta({
//     layout: 'empty'
// })
</script>

<template>
    <div class="container-main flex flex-col">
        <div class="flex justify-between w-full">
            <UInput label="search"  placeholder="Search projects..." size="xl" class="w-5/10 md:w-3/10" />
            <USelectMenu v-model="value" :items="items" placeholder="Filter" size="xl" class="w-3/10 md:w-2/10" />
        </div>
        <div class="flex flex-row flex-wrap place-content-center p-2 h-full w-full overflow-auto">
            <!-- Project cards will go here -->
             <h1>Nothing here yet.</h1>
        </div>
    </div>
</template>

<style scoped>
.container-main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: start;
}
</style>