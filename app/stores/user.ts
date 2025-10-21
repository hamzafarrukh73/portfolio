export const useUserStore = defineStore('userStore', {
    state: () => ({
        username: 'Test Name',
        role: 'Tester',
        permissions: {
            dashboard: true,
            products: true,
            inventory: true,
            checkout: true,
            history: true,
            admin: true
        }
    }),
    getters: {
    
    },
    actions: {
        login(name:string) {
            this.username = name;
            // this.role = role;
            // this.permissions = permissions;
        }
    }
});