<template>
	<main class="pad">

		<header>

			<s-button class="primary reverse" @click.native="$router.replace(`/collections/${$route.params.name}/`)">Back to {{ collection.label }}</s-button>

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

	import validate from "validate.js";
	import { getDataFromFile, getFileFromData } from "../../utils/lib";
	import { getSchemaForFields } from "../../utils/schema";

	export default {
		name: "edit-file-collection",
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
				disabled: true,
				type: "json",
				schema: {},
				errors: {}
			}
		},
		methods: {
			async save() {

				this.updateLoading = true;

				let file = getFileFromData(this.data, this.type);

				let data = {
					path: this.collection.file,
					content: file
				};

				try {

					await this.$store.dispatch("updateFile", data);

					this.$toasted.show("Successfully Saved", {
						type: "success"
					});

					this.updateLoading = false;

				} catch(error) {

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
					   path: this.collection.file
				    });

					this.$toasted.show("Deleted successfully", {
						type: "success"
					});

					this.$router.replace(`/collections/${this.$route.params.name}/`);

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

			let parts = this.collection.file.split(".");

			this.type = parts[parts.length - 1];

			this.collection.tabs.forEach(tab => {

				let schema = getSchemaForFields(tab.fields);

				this.schema = {...this.schema, ...schema};

			});

            try {

                let file = await this.$store.dispatch("getFile", {
            	   path: this.collection.file
                });

            	let data = await getDataFromFile(file, this.type);

            	this.data = data;

            	this.loading = false;

            } catch(error) {

            	this.loading = false;

            	this.$router.replace(`/collections/${this.$route.params.name}/`);

            	if (error.name === "SyntaxError") {
            		return this.$toasted.show("Syntax error in data file", {
            			type: "error"
            		});
            	}

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