<template>
    <div class="header">
        <h2 class="header__text">Lucera e-commerce</h2>
        <!-- TODO: move this to component -->
        <div class="header__nav">
            <CartIcon
                class="cart"
                @click.native="handleToggleCart"
            />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import CartIcon from '@/components/icons/cart.vue';
export default {
    name: 'Header',
    components: {
        CartIcon,
    },
    methods: {
        ...mapActions('cart', ['axn_toggleCart']),
        handleToggleCart() {
            this.axn_toggleCart();
        }
    }
}
</script>

<style lang="scss" src="./Header.scss">
