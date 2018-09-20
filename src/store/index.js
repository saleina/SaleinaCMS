import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations.js";
import actions from "./actions.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        collections: null,
        config: {
        	config: null,
        	loading: true,
        	loadingError: false,
        	error: false,
            message: null
        },
        token: null
    },
    mutations: mutations,
    actions: actions,
    getters: {

        loggedIn: (state) => state.token !== "" && state.token !== null && state.token !== undefined,

        id: (state) => encodeURIComponent(state.config.config.backend.repo),

        branch: (state) => state.config.config.backend.branch || "master",

        mediaFolder(state) {

            let mediaFolder = state.config.config.media_folder.startsWith("/") ? state.config.config.media_folder.substring(1) : state.config.config.media_folder;

            return mediaFolder.endsWith("/") ? mediaFolder : mediaFolder + "/";

        },

        publicFolder(state) {

            let publicFolder = state.config.config.public_folder.startsWith("/") ? state.config.config.public_folder : "/" + state.config.config.public_folder;

            return publicFolder.endsWith("/") ? publicFolder : publicFolder + "/";

        }
        
    }
});
