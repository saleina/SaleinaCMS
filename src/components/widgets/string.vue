<template>

	<s-input
		type="text"
		:label="label"
		:value="value"
		:error= "error"
		@input="input"/>
	
</template>

<script>
	export default {
		name: "string",
		props: {
			value: {
				type: String
			},
			label: {
				type: String
			},
			error: {
				type: String
			}
		},
		methods: {
			input(value) {
				this.$emit("input", value);
			}
		}
	};
</script>