<template>
	<main class="pad">

		<header>

			<s-button type="button" class="primary reverse" @click.native="$router.replace(`/collections/${$route.params.name}/?page=1`)">Back to {{ collection.label }}</s-button>

			<s-button form="editor" class="primary" type="submit" :loading="loading" :disabled="disabled">Save</s-button>

		</header>

		<form id="editor" @submit.prevent="save">

			<tabs class="card">
				
				<tab v-for="tab in collection.tabs" :name="tab.label" :key="tab.label">

					<component
						v-model="data[field.name]"
						v-for="field in tab.fields"
						:is="field.widget"
						:label="field.label"
						:fields="field.fields"
						:errors="errors"
						:parentName="field.name"
						:format="field.format"
						:error="errors[field.name]"
						:options="field.options"
						:key="field.name">
					</component>

				</tab>

			</tabs>

		</form>
	</main>
</template>

<script>

	import slugify from "slugify";
	import validate from "validate.js";
	import { getFileFromData } from "../../utils/lib";
	import { getSchemaForFields, getDefaultDataForFields } from "../../utils/schema";
	import mustache from "mustache";

	export default {
		name: "add-collection",
		data() {
			return {
				collection: {},
				data: {},
				loading: false,
				disabled: true,
				errors: {},
				schema: {},
				type: "md"
			}
		},
		methods: {
			async save() {

				this.loading = true;

				let data = JSON.parse(JSON.stringify(this.data));

				let file = getFileFromData(data, this.type);

				let now = new Date();

				let slug = slugify(data.title, {
					lower: true,
					replace: "_"
				});

				let fileNameParams = {
					slug: slug,
					year: now.getFullYear(),
					month: now.getMonth() + 1,
					hours: now.getHours(),
					minutes: now.getMinutes(),
					seconds: now.getSeconds(),
					date: now.getDate()
				};

				let slugTemplate = this.collection.slug || "{{slug}}";

				slug = mustache.render(slugTemplate, fileNameParams);

				let fileName = `${slug}.${this.type}`;

				let path = `${this.collection.folder}/${fileName}`;

				data = {
					path: path,
					content: file,
					branch: this.$store.getters.branch
				};

				try {

					await this.$store.dispatch("addFile", data);

					if (this.collection.hooks.created) this.$fetch(this.collection.hooks.created, "POST", data);

					this.$toasted.show("Successfully Saved", {
						type: "success"
					});

					this.$router.replace(`/collections/${this.collection.name}/${fileName}`);

					this.loading = false;

				} catch(error) {

					console.error(error);

					this.$toasted.show("Connection error while trying to save", {
						type: "error"
					});

					this.loading = false;

				}

			}
		},
		
		created() {

			this.collection = this.$store.state.collections[this.$route.params.name];

			this.type = this.collection.type || this.type;

			this.collection.tabs.forEach(tab => {

				let schema = getSchemaForFields(tab.fields);

				let data = getDefaultDataForFields(tab.fields);

				this.data = {...this.data, ...data};

				this.schema = {...this.schema, ...schema};

			});

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