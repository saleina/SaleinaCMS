<template>
	<div class="input">

		<input
			type="number"
			v-model.number="v"
			@input="$emit('input', v)"
		/>

		<label>{{ label }}</label>
		
		<label class="error">{{ error }}</label>

	</div>
</template>

<script>
	export default {
		name: "number",
		props: {
			value: {
				type: Number
			},
			label: {
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