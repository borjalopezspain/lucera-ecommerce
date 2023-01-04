export const mutations = {
    set_addToCart(state, item) {
        state.state_cart.push(item);
    },
    set_incrementItemAmount(state, item) {
        item.quantity++;
    },
    set_removeFromCart(state, item) {
        state.state_cart = state.state_cart.filter(product => product.id !== item.id);
    },
    set_decrementItemAmount(state, item) {
        item.quantity--;
    },
    set_toggleCart(state) {
        state.state_isCartVisible = !state.state_isCartVisible;
    }
};