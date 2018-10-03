<template>

	<main id="main">

		<media @close="showMediaManager = false;" @open="showMediaManager = true" v-show="showMediaManager"/>

		<div id="container">

			<aside id="sidebar">

				<div id="logo">

					<logo width="100%" height="auto"/>

				</div>

				<ul>

					<li v-for="collection in $store.state.config.config.collections" :key="collection.name">
						<router-link
						:to="`/collections/${collection.name}/${collection.files ? '': '?page=1'}`">
						<collection-icon/> {{ collection.label }}</router-link>
					</li>

					<li><a href="/media/" @click.prevent="showMediaManager = true"><media-icon/> media</a></li>

					<li v-if="$store.getters.supportsMemberManager"><router-link to="/members/"><people-icon/> Members</router-link></li>

				</ul>

				<div id="user" class="card">

					<img :src="$store.state.user.avatar_url" width="50" v-if="$store.state.user">

					<div>

						<h1 v-if="$store.state.user">{{ $store.state.user.name }}</h1>

						<svg @click="logout" id="logout" width="25" height="25" viewBox="0 0 768 768">
							<path d="M607.5 96c34.5 0 64.5 30 64.5 64.5v447c0 34.5-30 64.5-64.5 64.5h-447c-36 0-64.5-30-64.5-64.5v-127.5h64.5v127.5h447v-447h-447v127.5h-64.5v-127.5c0-34.5 28.5-64.5 64.5-64.5h447zM322.5 499.5l82.5-84h-309v-63h309l-82.5-84 45-45 160.5 160.5-160.5 160.5z"></path>
						</svg>

					</div>

				</div>

			</aside>

			<div id="content">

				<router-view :key="$route.fullPath"></router-view>

			</div>
			
		</div>

	</main>

</template>

<script>

	import CollectionIcon from "@/assets/icons/collection.svg";
	import MediaIcon from "@/assets/icons/media.svg";
	import PeopleIcon from "@/assets/icons/people.svg";
	import Logo from "@/assets/logo.green.svg";
	import Media from "./media";

	export default {
		name: "s-main",
		components: {
			CollectionIcon,
			MediaIcon,
			PeopleIcon,
			Logo,
			Media
		},
		data() {
			return {
				showMediaManager: false
			}
		},
		created() {
			document.addEventListener("keyup", event => {

				if (event.keyCode === 27) this.showMediaManager = false;
				
			});
		},
		methods: {
			logout() {
				this.$store.commit("logout");
				this.$router.replace("/login/");
			}
		}
	}
</script>

<style scoped>

	#main {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
	}

	#container {
		display: flex;
		height: 100%;
	}

	#sidebar {
		flex: 1;
		width: var(--sidebar-width);
		min-height: 100%;
		background: var(--sidebar-background);
		padding: 10px;
		position: fixed;
	}

	#sidebar ul {
		list-style: none;
		text-align: left;
		padding: 10px;
	}

	#sidebar li {
		color: var(--sidebar-link-color);
		fill: var(--sidebar-link-color);
		stroke: var(--sidebar-link-color);
		transition: var(--transition);
		line-height: 40px;
	}

	#sidebar li:hover {
		color: var(--sidebar-link-hover-color);
		fill: var(--sidebar-link-hover-color);
		stroke: var(--sidebar-link-hover-color);
		transition: var(--transition);
	}

	#sidebar li a {
		text-decoration: none;
		font-size: 12px;
		height: 100%;
		display: inline-block;
		width: 100%;
		line-height: 40px;
		font-weight: 600;
		text-transform: uppercase;
		color: inherit;
	}

	a svg {
		fill: inherit;
		stroke: inherit;
		position: relative;
		top: 2px;
	}

    .router-link-active {
        color: var(--sidebar-link-hover-color) !important;
    }

    .router-link-active svg {
    	fill: var(--sidebar-link-hover-color);
    	stroke: var(--sidebar-link-hover-color);
    }

	#user {
		position: absolute;
		bottom: 10px;
		left: 5%;
		height: 50px;
		width: 90%;
		display: flex;
		justify-content: space-between;
	}

	#user img, #user div {
		display: inline-block;
		vertical-align: top;
	}

	#user h1 {
		color: var(--label-color);
		font-size: 16px;
		margin-right: 5px;
	}

	#user div {
		text-align: right;
		flex: 1;
		align-self: flex-end;
	}

	#user img {
		border-radius: 5px 0 0 5px;
	}

	#logout {
		fill: var(--green);
		stroke: var(--green);
		cursor: pointer;
		margin-top: 3px;
	}

	#logo {
		padding: 12px 0;
		height: auto;
		border-bottom: 1px solid #d2d2d2;
		text-align: center;
		display: block;
	}

	#content {
		flex: 3;
		height: 100%;
		padding-left: var(--sidebar-width);
	}

</style>