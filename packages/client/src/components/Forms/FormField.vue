<template>
    <div class="form-field" :class="{ error: error && !blockErrors, search }">
        <label class="form-field__control">
            <textarea
                v-if="type === 'textarea'"
                class="form-field__control-input"
                placeholder=" "
                required
                v-bind="$attrs"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
            />
            <input
                v-else
                class="form-field__control-input"
                placeholder=" "
                required
                v-bind="$attrs"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                :type="type"
            />
            <span class="form-field__control-label"
                >{{ label }}{{ required ? "*" : "" }}</span
            >
            <div class="form-field__control-bar" />
            <div class="form-field__control-icon" v-if="search">
                <Icon icon="search" />
            </div>
        </label>
        <p className="form-field__error" v-if="!blockErrors">{{ error }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@/components/Icon";

const component = defineComponent({
    name: "FormField",
    components: { Icon },
    emits: ["update:modelValue"],
    props: {
        modelValue: {
            type: String,
            required: true
        },
        type: {
            type: String as () => "text" | "password" | "number" | "textarea",
            default: "text"
        },
        label: {
            type: String,
            required: true
        },
        error: { type: String },
        required: { type: Boolean },
        blockErrors: { type: Boolean },
        search: { type: Boolean }
    },
});

export default component;
</script>

<style lang="scss" scoped>
$animation-duration: 0.4s;
$top-padding: 18px;
@mixin label-inactive() {
    font-size: 1.2rem;
    transform: translateY(0);
}

@mixin label-active() {
    font-size: 0.75rem;
    transform: translateY(-14px);
}

.form-field {
    $form-field: &;
    display: block;
    margin-bottom: 0.3rem;
    &__control {
        display: block;
        overflow: hidden;
        position: relative;
        width: 100%;
        &-label {
            @include label-active();
            display: block;
            font-weight: normal;
            text-align: left;
            position: absolute;
            top: 0;
            left: 0;
            margin: 0;
            padding: $top-padding 0 0;
            transition: all $animation-duration;
            user-select: none;
            width: 100%;
        }
        &-input {
            display: block;
            appearance: none;
            background: transparent;
            border: none;
            outline: none;
            border-bottom: 1px solid $dark-gray;
            font-size: 1.2rem;
            margin-top: 24px;
            padding: 0 12px 10px 12px;
            width: 100%;
            .search & {
                padding: 0 26px 10px 12px;
            }
            @at-root {
                textarea#{&} {
                    height: 150px;
                    resize: none;
                }
            }
            // IE 10-11
            &:-ms-input-placeholder ~ .form-field__control-label {
                @include label-inactive();
            }
            // All other browsers
            &:placeholder-shown ~ .form-field__control-label {
                @include label-inactive();
            }
            &:focus,
            &:-webkit-autofill {
                ~ .form-field__control-label {
                    color: $primary;
                    @include label-active();
                }
                ~ .form-field__control-bar {
                    border-bottom: 3.5px solid $primary;
                    transform: scaleX(150);
                }
            }
        }
        &-bar {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            border-bottom: 2px solid $primary;
            content: "";
            display: block;
            margin: 0 auto;
            transform: scaleX(0);
            transition: all $animation-duration;
            width: 1%;
        }
        &-icon {
            position: absolute;
            top: $top-padding;
            right: 0;
            margin: 0;
        }
    }
    &.error {
        #{$form-field}__control {
            &-label {
                color: $dark-red;
            }
            &-input {
                border-bottom: 1px solid $dark-red;
                &:focus ~ #{$form-field}__control-bar {
                    border-bottom: 3.5px solid $dark-red;
                }
            }
            &-bar {
                border-bottom: 2px solid $dark-red;
            }
        }
    }
    &__error {
        margin: 0;
        padding: 5px 12px;
        height: 2rem;
        color: $dark-red;
        text-align: left;
    }
}
</style>