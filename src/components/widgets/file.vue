<template>
    <div class="image-input">

        <media-library @input="input" :picker="true" @close="showMediaLibrary = false" v-show="showMediaLibrary" v-model="v"/>

        <div class="input card">
            <media-preview :previewOnly="true" :value="fileName" v-if="fileName"/>
            <s-button @click.native="remove" v-if="fileName" class="danger min reverse">Remove File</s-button>
            <s-button @click.native="showMediaLibrary = true" class="primary min">Pick File</s-button>
        </div>

        <label>{{ label }}</label>

        <label class="error">{{ error }}</label>

    </div>
</template>

<script>

    import MediaLibrary from "../media";

    export default {
        name: "file",
        components: {
            MediaLibrary
        },
        props: {
            value: {
                type: String
            },
            label: {
                type: String,
                required: true
            },
            error: {
                type: String
            }
        },
        data() {
            return {
                showMediaLibrary: false,
                v: this.value
            }
        },
        computed: {
            
            fileName() {

                if (!this.v) return undefined;

                let parts = this.v.split("/");

                return parts[parts.length - 1];

            }

        },
        methods: {

            input() {

                this.showMediaLibrary = false;

                this.$emit("input", this.v);

            },

            remove() {

                this.v = undefined;

                this.$emit("input", undefined);

            }
        }

    };
</script>

<style scoped>
    
.image-input {
    min-height: 60px;
    display: flex;
    flex-direction: column-reverse;
    margin: 10px;
    text-align: right;
    border-radius: 3px 3px 0 0;
    position: relative;
}

.input.card {
    display: block;
    margin: 0;
    box-shadow: none;
    min-height: 55px;
    border-radius: 0 3px 3px 3px;
    border: 2px solid var(--label-background);
    text-align: left;
}

button {
    margin: 10px;
    vertical-align: bottom;
}

.media-preview {
    display: inline-block;
    vertical-align: bottom;
}

</style>