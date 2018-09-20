<template>
	<div class="input">

		<div class="container">
			<div :class="{rail: true, active: on}" @click.self="toggle">
				<div :class="{train: true, active: on}" @click.self="toggle"></div>
			</div>
		</div>

		<label>{{ label }}</label>

		<label class="error">{{ error }}</label>
		
	</div>
</template>

<script>
	export default {
		name: "boolean",
		props: {
			value: {
				type: Boolean,
				default: false
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
				on: this.value
			}
		},
		methods: {
			toggle() {
				this.on = !this.on;
				this.$emit("input", this.on);
			}
		}
	}
</script>

<style scoped>

	.checkbox {
		display: none;
	}

	.rail {
		position: relative;
		width: 40px;
		height: 15px;
		border-radius: .8em;
		background: var(--label-background);
		cursor: pointer;
        transition: var(--transition);
	}

	.train {
		position: absolute;
		cursor: pointer;
		width: 20px;
		height: 20px;
		top: -2.5px;
		right: 20px;
		background: var(--white);
		border-radius: 50%;
      	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 1px 5px 0 rgba(0, 0, 0, 0.12);
        transition: right .2s linear;
	}

	.rail.active {
		background: var(--input-border-focused-color);
        transition: var(--transition);
	}

	.train.active {
		right: 0;
        transition: right .2s linear;
	}

	.container {
		height: 55px;
		padding: 17.5px;
		border: 2px solid var(--label-background);
		width: 100%;
		border-radius: 0 3px 3px 3px;
		background: var(--white);
	}
</style>