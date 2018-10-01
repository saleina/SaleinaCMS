export default {
    updateTotalMediaPages(state, totalPages) {
        state.media.totalPages = totalPages;
    },

    updateMediaFiles(state, files) {
        state.media.files = files;
    },

    removeMediaFile(state, index) {
        state.media.files.splice(index, 1);
    },

    addMediaFile(state, file) {
        state.media.files.unshift(file);
    },

    updateMediaPage(state, page) {
        state.media.page = page;
    }

};