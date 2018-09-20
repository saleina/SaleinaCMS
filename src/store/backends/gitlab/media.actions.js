export default {

    getRawFileAsBase64(context, file) {

        return new Promise((resolve, reject) => {

            let id = context.getters.id;

            let path = encodeURIComponent(file.path);

            let branch = encodeURIComponent(context.getters.branch);

            let transaction = this._vm.$db.transaction(["media"], "readonly");

            let store = transaction.objectStore("media");

            let request = store.get(file.path);

            let parts = file.path.split(".");

            let ext = parts[parts.length - 1];

            request.onsuccess = (event) => {

                if (event.target.result) {

                    resolve(URL.createObjectURL(event.target.result));

                    return;

                }
                
                this._vm.$fetch(`https://gitlab.com/api/v4/projects/${id}/repository/files/${path}/raw?ref=${branch}`)
                .then(response => {

                    if (response.ok) return response.blob();

                    reject(response.status);

                })
                .then(blob => {

                    if (ext === "svg") blob = blob.slice(0, blob.size, "image/svg+xml");

                    let transaction = this._vm.$db.transaction(["media"], "readwrite");

                    let store = transaction.objectStore("media");

                    store.add(blob, file.path);

                    resolve(URL.createObjectURL(blob));

                })
                .catch(error => {

                    reject(error);

                });

            };

            request.onerror = function(error) {
                
                console.error(error);
                
            }

        });

    }
};