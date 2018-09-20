<template>
	<div class="input">

		<input
			:type="type"
			v-model="v"
			@input="$emit(`input`, v)"
			:id="id">

		<label>{{ label }}</label>

		<label class="error">{{ error }}</label>

	</div>
</template>

<script>
	export default {
		name: "s-input",
		props: {
			value: {
				type: String
			},
			label: {
				type: String
			},
			type: {
				type: String
			},
			id: {
				type: String
			},
			error: {
				type: String
			}
		},
		data() {
			return {
				v: this.value
			}
		}
	};
</script>

<style scoped>
</style>