<template>
	
	<s-input
		:id="id"
		type="datetime"
		:label="label"
		:value="value"
		:error="error"
		@input="input"/>

</template>

<script>

	import flatpickr from "flatpickr";

	export default {
		name: "datetime",
		props: {
			value: {
				type: String,
				default: ""
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
				id: `datetime-${Math.random().toString(36).substring(3)}`
			}
		},
		mounted() {

            const format = this.format || "Y-m-d h:i K";

			let value = this.value || "";

			flatpickr(`#${this.id}`, {
				altInput: true,
				enableTime: true,
				dateFormat: format,
				altFormat: "F j, Y h:i K",
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