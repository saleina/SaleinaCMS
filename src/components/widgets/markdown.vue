<template>
    <div class="input">
        <div class="pell" :id="id" @keydown.ctrl.66.prevent="bold" @keydown.ctrl.73.prevent="italic" @keydown.ctrl.85.prevent="underline" @keydown.ctrl.83.prevent="strikethrough"></div>
        
        <label>{{ label }}</label>

        <label class="error">{{ error }}</label>
    </div>
</template>

<script>

    import { init } from "pell";
    import Turndown from "turndown"
    import showdown from "showdown";

    let converter = new showdown.Converter({
        tables: true
    });

    let turndown = new Turndown();

    export default {
        name: "markdown",
        props: {
            value: {
                type: String
            },
            label: {
                type: String
            },
            error: {
                type: String
            }
        },

        data() {
            return {
                id: `editor${Math.random()}`,
                textareaID: `textarea${Math.random()}`,
                markdown: null
            }
        },

        methods: {
            bold() {
                document.execCommand("bold");
            },

            italic() {
                document.execCommand("italic");
            },

            underline() {
                document.execCommand("underline");
            },

            strikethrough() {
                document.execCommand("strikethrough");
            }
        },
        
        mounted() {

            const editor = init({
                element: document.getElementById(this.id),
                onChange: html => {
                    this.markdown = turndown.turndown(html);
                    this.$emit("input", this.markdown);
                }
            });
            
            editor.content.innerHTML = converter.makeHtml(this.value || "");

        }
    };
</script>