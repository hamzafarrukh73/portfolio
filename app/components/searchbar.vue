<script setup>
    const layoutStore = useLayoutStore();
    const toast = useToast();
    
    const props = defineProps({
        store: String
    })
    const store = props.store;
    const searchValue = ref('');

    const search = async () => {
        // alert(searchData)
        toast.add({
            title: 'Searching...',
            color: 'info',
            duration: 1000
        })
        if (store === 'products') {
            
            const productsStore = useProductsStore();
            productsStore.productsFilters.search = searchValue.value;
            productsStore.fetched = false;
            productsStore.fetchProducts();
            // productsStore.filterProducts()
        }
    }
</script>

<template>
    <UForm class="form-searchbar" @submit="search">
        <UFieldGroup class="container-searchbar"  id="searchbarContainer">
            <UInput type="search" placeholder="Search" class="searchbar" color="primary" v-model="searchValue"  />
            <UButton type="submit" icon="i-fa-search" class="btn-search w-auto flex-shrink-0" color="primary" variant="subtle" size="md" />
        </UFieldGroup>
    </UForm>
    <div stlye="position:fixed; top:0; right:0;">
    </div>
</template>

<style scoped>
    .form-searchbar {
        height: 100%;
        /* flex-grow: 1; */
        width:50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .container-searchbar {
        height: 100%;
        /* width: 50%; */
        flex-grow: 1;
        display: flex;        
        /* justify-content: center; */
    }
    
    .searchbar > * {
        height: 100%;
        /* padding: 1.5%; */
        font-size: 0.7rem;
    }
    .searchbar {
        flex-grow: 1;
    }
    .btn-search {
        height: 100%;
    }
</style>