<template>
  <div
    v-if="productList.length"
    class="product-view"
  >
    <ProductFilters
      class="product-view__filters"
      :filter-list="filterList"
      :selected-option="defaultSelectedFilter"
      :filter-label="filterLabel"
      @onFilterChange="handleFilterChange"
      @onClearFilters="handleClearFilters"
    />

    <section class="product-view__container">
      <section class="product-list-container">
        <ProductCard
          v-for="product in productList"
          :key="product.id"
          :product="product"
          @onAddToCard="handleAddToCart"
          @onToggleLike="handleToggleLike"
        />
      </section>

      <aside
        class="cart-container"
        data-testid="cart-container"
        :class="{'cart-container--show': isCartVisible}"
      >
        <div class="cart-container__items">
        <CloseIcon
          class="cart-container__close"
          @click.native="handleCloseCart"
        />
          <CartProduct
            v-for="product in productsInCart"
            :key="product.id"
            :product="product"
            :items-in-cart="getItemsInCart(product.id)"
            @onAddToCart="handleAddToCart"
            @onRemoveFromCart="handleRemoveFromCart"
          />
        </div>
        <div class="cart-container__total">
          Total amount {{ cartTotalAmount }} <span class="currency">$</span>
        </div>
      </aside>
    </section>

    <Pagination
      class="product-view__pagination"
      :disable-prev="checkIsFirstPageOfPagination"
      :disable-next="checkIsLastPageOfPagination"
      :current-page="currentPage"
      @onGetPrevPage="handleGetPrevPage"
      @onGetNextPage="handleGetNextPage"
    />

    <TopArrowIcon
      class="goToTop"
      @click.native="scrollToTop"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ProductCard from '@/components/ProductCard/ProductCard.vue';
import CartProduct from '@/components/CartProduct/CartProduct.vue';
import TopArrowIcon from '@/components/icons/topArrow.vue';
import CloseIcon from '@/components/icons/close.vue';
import ProductFilters from '@/components/ProductFilters/ProductFilters.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import scrollToTop from '@/utils/scrollToTop';

export default {
  name: "ProductListView",
  components: {
    ProductCard,
    CartProduct,
    TopArrowIcon,
    CloseIcon,
    ProductFilters,
    Pagination,
  },
  mounted() {
    this.loadProducts();
  },
  data() {
    return {
      filterLabel: 'Filter products',
      filterList: [
          {
              label: 'All products',
              value: 'all'
          },
          {
              label: 'Favorites',
              value: 'favs',
          },
          {
              label: 'No favorites',
              value: 'nofavs',
          }
      ],
      defaultSelectedFilter: 'all',
    }
  },
  computed: {
        ...mapState({
            productList: state => state.stock.state_stock,
            productsInCart: state => state.cart.state_cart,
            totalCartAmount: state => state.cart.state_total,
            isCartVisible: state => state.cart.state_isCartVisible,
            currentPage: state => state.stock.state_currentPage,
        }),
        ...mapGetters('cart', {
          cartTotalAmount: 'get_cartTotalAmount'
        }),
        checkIsFirstPageOfPagination() {
          return this.currentPage === 1;
        },
        checkIsLastPageOfPagination() {
          return this.productList < 20;
        },
    },
  methods: {
    ...mapActions('stock', [
        'axn_getPaginatedStock',
        'axn_resetPagination',
        'axn_getPrevPage',
        'axn_getNextPage',
        'axn_toggleLike',
        'axn_updateSearchFilters',
      ]),
    ...mapActions('cart', [
        'axn_addToCart',
        'axn_removeFromCart',
        'axn_toggleCart'
      ]),
    async loadProducts() {
      await this.axn_getPaginatedStock();
    },
    handleAddToCart(product) {
      this.axn_addToCart(product);
    },
    handleRemoveFromCart(product) {
      this.axn_removeFromCart(product);
    },
    getItemsInCart(id) {
      const items = this.productsInCart.filter(item => item.id === id);
      return items.length;
    },
    handleGetPrevPage() {
      this.axn_getPrevPage();
      this.loadProducts();
    },
    handleGetNextPage() {
      this.axn_getNextPage();
      this.loadProducts();
    },
    handleToggleLike(product) {
      this.axn_toggleLike(product);
    },
    handleFilterChange(selectedFilter) {
      const filters = {
        'favs': this.handleGetFavorites,
        'nofavs': this.handleGetNoFavorites,
        'all': this.handleClearFilters,
      };

      filters[selectedFilter]();
    },
    handleGetFavorites() {
      const favFilter = 'favorite=true'
      this.axn_updateSearchFilters(favFilter);
      this.loadProducts();
    },
    handleGetNoFavorites() {
      const favFilter = 'favorite=0'
      this.axn_updateSearchFilters(favFilter);
      this.loadProducts();
    },
    handleClearFilters() {
      this.axn_updateSearchFilters('');
      this.axn_resetPagination();
      this.loadProducts();
    },
    handleGoToTop() {
      scrollToTop();
    },
    handleCloseCart() {
      this.axn_toggleCart();
    }
  }
};
</script>

<style lang="scss" src="./ProductListView.scss" />
