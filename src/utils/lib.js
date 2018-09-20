import yml from "js-yaml";
import toml from "toml-js";
import matter from "gray-matter";

function markdownParse(file) {

	let c = matter(file);

	let n = c.data;

	n["body"] = c.content;

	n = JSON.parse(JSON.stringify(n));

	return n;

};

export function getDataFromFile(file, type) {

	if (type === "yml") return yml.load(file);

	return new Promise((resolve, reject) => {

		if (type === "json") return resolve(JSON.parse(file));

		if (type === "md") return resolve(markdownParse(file));

		if (type === "toml") return resolve(tome.parse(file));

	});

};

export function getFileFromData(data, type) {

	if (type === "yml") return yml.dump(data);

	if (type === "json") return JSON.stringify(data);

	if (type === "toml") return toml.dump(data);

	if (type === "md") {

		let file = data.body || "";

		delete data.body;

		return matter.stringify(file, data);

	}

};

export function correctWidgetNames(data) {

	data = data.replace(/widget\:\s*\"?select\"?/g, "widget: s-select");

	data = data.replace(/widget\:\s*\"?text\"?/g, "widget: s-text");

	data = data.replace(/widget\:\s*\"?object\"?/g, "widget: s-object");

	data = data.replace(/widget\:\s*\"?image\"?/g, "widget: s-image");

	return data;

};

export function objectifyCollections(collections) {

	let c = {};

	collections.forEach(function(collection) {
		c[collection.name] = collection;
	});

	return c;

};

// ensures that collections have the required
// title & body fields
export function collectionsHaveTitleAndBody(collections) {

	let allHaveTitles = true, allHaveBodies = true;

	loop:
	for (let i = 0; i < collections.length; i++) {

		let hasTitle = false, hasBody = false;

		let collection = collections[i];

		if (collection.files) continue;

		for (let j = 0; j < collection.tabs.length; j++) {

			let tab = collection.tabs[j];

			for (let k = 0; k < tab.fields.length; k++) {

				let field = tab.fields[k];

				if (field.name === "title") hasTitle = true;

				if (field.name === "body") hasBody = true;

			}

		}

		if (!hasTitle || !hasBody) {
			allHaveTitles = false;
			allHaveBodies = false;
			break loop;
		}

	}

	return allHaveTitles && allHaveBodies;

};