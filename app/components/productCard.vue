<script setup>

const props = defineProps({
    products: Object
})

const products = props.products
</script>

<template>
    <div class="container-product-card" v-for="product in products">
        <UCard variant="subtle" class="w-full h-full">
            <img :src="product.image_url" :alt="product.image" class="aspect-square h-full w-full rounded">
            <div class="flex justify-between pt-3">
                <UTooltip :text="product.name">
                    <h6 class="w-1/2 place-content-center">
                        {{ product.name }}
                    </h6>
                </UTooltip>
                <p class="text-muted place-content-center">
                    {{ product.category }}
                </p>
            </div>
            <template #footer>
                <div class="flex justify-between">
                    <UTooltip :text="product.price">
                        <h6 class="w-1/2 text-toned place-content-center ">
                            ${{ product.price }}
                        </h6>
                    </UTooltip>
                    <div class="flex gap-2 justify-end">
                        <UButton icon="i-fa-edit"  size="sm"></UButton>
                        <UButton icon="i-fa-trash"  color="error" size="sm"></UButton>
                    </div>
                </div>
                
            </template>
        </UCard>
    </div>
</template>