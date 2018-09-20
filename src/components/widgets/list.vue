<template>

	<div class="list-input" v-if="fields">

		<div class="input card">

			<add-icon class="add" @click.native="add"/>

			<div class="input-group" v-for="(item, index) in items" :key="item.hash">

				<div class="header">

					<remove-icon class="remove" @click.native="remove(index)"/>

				</div>

				<component
               		@input="input"
               		v-model="item[field.name]"
               		v-for="field in fields"
               		:is="field.widget"
					:label="field.label"
					:fields="field.fields"
					:options="field.options"
					:key="field.name">
           		</component>

       		</div>

   		</div>

   		<label>{{ label }}</label>

   		<label class="error">{{ error }}</label>

	</div>

	<string v-model="items" :label="label" :error="error" v-else @input="input"></string>

</template>

<script>

	//TODO: implement validation for inner components

	import AddIcon from "@/assets/icons/add.svg";
	import RemoveIcon from "@/assets/icons/remove.svg";
	import { getSchemaForFields } from "../../utils/schema";

	export default {
		name: "list",
		components: {
			AddIcon,
			RemoveIcon
		},
		props: {
			value: {
				type: Array,
				default: () => {
					return [];
				}
			},
			label: {
				type: String
			},
			fields: {
				type: Array
			},
			max: {
				type: Number,
				default: 0
			},
			error: {
				type: String
			}
		},
		data() {
			return {
				count: 0,
				items: this.value || [],
				errors: {},
				schema: {}
			}
		},
		created() {


			// if fields is undefined treat the list widget
			// as a string input that accepts comma separated values
			if (this.fields === undefined || this.fields === null) return this.items = this.value.join(", ") || "";

			if (this.fields.length === 1) {

				let items = [];

				let name = this.fields[0].name;

				this.items.forEach(item => {

					let o = {};

					o[name] = item;

					items.push(o);

				});

				this.items = items;


			}

			// fixes issue with vue when an array
			// element gets removed from anywhere
			// but the end
			// https://stackoverflow.com/questions/45655090/vue-array-splice-removing-wrong-item-from-list
			this.items.map(item => {
				// defined a non enumerable property hash
				// to get past the issue mentioned above
				Object.defineProperty(item, "hash", {value: Math.random(), writable: false});
			});

			this.count = this.items.length;

		},
		methods: {

			add() {

				// check if number of items in list
				// has not reached the max amount set in configuration
				if (this.max) {
					if (this.max < this.count + 1) return;
				}

				this.count++;

				let o = {};

				for (let index in this.fields) {
					o = {}; // fixes issue with redfining non-writable property
					o[this.fields[index].name] = null;
					Object.defineProperty(o, "hash", {value: Math.random(), writable: false});
				}

				this.items.unshift(o);

			},

			remove(index) {
				this.items.splice(index, 1);
				this.count = this.items.length;
				this.input();
			},

			input() {

				// if fields is undefined split the value using the comma delimiter
				// and emit the resulting array as value
				if (this.fields === undefined) return this.$emit("input", this.items.split(","));

				if (this.fields.length === 1) {

					let items = this.items.map(item => item[this.fields[0].name]);

					return this.$emit("input", items);

				}

				this.$emit("input", this.items);

			}

		}
	};
</script>

<style scoped>
svg {
	cursor: pointer;
}

.list-input {
	min-height: 60px;
	display: flex;
	flex-direction: column-reverse;
	margin: 5px;
	text-align: right;
	border-radius: 3px 3px 0 0;
	position: relative;
}

.input.card {
	display: block;
	margin: 0;
	box-shadow: none;
	min-height: 55px;
	border-radius: 0 3px 3px 3px;
	border: 2px solid var(--label-background);
}

.input.card:focus-within {
	border: 2px solid var(--input-border-focused-color);
}

.input.card:focus-within ~ label {
	background: var(--input-border-focused-color);
	color: var(--white);
}

.input-group {
	border: 2px solid var(--label-background);
	border-radius: 3px;
	margin: 5px;
}

.header {
	background: var(--label-background);
	padding: 0;
}

.add, .remove {
	width: 25px;
	height: 25px;
}

.remove {
	fill: var(--red);
	stroke: var(--red);
}

.add {
	fill: var(--input-border-focused-color);
	stroke: var(--input-border-focused-color);
}

</style>