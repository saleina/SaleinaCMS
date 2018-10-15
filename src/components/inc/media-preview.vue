<template>
    <div class="media-preview">

        <loading :size="50" v-if="loading"/>

        <template v-else>

            <template v-if="isImage">

                <img :src="src" class="picker" v-if="picker" @click="$emit('input', sitePath)"/>

                <img :src="src" v-else/>

            </template>

            <template v-else>
                
                <h6 class="picker" v-if="picker" @click="$emit('input', sitePath)">{{ fileName }}</h6>
                
                <h6>{{ fileName }}</h6>

            </template>

        </template>

        <!-- only allow deletion when the file is uploaded
             and it's path is known
         -->
        <div class="actions" v-if="typeof this.value === 'string' && !previewOnly">
            <delete-icon @click.native="$emit('remove', repoPath)"/>
        </div>

    </div>
</template>

<script>

import DeleteIcon from "../../assets/icons/delete.svg";

export default {
    name: "media-preview",
    props: {
        value: {
            type: [String, Promise],
            required: true
        },
        picker: {
            type: Boolean,
            default: false
        },
        previewOnly: {
            type: Boolean,
            default: false
        }
    },
    components: {
        DeleteIcon
    },
    data() {
        return {
            src: null
        }
    },
    methods: {
        load() {

            this.loading = true;

            this.$store.dispatch("getRawFileAsBase64", {
                path: this.repoPath
            })
            .then(file => {
                this.src = file;
                this.loading = false;
            })
            .catch(error => {
                this.loading = false;
                console.error(error);
            });

        }
    },
    created() {

        if (typeof this.value === "object") {

            this.value
            .then(file => {
                this.value = file;
                this.load();
            });

            return;
        }

        this.load();

    },
    data() {
        return {
            loading: true,
            src: null
        }
    },
    computed: {

        repoPath() {

            return `${this.$store.getters.mediaFolder}${this.value}`;
            
        },

        sitePath() {
            
            let publicFolder = this.$store.getters.publicFolder || this.$store.getters.mediaFolder;

            return `${publicFolder}${this.value}`;

        },

        isImage() {

            let images = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];

            let parts = this.repoPath.split(".");

            let ext = parts[parts.length - 1];

            return images.indexOf(ext) >= 0;

        },

        fileName() {

            let parts = this.repoPath.split("/");

            return parts[parts.length - 1];

        }

    },
    watch: {
        value() {
            this.load();
        }
    }
}
</script>

<style scoped>

.media-preview {
    position: relative;
    width: 220px;
    height: 124px;
    overflow: hidden;
    border: 1px solid var(--label-background);
    margin: 10px;
    text-align: center;
}

h6 {
    color: var(--green);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
}

.picker {
    cursor: pointer;
}

svg {
    fill: var(--red);
    stroke: var(--red);
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.media-preview:hover .actions {
    display: block;
}

.actions {
    padding: 5px;
    background: rgba(0, 0, 0, .5);
    cursor: default;
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    width: 100%;
}

</style>
