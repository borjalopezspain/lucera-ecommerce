import Vue from "vue";
import Vuex from "vuex";
import { cart } from "./modules/cart";
import { stock } from "./modules/stock";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        cart,
        stock,
    },
});
