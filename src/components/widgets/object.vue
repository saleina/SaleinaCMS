<template>

    <div class="input">

        <div class="widgets">
            <component
            @input="input"
            v-model="item[field.name]"
            v-for="field in fields"
            :is="field.widget"
            :parentName="`${parentName}.${field.name}`"
            :error="errors[`${parentName}.${field.name}`]"
            :errors="errors"
            :label="field.label"
            :fields="field.fields"
            :options="field.options"
            :key="field.name">
        </component>

    </div>

    <label>{{ label }}</label>

    <label class="error">{{ error }}</label>

</div>
</template>

<script>

    import { getDefaultDataForFields } from "../../utils/schema";

    export default {

        name: "s-object",

        props: {
            label: {
                type: String,
                default: () => {
                    return {};
                }
            },

            value: {
                type: Object
            },

            fields: {
                type: Array
            },

            error: {
                type: String
            },
            errors: {
                type: Object
            },
            parentName: {
                type: String
            }
        },

        data() {
            return {
                item: this.value || getDefaultDataForFields(this.fields)
            }
        },

        methods: {
            input() {
                this.$emit("input", this.item);
            }
        }
    };
</script>

<style scoped>

.widgets {
    border: 2px solid var(--label-background);
    border-radius: 0 3px 3px 3px;
}

</style>