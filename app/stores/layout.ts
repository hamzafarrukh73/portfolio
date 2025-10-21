export const useLayoutStore = defineStore('layoutStore', {
    state: () => ({
        isSidebarOpen: false,
        isDesktopView: true,
        isSearchbarHidden: true,
        isSidebarToggleHidden: false,
    }),
    getters: {
        isOpen: (state) => state.isSidebarOpen,
    },
    actions: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        toggleSearch() {
            this.isSearchbarHidden = !this.isSearchbarHidden;
        },
        toggleDesktopView() {
            this.isDesktopView = !this.isDesktopView;
        },
        displaySearchbar() {
            this.isSearchbarHidden = true;
        }
    },
});