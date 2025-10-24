<script setup>
// definePageMeta({
//     layout: 'empty'
// })
</script>

<template>
    <div class="layout-index">
        <div class="container-profile">
            <UButton label="hello"></UButton>
        </div>
        <div class="container-stacks">
            <UButton label="hello"></UButton>
        </div>
    </div>
</template>

<style scoped>
.layout-index {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 8fr 2fr;
    grid-template-columns: 1fr;
    grid-template-areas: 
        'profile'
        'stacks';
    box-sizing: border-box;
}
</style>