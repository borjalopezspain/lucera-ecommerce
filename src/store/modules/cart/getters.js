export const getters = {
    get_cartTotalAmount(state) {
        return state.state_cart.reduce((total, product) => {
            const totalAmount = parseFloat(total) + (product.price * product.quantity)

            return totalAmount.toFixed(2);
        }, 0);
    },
};