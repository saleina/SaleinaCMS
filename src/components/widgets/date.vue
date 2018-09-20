<template>
    
    <s-input
        :label="label"
        type="date"
        :id="id"
        :error="error"
        :value="value"
        @input="input"/>

</template>

<script>

    import flatpickr from "flatpickr";

    export default {
        name: "date",
        props: {
            value: {
                type: String
            },
            label: {
                type: String
            },
            error: {
                type: String
            },
            format: {
                type: String
            }
        },
        data() {
            return {
                id: `date-${Math.random().toString().substring(3)}`
            }
        },
		mounted() {

            const format = this.format || "Y-m-d";

            let value = this.value || "";

			flatpickr(`#${this.id}`, {
                altInput: true,
				dateFormat: format,
				altFormat: "F j, Y",
				defaultDate: value
			});
            
		},
        methods: {
            input(value) {
                this.$emit("input", value);
            }
        }
    };
</script>