<template>
	<main>
		<img :src="$store.state.config.config.logo" v-if="$store.state.config.config.logo">
		<logo v-else/>
		<s-button :loading="loading" class="primary" @click.native="loading = true; $store.dispatch('auth');">Login</s-button>
	</main>
</template>

<script>

	import Logo from "@/assets/logo.svg";

	export default {
		name: "login",
		components: {
			Logo
		},
		data() {
			return {
				loading: false
			}
		}
	};
</script>

<style scoped>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		justify-content: center;
	}

	img {
		min-width: 320px;
		width: 50vw;
	}

	button {
		margin-top: 1em;
	}
</style>