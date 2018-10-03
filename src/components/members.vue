<template>
	<main class="pad">

		<header>

            <div id="sub-header">
    		    <h1>Members</h1>
    		    <s-button class="primary" @click.native="showDialog = true;">Add</s-button>
            </div>

            <p>This section allows you to manage the people that have access to this cms.</p>

          </header>

          <div style="position: relative; min-height: 100px;">

          	<loading v-if="loading"></loading>

          	<template v-else>

            	<s-input label="Search" v-model="keyword" @keypress.enter.native="search"></s-input>

		          <ul>
		          	<li class="card member" v-for="member in members">{{ member.name }} <remove-icon class="remove"/></li>
		          </ul>

		       </template>
          	
          </div>

	</main>
</template>

<script>

	import RemoveIcon from "@/assets/icons/remove.svg";

	export default {
		name: "Members",
		components: {
			RemoveIcon
		},
		data() {

			return {
				members: [],
				loading: true,
				showDialog: false
			}

		},
		async created() {

			this.members = await this.$store.dispatch("getMembersList");

			this.loading = false;

		}
	};
</script>

<style scoped>
.input {
    margin: 0 !important;
}

    header {
        display: flex;
        flex-direction: column;
    }

    #sub-header {
        display: flex;
        justify-content: space-between;
    }

    svg {
        margin-top: 0 !important;
    }

    .member {
    	display: flex;
    	justify-content: space-between;
    	align-items: center;
    }

    .member:hover {
    	background: var(--white);
    	cursor: default;
    }

    .remove {
    	fill: var(--black);
    	width: 20px;
    	cursor: pointer;
    	height: 20px;
    	transition: all .3s linear;
    }

    .remove:hover {
    	fill: var(--red);
    }

</style>