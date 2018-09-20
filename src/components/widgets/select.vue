<template>
    <div class="input">
        <select @change="$emit('input', $event.target.value);" :value="value">
            <template v-for="(option, index) in options">
                <option v-if="typeof option === 'string'" :value="option" :key="index">{{ option }}</option>
                <option v-else :value="option.value" :key="index">{{ option.label }}</option>
            </template>
        </select>
        <label>{{ label }}</label>
        <label class="error">{{ error }}</label>
    </div>
</template>

<script>
    export default {
        name: "s-select",
        props: {
            value: {
                type: String
            },
            label: {
                type: String
            },
            options: {
                type: Array
            },
            error: {
                type: String
            }
        }
    };
</script>