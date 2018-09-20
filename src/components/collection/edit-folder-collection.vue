<template>
	<main class="pad">

		<header>

			<s-button class="primary reverse" @click.native="$router.replace(`/collections/${$route.params.name}/?page=1`)">Back to {{ collection.label }}</s-button>

			<s-button v-if="!loading && collection.delete" class="danger" @click.native="remove" :loading="deleteLoading">Delete</s-button>

			<s-button v-if="!loading" class="primary" @click.native="save" :disabled="disabled" :loading="updateLoading">Save</s-button>

		</header>

		<div id="editor">

			<loading v-if="loading"/>

			<tabs v-else class="card">
				
				<tab v-for="tab in collection.tabs" :name="tab.label" :key="tab.label">

					<component
						v-model="data[field.name]"
						v-for="field in tab.fields"
						:is="field.widget"
						:label="field.label"
						:error="errors[field.name]"
						:errors="errors"
						:parentName="field.name"
						:fields="field.fields"
						:format="field.format"
						:max="field.max"
						:options="field.options"
						:key="field.name">
					</component>

				</tab>

			</tabs>

		</div>
	</main>
</template>

<script>

	import slugify from "slugify";
	import validate from "validate.js";
	import { getDataFromFile, getFileFromData } from "../../utils/lib";
	import { getSchemaForFields } from "../../utils/schema";

	export default {
		name: "edit-folder-collection",
		props: {
			collection: {
				type: Object
			}
		},
		data() {
			return {
				loading: true,
				updateLoading: false,
				deleteLoading: false,
				data: null,
				path: null,
				disabled: true,
				schema: {},
				errors: {},
				type: "md"
			}
		},
		methods: {
			async save() {

				this.updateLoading = true;

				let data = JSON.parse(JSON.stringify(this.data));

				let file = getFileFromData(data, this.type);

				try {

					await this.$store.dispatch("updateFile", {
						path: this.path,
						content: file
					});

					this.$toasted.show("Successfully Saved", {
						type: "success"
					});

					this.updateLoading = false;

				} catch(error) {

					console.error(error);

					this.$toasted.show("Connection error while trying to save", {
						type: "error"
					});

					this.updateLoading = false;

				}

			},

			async _remove() {

				this.deleteLoading = true;

				try {

					await this.$store.dispatch("deleteFile", {
						path: this.path
					});

					this.$toasted.show("Deleted successfully", {
						type: "success"
					});

					this.$router.replace(`/collections/${this.collection.name}/?page=1`);

					this.deleteLoading = false;

				} catch(error) {

					console.error(error);

					this.$toasted.show("Connection error while trying to delete", {
						type: "error"
					});

					this.deleteLoading = false;

				}

			},

			remove() {

				let that = this;

				this.$toasted.show("Are you sure?", {
					duration: 15000,
					action: [
						{
							text: "Yes",
							onClick(e, toast) {
								toast.goAway(0);
								that._remove();
							}
						},
						{
							text: "Cancel",
							onClick(e, toast) {
								toast.goAway(0);
							}
						}
					]
				});

			}
		},
		async created() {

			this.type = this.collection.type || this.type;

			this.collection.tabs.forEach(tab => {

				let schema = getSchemaForFields(tab.fields);

				this.schema = {...this.schema, ...schema};

			});

            this.path = `${this.collection.folder}/${this.$route.params.file}`;

            try {

	            let file = await this.$store.dispatch("getFile", {
	            	path: this.path
	            });

				file = await getDataFromFile(file, "md");

				this.data = file;

				this.loading = false;

			} catch(error) {

				console.error(error);

            	this.loading = false;

            	this.$router.replace(`/collections/${this.$route.params.name}/`);

            	if (error === 404) {

            		return this.$toasted.show("File doesn't exist.", {
            			type: "error"
            		});

            	}

            	this.$toasted.show("Connection error while trying to fetch.", {
            		type: "error"
            	});

            }

		},

		watch: {
			data: {
				deep: true,
				handler() {
					let errors = this.$validate(this.data, this.schema);
					this.errors = errors || {};
					this.disabled = errors !== undefined;
				}
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