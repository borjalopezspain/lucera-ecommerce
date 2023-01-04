<template>
    <div class="heart">
        <HeartFilledIcon
            v-if="isLiked"
            data-testid="heart-filled"
            aria-hidden="true"
            class="heart__icon heart__icon--filled"
        />
        <HeartIcon
            v-else
            data-testid="heart-empty"
            aria-hidden="true"
            class="heart__icon heart__icon--empty"
        />
    </div>
</template>

<script>
import HeartFilledIcon from '@/components/icons/heartFilled.vue';
import HeartIcon from '@/components/icons/heart.vue';

export default {
    components: {
        HeartFilledIcon,
        HeartIcon,
    },
    props: {
        isLiked: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style src="./LikeHeart.scss" scoped lang="scss"/>
