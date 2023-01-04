import stockServices from '@/services/stockServices'

export const actions = {
    async axn_getAllStock({ commit }) {
        const stock = await stockServices.getAllItems();
        commit('set_getAllStock', stock);
    },
    async axn_getPaginatedStock({ commit, state }) {
        const page = state.state_currentPage;
        const limit = state.state_renderLimit;
        const filters = state.state_filters;
        const stock = await stockServices.getPaginatedItems(page, limit, filters);
        commit('set_getPaginatedStock', stock);
    },
    axn_resetPagination({commit}) {
        commit('set_resetPagination');
    },
    axn_getPrevPage({commit, state}) {
        if(state.state_currentPage > 1) {
            commit('set_updateCurrentPage', state.state_currentPage - 1);
        }
    },
    axn_getNextPage({commit, state}) {
        if(state.state_currentPage >= 0 && state.state_stock.length >= state.state_renderLimit) {
            commit('set_updateCurrentPage', state.state_currentPage + 1);
        }
    },
    async axn_toggleLike({commit}, product) {
        const modifiedProduct = {...product, favorite: !product.favorite};
        await stockServices.toggleLike(modifiedProduct);
        commit('set_toggleLike', product);
    },
    async axn_updateSearchFilters({commit}, filter) {
        commit('set_updateSearchFilters', filter);
    }
};