<script setup>

</script>

<template>
    <UPage>
        <UPageHeader>
            <div class="flex justify-between w-full">
                <UInput label="search"  placeholder="Search projects..." size="xl" class="w-5/10 md:w-3/10" />
                <USelectMenu v-model="value" :items="items" placeholder="Filter" size="xl" class="w-3/10 md:w-2/10" />
            </div>
        </UPageHeader>
        
        <UPageGrid class="py-5">
             <UPageCard
                title="Project Title"
                description="Description"
                orientation="horizontal"
                reverse
                class="h-fit"
            >
                <img src="~assets/img/no_preview.png" alt="Project Image" class="h-fit w-full md:w-full aspect-square object-fit" />
            </UPageCard>
        </UPageGrid>
    </UPage>
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