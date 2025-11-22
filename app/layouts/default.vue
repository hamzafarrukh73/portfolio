<script setup>

</script>

<template>    
    <UContainer class="container-main size-full py-8">
        <slot />
    </UContainer>
</template>

<style scoped>
.container-main {
    width: 100%;
    height: calc(100vh - var(--ui-header-height));
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
}

</style>