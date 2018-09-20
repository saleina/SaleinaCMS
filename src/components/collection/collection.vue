<template>

    <main class="pad">
        
    	<header>

            <div id="sub-header">
    		    <h1>{{ collection.label }}</h1>
    		    <s-button v-if="!collection.files && collection.create !== false" class="primary" @click.native="$router.push(`/collections/${collection.name}/add/`)">New</s-button>
            </div>

            <p>{{ collection.description }}</p>

    	</header>

        <file-collection :collection="collection" v-if="collection.files"/>
        <folder-collection :collection="collection" v-else/>
        
    </main>

</template>

<script>

    import FolderCollection from "./folder-collection";
    import FileCollection from "./file-collection";

	export default {
		name: "collection",
        components: {
            FolderCollection,
            FileCollection
        },
        data() {
            return {
                collection: this.$store.state.collections[this.$route.params.name]
            }
        },
	}
</script>

<style scoped>

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

</style>