<template>

    <div style="width: 100%; position: relative; min-height: 100px;">

        <loading v-if="loading"/>

        <template v-else>

            <s-input label="Search" v-model="keyword" @keypress.enter.native="search"></s-input>

            <router-link
                :to="`/collections/${$route.params.name}/${file.name}`"
                class="collection-file card"
                v-for="file in files"
                :key="file.name"
            >

            {{ file.name.replace(/-/g, " ").replace(/\..*$/, "") }}

            </router-link>

            <ul id="paging" v-if="files.length > 0">
                <li v-for="i in totalPages" :key="i">
                    <router-link :to="`/collections/${collection.name}/?page=${i}`">{{ i }}</router-link>
                </li>
            </ul>

        </template>

    </div>

</template>

<script>
    export default {
        name: "folder-collection",
        props: {
            collection: {
                type: Object
            }
        },
        data() {
            return {
                loading: true,
                files: [],
                page: this.$route.query.page || 1,
                totalPages: null,
                perPage: 10,
                keyword: ""
            }
        },
        methods: {
            async search() {

                if (this.keyword === "") return this.load();

                this.page = 1;

                this.loading = true;

                let data = {
                    path: this.collection.folder,
                    page: this.page,
                    keyword: this.keyword,
                    perPage: this.perPage
                };

                try {

                    data = await this.$store.dispatch("searchInCollection", data);

                    this.files = data.files;

                    this.totalPages = data.totalPages;

                    this.loading = false;

                } catch(error) {

                    this.$toasted.show("Connection error while trying to search", {
                        type: "error"
                    });

                    this.loading = false;

                    console.error(error);

                }

            },
            async load() {

                this.loading = true;

                let data = {
                    path: this.collection.folder,
                    page: this.page,
                    perPage: this.perPage
                };

                try {

                    data = await this.$store.dispatch("getFilesForCollection", data);

                    this.files = data.files;

                    this.totalPages = data.totalPages;

                    this.loading = false;

                } catch(error) {

                    console.error(error);

                    this.$toasted.show("Connection error while trying to fetch", {
                        type: "error"
                    });

                    this.loading = false;

                }

            }
        },
        created() {

            this.load();

        }
    }
</script>

<style scoped>
.input {
    margin: 0 !important;
}
</style>