<template>
    <svg class="spinner spin"  width="512" :style="style" height="512" viewBox="0 0 512 512">
        <path d="M256 0c-139.374 0-252.729 111.381-255.924 249.987 2.96-120.932 94.916-217.987 207.924-217.987 114.875 0 208 100.288 208 224 0 26.51 21.49 48 48 48s48-21.49 48-48c0-141.385-114.615-256-256-256zM256 512c139.374 0 252.729-111.381 255.924-249.987-2.96 120.932-94.916 217.987-207.924 217.987-114.875 0-208-100.288-208-224 0-26.51-21.49-48-48-48s-48 21.49-48 48c0 141.385 114.615 256 256 256z"></path>
    </svg>
</template>

<script>

    export default {
        name: "Loading",
        props: {
            size: {
                type: Number,
                default: 100
            }
        },
        data() {
            return {
                style: {
                    width: `${this.size}px`,
                    height: `${this.size}px`,
                    margin: `-${this.size / 2}px 0 0 -${this.size / 2}px`
                }
            }
        }
    };
    
</script>

<style scoped>

    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        fill: var(--green);
        stroke: var(--green);
    }
        
</style>