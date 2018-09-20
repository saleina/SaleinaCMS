<template>

    <main>

        <div style="width: 100%; position: relative;">

                <router-link
                    :to="`/collections/${$route.params.name}/${file.name}`"
                    class="collection-file card"
                    v-for="file in collection.files"
                    :key="file.file"
                >
                
                    {{ file.label }}

                </router-link>

        </div>
        
    </main>

</template>

<script>
    export default {
        name: "file-collection",
        props: {
            collection: {
                type: Object
            }
        }
    }
</script>