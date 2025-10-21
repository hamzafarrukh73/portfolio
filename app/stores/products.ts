const toast = useToast();

export const useProductsStore = defineStore('productsStore', {
    state: () => ({
        fetched: false,
        products: [{}],
        productsFilters: {
            search: '',
            category__name: '',
            min_price: '',
            max_price: '',
        },
        productsOrder: '',
        categories: [{}],
        categoriesOrder: '',
        categoriesSearch: '',
    }),
    getters: {
        getProducts: (state)  => state.products,
        getCategories: (state)  => state.categories,
    },
    actions: {
        generateDummyProducts() {
            this.products = [
                { name: 'Product 1', category: 'Pizza', barcode: '10', price: 40000, image_url: "/_nuxt/assets/img/logo2.png"},
                { name: 'Product 2', category: 'Pizza', barcode: '11', price: 300, image_url: "/_nuxt/assets/img/logo2.png" },
                { name: 'Product 3', category: 'Furniture', barcode: '12', price: 2000, image_url: "/_nuxt/assets/img/logo2.png" },
                { name: 'Product 4 Product 4 Product 4 Product 4', category: 'House', barcode: '13', price: 30000 , image_url: "/_nuxt/assets/img/logo2.png" },
                { name: 'Product 1', category: 'Pizza', barcode: '10', price: 40000, image_url: "/_nuxt/assets/img/logo2.png"},
                { name: 'Product 2', category: 'Pizza', barcode: '11', price: 300, image_url: "/_nuxt/assets/img/logo2.png" },
                { name: 'Product 3', category: 'Furniture', barcode: '12', price: 2000, image_url: "/_nuxt/assets/img/logo2.png" },
                { name: 'Product 4 Product 4 Product 4 Product 4', category: 'House', barcode: '13', price: 30000 , image_url: "/_nuxt/assets/img/logo2.png" },
                { name: 'Product 1', category: 'Pizza', barcode: '10', price: 40000, image_url: "/_nuxt/assets/img/logo2.png"},
                { name: 'Product 2', category: 'Pizza', barcode: '11', price: 300, image_url: "/_nuxt/assets/img/logo2.png" },
                { name: 'Product 3', category: 'Furniture', barcode: '12', price: 2000, image_url: "/_nuxt/assets/img/logo2.png" },
            ]
        },
        generateDummyCategories() {
            this.categories = [
                { id: 1, name: "Pizza" },
                { id: 2, name: "Furniture" },
                { id: 3, name: "House" },
            ]
        },
        
        sortProducts(criteria) {
            if (criteria.split(' ')[1] == 'Desc') {
                this.productsOrder = '-' + criteria.split(' ')[0].toLowerCase();
            }
            else {
                this.productsOrder = criteria.split(' ')[0].toLowerCase();
            }
            
            this.fetched = false;
            this.fetchProducts();
        },
        filterProducts(filters) {
            if (!filters.category.includes('All')) {
                this.productsFilters.category__name = filters.category;
            }
            else {
                this.productsFilters.category__name = '';
            }
            if (filters.min_price || filters.min_price === 0) {
                this.productsFilters.min_price = filters.min_price;
            }
            else {
                this.productsFilters.min_price = '';
            }
            if (filters.max_price || filters.max_price === 0) {
                this.productsFilters.max_price = filters.max_price;
            }
            else {
                this.productsFilters.max_price = '';
            }
            this.fetched = false;
            this.fetchProducts();
        },
        resetProducts() {
            this.productsOrder = 'name';
            this.productsFilters.search = '';
            this.productsFilters.category__name = '';
            this.productsFilters.min_price = '';
            this.productsFilters.max_price = '';
            this.fetched = false;
            this.fetchProducts();
        },
        async fetchProducts() {
            if (!this.fetched) {
                try {
                    let token=localStorage.getItem('authToken')
                    let url = `http://127.0.0.1:8000/api/products/?ordering=${this.productsOrder}`;
                    let filterValue = '';
                    Object.keys(this.productsFilters).forEach(filter => {
                        filterValue = this.productsFilters[filter];
                        if (filterValue) {
                            url += `&${filter}=${filterValue}`;
                        }
                    });
                    const { data, pending, error, refresh } = await useFetch(url, {
                        method: "GET",
                        headers: {
                            'Authorization': `Token ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    this.products = data;
                    this.fetched = true;
                }
                catch (error) {
                    alert(error);
                    this.fetched = false;
                }
            }
        },
        async fetchCategories () {
            // if (!this.fetched) {
                try {
                    let token=localStorage.getItem('authToken')
                    let url = `http://127.0.0.1:8000/api/categories/?ordering=name`
                    if (this.categoriesSearch) {
                        url += `&search=${this.categoriesSearch}`
                    }
                    const { data, pending, error, refresh } = await useFetch(url, {
                        method: "GET",
                        headers: {
                            'Authorization': `Token ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    this.categories = data;
                    // this.fetched = true;
                }
                catch (error) {

                }
            // }
        }
    }
});

        // sortProducts() {
        //     let criteria = this.productSortValues.criteria.toLowerCase();
        //     let direction = this.productSortValues.direction.toLowerCase();
            
        //     this.products.sort((a, b) => {
        //         const aValue = a[criteria];
        //         const bValue = b[criteria];

        //         if (typeof aValue === 'string' && typeof bValue === 'string') {
        //             if (direction === 'descending') {
        //                 return bValue.localeCompare(aValue); // DESCENDING
        //             } else {
        //                 return aValue.localeCompare(bValue); // ASCENDING (default)
        //             }
        //         }
                
        //         if (typeof aValue === 'number' && typeof bValue === 'number') {
        //             if (direction === 'descending') {
        //                 return bValue - aValue; // DESCENDING
        //             } else {
        //                 return aValue - bValue; // ASCENDING (default)
        //             } 
        //         }

        //         return 0;
        //     });
        // },

        // filterProducts() {
        //     let filtered;
        //     this.products = this.products.filter(product => {
        //         filtered = product.category.toLowerCase().includes(this.productFilters.category.toLowerCase());
        //         if (filtered) {
        //             filtered = product.name.toLowerCase().includes(this.productFilters.search.toLowerCase()) | product.barcode.toLowerCase() === this.productFilters.search.toLowerCase()
        //         }
        //         return filtered;
        //     });
        // },