export const mutations = {
    set_getAllStock(state, stockItems) {
        state.state_stock = stockItems;
    },
    set_resetPagination(state) {
        state.state_currentPage = 1;
    },
    set_getPaginatedStock(state, stockItems) {
        state.state_stock = stockItems;
    },
    set_updateCurrentPage(state, newCurrentPage) {
        state.state_currentPage = newCurrentPage;
    },
    set_toggleLike(state, item) {
        item.favorite = !item.favorite;
    },
    set_updateSearchFilters(state, filters) {
        state.state_filters = filters;
    }
};