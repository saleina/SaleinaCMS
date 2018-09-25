<template>
	<edit-file-collection :collection="fileCollection" v-if="collection.files"/>
	<edit-folder-collection :collection="collection" v-else/>
</template>

<script>
	
	import EditFileCollection from "./edit-file-collection";
	import EditFolderCollection from "./edit-folder-collection";

	export default {
		name: "edit-collection",
		components: {
			EditFileCollection,
			EditFolderCollection
		},
		data() {
			return {
				collection: this.$store.state.collections[this.$route.params.name],
				fileCollection: {}
			}
		},
		created() {

			if (this.collection.files) {

				this.collection.files.forEach(file => {

					if (file.name === this.$route.params.file) return this.fileCollection = file;

				});

			}

		}
	};
</script>

<style scoped>
	main {
		height: 100%;
	}

	#editor {
		height: 85%;
		position: relative;
		width: 100%;
	}
</style>