<script setup lang="ts">
const productsStore = useProductsStore();
const { getCategories: categories } = storeToRefs(productsStore);

const categoriesMenu = computed(() => {    
    const categoryNames = categories.value.map(category => category.name);

    return ['All', ...categoryNames];
});
</script>

<template>
    <UModal 
        title="Manage Categories"
        fullscreen
    >
        <UButton label="Categories" size="sm" class="w-1/2 place-content-center" />
        <template #body>
            <div class="grid grid-cols-5 overflow-auto">
                <div class="container-product-card" v-for="category in categories">
                    <UCard variant="subtle" class="w-full h-full py-1">
                        <div class="flex justify-between">
                            <UTooltip :text="category.name">
                                <h5 class="w-1/2 place-content-center">
                                    {{ category.name }}
                                </h5>
                            </UTooltip>
                            <div class="flex gap-2">
                                <UButton icon="i-fa-edit"  size="sm"></UButton>
                                <UButton icon="i-fa-trash"  color="error" size="sm"></UButton>
                            </div>
                        </div>
                    </UCard>
                </div>
            </div>
            
        </template>
        <template #footer class="overflow-auto">
            <UButton label="Add Product" size="sm" />
        </template>
    </UModal>
</template>