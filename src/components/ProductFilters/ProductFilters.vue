<template>
    <div class="product-filters">
        <SharedSelect
            id="product-filters"
            class="product-filters__select"
            :label-text="filterLabel"
            :options-list="filterList"
            :selected-option="selectedOption"
            @onChange="handleFilterChange"
        />
        <div class="product-filters__clear">
            <SharedButton
                label-text="Clear filters"
                @onClick="handleClearFilters"
            />
        </div>
    </div>
</template>

<script>
import SharedSelect from '@/components/shared/SharedSelect/SharedSelect.vue';
import SharedButton from '@/components/shared/SharedButton/SharedButton.vue';
export default {
    name: 'ProductFilters',
    props: {
        filterList: {
            type: Array,
            required: true,
        },
        selectedOption: {
            type: String,
            required: true,
        },
        filterLabel: {
            type: String,
            required: true,
        }
    },
    components: {
        SharedSelect,
        SharedButton,
    },
    methods: {
        handleFilterChange(selectedFilter) {
            this.$emit('onFilterChange', selectedFilter);
        },
        handleClearFilters() {
            this.$emit('onClearFilters');
        }
    }
}
</script>

<style lang="scss" src="./ProductFilters.scss" />