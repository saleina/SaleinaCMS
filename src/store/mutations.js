export default {
    loadConfig(state, config) {
        state.config.config = config;
    },

    login(state, token) {
    	state.token = token;
    },

    logout(state) {
        state.token = null;
        localStorage.removeItem("token");
    },

    updateUser(state, user) {
        state.user = user;
    },

    updateLoading(state, loading) {
    	state.config.loading = loading;
    },

    updateConfigError(state, error) {
    	state.config.error = error;
    },

    updateConfigErrorMessage(state, message) {
        state.config.message = message;
    },

    setCollections(state, collections) {
        state.collections = collections;
    }
};
