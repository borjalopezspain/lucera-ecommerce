<template>
    <button
        class="shared-button"
        type="button"
        :role="role"
        :disabled="isDisabled"
        :aria-disabled="isDisabled"
        :aria-label="labelText"
        :class="[{'shared-button--disabled': isDisabled},
        {'shared-button--only-icon': onlyIcon}]"
        @click="handleClick"
    >
        <span class="button-content">
            <span
                v-if="$slots.icon"
                class="button-content__icon"
                :class="`button-content__icon--size-${iconSize}`"
                aria-hidden="true"
            >
                <slot name="icon" />
            </span>
            <span
                v-if="showLabel"
                class="button-content__text"
            >
                {{ labelText }}
            </span>
        </span>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        labelText: {
            type: String,
            required: true,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        showLabel: {
            type: Boolean,
            default: true,
        },
        role: {
            type: String,
            default: 'button',
        },
        iconSize: {
            type: String,
            default: 'm',
            validator: (value) => {
                return ['xs', 's', 'm', 'l', 'xl', 'xxl'].includes(value);
            },
        },
        onlyIcon: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        handleClick(e) {
            if (!this.isLoading) {
                this.$emit('onClick', e);
            }
        },
    },
};
</script>

<style src="./SharedButton.scss" scoped  lang="scss"/>
