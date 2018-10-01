import MediaActions from "./media.actions";

export default {

	auth(context) {

        let redirectURI = window.location.origin + "/admin/#access_token=fak3acc355t0k3n";

		window.location.replace(redirectURI);

        window.location.reload();

    },
    
    getUser() {

        return new Promise((resolve, reject) => {

            resolve({
                name: "Zelalem Mekonen",
                avatar_url: "https://via.placeholder.com/150x150"
            });

        });

    },

    hasAccess(context, user) {

        return new Promise((resolve, reject) => {

            resolve(true);

        });

    },

    getFilesForCollection(context, file) {

        return new Promise((resolve, reject) => {

            resolve({
                totalPages: 1,
                files: []
            });

        });

    },

    searchInCollection(context, data) {
        
        return new Promise((resolve, reject) => {

            resolve({
                totalPages: 1,
                files: []
            });

        });

    },

    addFile(context, file) {

        return new Promise((resolve, reject) => {

        });

    },

    updateFile(context, file) {

        return new Promise((resolve, reject) => {

        });

    },

    deleteFile(context, file) {

        return new Promise((resolve, reject) => {

        });

    },

    getFile(context, file) {

        return new Promise((resolve, reject) => {


        });

    },

    ...MediaActions

};
