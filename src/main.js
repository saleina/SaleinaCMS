import Vue from "vue";
import { sync } from "vuex-router-sync";
import yaml from "js-yaml";
import { Tabs, Tab } from "./components/inc/tabs";
import Toasted from "vue-toasted";
import validate from "validate.js";
import {
    correctWidgetNames,
    objectifyCollections,
    collectionsHaveTitleAndBody
} from "./utils/lib";

import "./styles.css"; // global styles

import router from "./router";
import store from "./store";
import gitlab from "./store/backends/gitlab";

import SaleinaCMS from "./SaleinaCMS";

import Globals from "./components/inc";
import Widgets from "./components/widgets";

import schema from "./config.js";
import AJV from "ajv";

const ajv = new AJV({
    allErrors: true,
    useDefaults: true
});

const valid = ajv.compile(schema);

Vue.use(Toasted, {
    position: "bottom-right",
    duration: 5000
});

Vue.component("tabs", Tabs);
Vue.component("tab", Tab);

Vue.config.productionTip = false;

sync(store, router);

validate.formatters.custom = function(errors) {
  let data = {};
  for (let error in errors) {
    if (!errors.hasOwnProperty(error)) continue;
    data[errors[error].attribute] = errors[error].error;
  }
  return data;
};

Vue.prototype.$validate = function(object, constraints) {
  return validate(object, constraints, {format: "custom", fullMessages: false});
};

Vue.prototype.$fetch = function(url, method, data) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: method || "GET",
            body: JSON.stringify(data),
            mode: "cors",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${store.state.token}`
            }
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
};

let request = window.indexedDB.open("saleina-cms", 1);

request.onupgradeneeded = function(event) {

    let db = event.target.result;

    if (!db.objectStoreNames.contains("media")) {

        db.createObjectStore("media", {autoIncrement: false});

    }

};

request.onsuccess = function() {
    Vue.prototype.$db = request.result;
};

request.onerror = function(error) {
    console.error(error);
};

function supported() {

    return Object.defineProperty && window.indexedDB && document.body.dataset && window.Promise && window.history;

};

new Vue({
	router,
	store,
    render: h => h(SaleinaCMS),
    
	async created() {

        // check if browser is supported
        if (!supported()) {

            store.commit("updateConfigError", true);

            store.commit("updateConfigErrorMessage", "Oops! Your browser doesn't seem to be supported");

            store.commit("updateLoading", false);

            return;

        }

        try {
            
    		let response = await fetch("/admin/config.yml");

            let data = await response.text();

            data = correctWidgetNames(data);
            
            let config = await yaml.load(data);

    		let configInvalid = !valid(config);

            if (configInvalid) throw valid.errors;

            if (!collectionsHaveTitleAndBody(config.collections)) throw {
                name: "NoTitleOrBody"
            };

    		store.commit("loadConfig", config);

            store.commit("setCollections", objectifyCollections(config.collections));

    		let backend = store.state.config.config.backend.name === "gitlab" ? gitlab : null;

            store.registerModule("backend", backend);

            const tokenRegExp = /access_token=([\w\d]+)/;

            let found = this.$route.path.match(tokenRegExp);

            if (found) {

                let token = found[1];

                localStorage.setItem("token", token);

                store.commit("login", token);

            } else {

                let token = localStorage.getItem("token");

                if (!token) {

                    store.commit("updateLoading", false);

                    return router.replace("/login/");
                            
                }

                store.commit("login", token);

            }

            let user = await store.dispatch("getUser");

            let isMember = await store.dispatch("hasAccess", user);

            if (!isMember) {
                store.commit("logout");
                throw {
                    name: "PermissionError"
                }
            }

            store.commit("updateUser", user);

            store.commit("updateLoading", false);

            router.replace("/");

        } catch(error) {

            if (error.name === "PermissionError") {

                store.commit("updateConfigErrorMessage", "It seems you don't have access to this site!")

            } else {

                store.commit("updateConfigErrorMessage", "Configuration Errors! Please check your console for details");

            }

            store.commit("logout");

            store.commit("updateConfigError", true);

            store.commit("updateLoading", false);

			console.error(error);

        }
	}
}).$mount("#SaleinaCMS");
