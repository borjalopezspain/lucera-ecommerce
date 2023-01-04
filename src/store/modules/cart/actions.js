export const actions = {
    axn_addToCart({ commit, state }, item) {
        const productInCart = state.state_cart.find(product => product.id === item.id);
        const reachedStock = item.stock === productInCart?.quantity;

        if(reachedStock) {
            // TODO: show toast with max stock amount
            return;
        }

        if(productInCart) {
            commit('set_incrementItemAmount', productInCart)
        } else {
            commit('set_addToCart', {
                ...item,
                quantity: 1
            });
        }
    },
    axn_removeFromCart({ commit, state }, item) {
        const productInCart = state.state_cart.find(product => product.id === item.id);
        const isQuantityOne = productInCart?.quantity === 1;

        if(productInCart && !isQuantityOne) {
            commit('set_decrementItemAmount', productInCart);
        } else {
            commit('set_removeFromCart', productInCart);
        }
    },
    axn_toggleCart({commit}) {
        commit('set_toggleCart');
    }
};