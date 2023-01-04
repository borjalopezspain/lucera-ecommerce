<template>
    <div class="select-container">
        <label
            :for="id"
            :class="{'sr-only': !showLabel}"
            class="select-container__label-text"
        >
            {{ labelText }}
        </label>
        <select
            :id="id"
            :ref="id"
            :disabled="isDisabled"
            :data-testid="`test-${id}`"
            class="select-container__select"
            @change="handleChange"
        >
            <option
                v-if="!selectedOption"
                disabled
                selected
                value
            />

            <option
                v-for="option in optionsList"
                :key="option.value"
                :value="option.value"
                :selected="option.value === selectedOption"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'SharedSelect',
    props: {
        id: {
            type: String,
            required: true,
        },
        labelText: {
            type: String,
            required: true,
        },
        showLabel: {
            type: Boolean,
            default: true,
        },
        selectedOption: {
            type: String,
            default: '',
        },
        optionsList: {
            type: Array,
            default: () => [],
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handleChange(e) {
            this.$emit('onChange', e.target.value);
        },
    },
};
</script>

<style lang="scss" src="./SharedSelect.scss" />