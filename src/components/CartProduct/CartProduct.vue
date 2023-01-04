<template>
    <div
        class="cart-product"
        data-testid="cart-product"
    >
        <div class="cart-product__image">
            <img
                :src="product.imageUrl"
                :alt="product.name"
            >
        </div>
        <div class="cart-product__info">
            <div class="cart-product__name">
                {{ product.name }}
            </div>
            <div class="cart-product__amount">
                <!-- TODO: this could be a component and use SharedButton with modifiers -->
                <SharedButton
                    label-text="Remove from cart"
                    only-icon
                    :show-label="false"
                    @onClick="handleRemoveFromCart"
                >
                    <template #icon>
                        <MinusIcon class="minus"/>
                    </template>
                </SharedButton>
                <span class="amount">{{ product.quantity }}</span>
                <SharedButton
                    label-text="Add from cart"
                    only-icon
                    :show-label="false"
                    @onClick="handleAddFromCart"
                >
                    <template #icon>
                        <PlusIcon class="plus"/>
                    </template>
                </SharedButton>
            </div>
        </div>
        <div class="cart-product__price">
            {{ product.price }} <span class="currency">$</span>
        </div>
    </div>
</template>

<script>
import SharedButton from '@/components/shared/SharedButton/SharedButton.vue'
import PlusIcon from '@/components/icons/plus.vue';
import MinusIcon from '@/components/icons/minus.vue';
export default {
    name:"CartProduct",
    components: {
        SharedButton,
        PlusIcon,
        MinusIcon,
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    methods: {
        handleAddFromCart() {
            this.$emit('onAddToCart', this.product);
        },
        handleRemoveFromCart() {
            this.$emit('onRemoveFromCart', this.product);
        }
    }
}
</script>

<style lang="scss" src="./CartProduct.scss" />