<template>
    <div id="media-container">

        <input ref="input" type="file" :accept="accept" @change="changed"/>

        <div id="overlay" @click="$emit('close');"></div>

        <div id="media" class="card">

            <header>
                <h1>Media Assets</h1>
                <s-button @click.native="$refs.input.click();" class="primary">Upload New</s-button>
            </header>

            <div id="media-files">
                <loading v-if="loading"/>
                <template v-else>
                    <media-preview :picker="picker" @input="$emit('input', $event)" @remove="remove($event, index)" v-for="(media, index) in $store.state.backend.media.files" :value="media.name || media" :key="media.name || Math.random()"/>
                </template>
            </div>

            <ul id="paging" v-if="!loading && $store.state.backend.media.files.length > 0">
                <li v-for="i in $store.state.backend.media.totalPages" :key="i">
                    <a @click="move(i)" :class="{'router-link-exact-active': i === $store.state.backend.media.page}">{{ i }}</a>
                </li>
            </ul>

        </div>

    </div>
</template>

<script>
export default {
    name: "media",
    props: {
        accept: {
            type: String,
            default: "*"
        },
        picker: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loading: true
        }
    },
    created() {
        this.load();
    },
    methods: {

        move(page) {

            this.$store.commit("updateMediaPage", page);

            this.load();

        },

        async load() {

            this.loading = true;

            let data = {
                path: this.$store.getters.mediaFolder,
                perPage: this.$store.state.backend.media.perPage,
                page: this.$store.state.backend.media.page
            };

            try {
        
                data = await this.$store.dispatch("getFilesForCollection", data);

                this.$store.commit("updateTotalMediaPages", data.totalPages);

                this.$store.commit("updateMediaFiles", data.files);

                this.loading = false;

            } catch(error) {

                this.$toasted.show("Error occurred while fetching media files", {
                    type: "error"
                });

                this.loading = false;

                console.error(error);
                
            }

        },

        changed() {

            let file = this.$refs.input.files[0];

            let reader = new FileReader();

            reader.addEventListener("load", () => {

                let result = reader.result.replace(/data\:\w+\/.+,/, "");

                let mediaFolder = this.$store.state.config.config.media_folder;

                let fileName = `${Date.now()}_${file.name}`;

                let data = {
                    name: fileName,
                    path: `${mediaFolder}/${fileName}`,
                    content: result,
                    encoding: "base64"
                };

                let upload = this.$store.dispatch("addFile", data)
                .catch(error => {

                    console.error(error);

                    this.$toasted.show("An error occurred while uploading file", {
                        type: "error"
                    });

                });

                this.$store.commit("addMediaFile", upload);

            }, false);

            reader.readAsDataURL(file);

        },

        remove(path, index) {

            this.$store.commit("removeMediaFile", index);

            this.$store.dispatch("deleteFile", {
                path: path
            });

        }
    }
}
</script>

<style scoped>

input {
    display: none;
}

header {
    padding: 10px;
}

a {
    cursor: pointer;
}

#overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: rgba(0,0,0,.3);
    cursor: pointer;
}

#media {
    position: fixed;
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
    z-index: 1000;
    overflow: auto;
}

#media-files {
    position: relative;
    min-height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

</style>
