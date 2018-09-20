import MediaActions from "./media.actions";

export default {

	auth(context) {

        let redirectURI = window.location.origin + "/admin/";

        let clientID = context.rootState.config.config.backend.client_id;

		window.location.replace(`https://gitlab.com/oauth/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}`);

    },
    
    getUser() {

        return new Promise((resolve, reject) => {

            this._vm.$fetch(`https://gitlab.com/api/v4/user`)
            .then(response => {
                if (response.ok) return response.json();
                reject(response.status);
            })
            .then(user => {
                resolve(user);
            })
            .catch(error => {
                reject(error);
            });

        });

    },

    hasAccess(context, user) {

        return new Promise((resolve, reject) => {

            this._vm.$fetch(`https://gitlab.com/api/v4/projects/${context.getters.id}/members/all`)
            .then(response => {
                if (response.ok) return response.json();
                reject(false);
            })
            .then(members => {
                let isMember = members.some(member => member.username === user.username && member.access_level >= 40);
                resolve(isMember);
            })
            .catch(error => {
                reject(error);
            });

        });

    },

    getFilesForCollection(context, file) {

        return new Promise((resolve, reject) => {

            let id = context.getters.id;

            let path = encodeURIComponent(file.path);

            let totalPages = 1;

            let branch = encodeURIComponent(context.getters.branch);

            this._vm.$fetch(`https://gitlab.com/api/v4/projects/${id}/repository/tree?path=${path}&ref=${branch}&page=${file.page}&per_page=${file.perPage}`)
            .then(response => {

                totalPages = response.headers.get("X-Total-Pages");

                if (response.ok) return response.json();

                reject(response.status);

            })
            .then(files => {

                resolve({
                    files: files,
                    totalPages: parseInt(totalPages)
                });

            })
            .catch(error => {

                reject(error);

            });

        });

    },

    searchInCollection(context, data) {

        let id = context.getters.id;

        let path = data.path;

        data.keyword = encodeURIComponent(`${data.keyword} path:${path} extension:md`);

        let totalPages = 1;
        
        return new Promise((resolve, reject) => {

            this._vm.$fetch(`https://gitlab.com/api/v4/projects/${id}/search?scope=blobs&search=${data.keyword}&per_page=${data.perPage}&page=${data.page}`)
            .then(response => {

                totalPages = response.headers.get("X-Total-Pages");

                if (response.ok) return response.json();

                reject(response.status);

            })
            .then(files => {

                let uniqueFileNames = new Set();

                for (let index in files) {

                    let parts = files[index].filename.split("/");

                    let filename = parts[parts.length - 1];

                    uniqueFileNames.add(filename);

                }

                let uniqueFiles = [];

                uniqueFileNames.forEach(fileName => {

                    uniqueFiles.push({
                        name: fileName
                    });

                });

                resolve({
                    files: uniqueFiles,
                    totalPages: totalPages
                });

            })
            .catch(error => {
                reject(error);
            })

        });

    },

    addFile(context, file) {

        let id = context.getters.id;

        let path = encodeURIComponent(file.path);

        let data = {
            branch: context.getters.branch,
            commit_message: `create file ${path}`,
            actions: [
                {
                    action: "create",
                    file_path: file.path,
                    encoding: file.encoding || "text",
                    content: file.content
                }
            ]
        };

        return new Promise((resolve, reject) => {

            this._vm.$fetch(`https://gitlab.com/api/v4/projects/${id}/repository/commits`, "POST", data)
            .then(response => {

                if (response.ok) return resolve(file.name);

                reject(response.status);
                
            })
            .catch(error => {
                reject(error);
            });

        });

    },

    updateFile(context, file) {

        let id = context.getters.id;

        let data = {
            branch: context.getters.branch,
            commit_message: `update file ${file.path}`,
            actions: [
                {
                    action: "update",
                    file_path: file.path,
                    content: file.content
                }
            ]
        };

        return new Promise((resolve, reject) => {

            this._vm.$fetch(`https://gitlab.com/api/v4/projects/${id}/repository/commits`, "POST", data)
            .then(response => {
                if (response.ok) return resolve();
                reject(response.status);
            })
            .catch(error => {
                reject(error);
            });

        });

    },

    deleteFile(context, file) {

        let id = context.getters.id;

        let data = {
            branch: context.getters.branch,
            commit_message: `delete file ${file.path}`,
            actions: [
                {
                    "action": "delete",
                    "file_path": file.path
                }
            ]
        };

        return new Promise((resolve, reject) => {

            this._vm.$fetch(`https://gitlab.com/api/v4/projects/${id}/repository/commits`, "POST", data)
            .then(response => {

                if (response.ok) return resolve();
                reject(response.status);
                
            })
            .catch(error => {

                reject(error);

            });

        });

    },

    getFile(context, file) {

        return new Promise((resolve, reject) => {

            let id = context.getters.id;

            let path = encodeURIComponent(file.path);

            let branch = context.getters.branch;

            this._vm.$fetch(`https://gitlab.com/api/v4/projects/${id}/repository/files/${path}/raw?ref=${branch}`)
            .then(response => {

                if (response.ok) return response.text();

                reject(response.status);

            })
            .then(file => {

                resolve(file);

            })
            .catch(error => {

                reject(error);

            });

        });

    },

    ...MediaActions

};
