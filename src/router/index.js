import Vue from "vue";
import VueRouter from "vue-router";
import ProductListView from '@/views/ProductList/ProductListView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "productList",
    component: ProductListView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
