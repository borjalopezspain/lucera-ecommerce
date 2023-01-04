<template>
    <div
        class="product-card"
        data-testid="product-card"
        :id="product.id"
    >
        <div class="product-card__image-container">
            <img
                class="product-card__image"
                :src="product.imageUrl"
                :alt="product.name"
            >
            <LikeHeart
                class="product-card__like"
                data-testid="like-product"
                :is-liked="!!product.favorite"
                @click.native="handleToggleLike"
            />
        </div>
        <div class="product-card__details-container">
            <div class="product-card__info">
                <h3 class="product-card__title">
                    {{ product.name }}
                </h3>
                <h4 class="product-card__description">
                    {{ product.description }}
                </h4>
            </div>
            <div class="product-card__price">
                    {{ product.price }} <span class="currency">$</span>
            </div>
        </div>
        <div class="product-card__footer-container">
            <div class="product-card__stock">
                4 left
            </div>
            <div class="product-card__actions">
                <SharedButton
                    labelText="add"
                    icon-size="xs"
                    @onClick="handleAddToCart"
                >
                    <template #icon>
                        <PlusIcon
                            aria-hidden="true"
                        />
                    </template>
                </SharedButton>
            </div>
        </div>
    </div>
</template>

<script>
import LikeHeart from '@/components/shared/LikeHeart/LikeHeart.vue'
import SharedButton from '@/components/shared/SharedButton/SharedButton.vue'
import PlusIcon from '@/components/icons/plus.vue'
export default {
    name: 'ProductCard',
    components: {
        LikeHeart,
        SharedButton,
        PlusIcon,
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    methods: {
        handleAddToCart() {
            this.$emit('onAddToCard', this.product);
        },
        handleToggleLike() {
            this.$emit('onToggleLike', this.product);
        }
    }
}
</script>

<style lang="scss" src="./ProductCard.scss"/>

