<template>
    <div class="pagination-container">
        <SharedButton
            class="pagination-container__prev"
            label-text="Prev"
            :is-disabled="disablePrev"
            @onClick="handleGetPrevPage"
        />
        <div class="pagination-container__page">{{ currentPage }}</div>
        <SharedButton
            class="pagination-container__next"
            label-text="Next"
            :is-disabled="disableNext"
            @onClick="handleGetNextPage"
        />
    </div>
</template>

<script>
import SharedButton from '@/components/shared/SharedButton/SharedButton.vue';
export default {
    name: 'Pagination',
    components: {
        SharedButton,
    },
    props: {
        currentPage: {
            type: Number,
            required: true,
        },
        disablePrev: {
            type: Boolean,
            required: true,
        },
        disableNext: {
            type: Boolean,
            required: true,
        }
    },
    methods: {
        handleGetPrevPage() {
            this.$emit('onGetPrevPage');
        },
        handleGetNextPage() {
            this.$emit('onGetNextPage');
        }
    }
}
</script>

<style lang="scss" src="./Pagination.scss" />