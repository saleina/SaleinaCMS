<template>
		<button :type="type" :disabled="disabled || loading">
			<span><slot></slot></span>
		    <svg v-if="loading" class="spin"  width="512" height="512" viewBox="0 0 512 512">
		        <path d="M256 0c-139.374 0-252.729 111.381-255.924 249.987 2.96-120.932 94.916-217.987 207.924-217.987 114.875 0 208 100.288 208 224 0 26.51 21.49 48 48 48s48-21.49 48-48c0-141.385-114.615-256-256-256zM256 512c139.374 0 252.729-111.381 255.924-249.987-2.96 120.932-94.916 217.987-207.924 217.987-114.875 0-208-100.288-208-224 0-26.51-21.49-48-48-48s-48 21.49-48 48c0 141.385 114.615 256 256 256z"></path>
		    </svg>
			<svg class="arrow" v-else width="768" height="768" viewBox="0 0 768 768">
				<path d="M384 127.5l256.5 256.5-256.5 256.5-45-45 178.5-180h-390v-63h390l-178.5-180z"></path>
			</svg>
		</button>
</template>

<script>
	export default {
		name: "s-button",
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			icon: {
				type: String
			},
			type: {
				type: String,
				default: "button"
			},
			loading: {
				type: Boolean,
				default: false
			}
		}
	};
</script>

<style scoped>

	button {
		background: transparent;
		border: none;
		color: var(--button-color);
		padding: 10px 25px 10px 20px;
		cursor: pointer;
		vertical-align: top;
		font-weight: 900;
		z-index: 9;
		font-size: 1em;
		border-radius: var(--button-border-radius);
		display: inline-flex;
	}

	.reverse {
		flex-direction: row-reverse;
	}

	.primary {
		background: var(--primary-button-background);
	}

	.danger {
		background: var(--danger-button-background);
	}

	.danger:disabled {
		background: var(--danger-button-disabled-background);
		cursor: not-allowed;
	}

	.primary:disabled {
		background: var(--primary-button-disabled-background);
		cursor: not-allowed;
	}

	.min {
		font-weight: 300;
		padding: 5px 20px 5px 20px;
		font-size: .8em;
	}

	.spin {
		width: 20px;
		height: 20px;
		padding: 0;
		top: 2px;
		left: 8px;
	}

	.reverse .arrow {
		position: relative;
		transform: rotate(180deg);
		left: -5px;
	}

	.reverse:hover .arrow, .reverse .arrow:hover {
		left: -10px;
	}

	svg {
		width: 20px;
		height: 100%;
		line-height: 100%;
		position: relative;
		left: 5px;
		top: 1px;
		fill: var(--white);
		stroke: var(--white);
		z-index: 8;
		cursor: pointer;
	}

	.arrow {
		transition: var(--transition);
	}

	button:hover .arrow, .arrow:hover {
		left: 10px;
		transition: var(--transition);
	}

</style>