<template>
	<div class="input">
        
		<textarea
            :required="required"
            :value="value"
            @input="$emit(`input`, $event.target.value);">
        </textarea>

		<label>{{ label }}</label>

        <label class="error">{{ error }}</label>

	</div>
</template>

<script>
	export default {
		name: "s-text",
        props: {
            value: {
                type: String
            },
            label: {
                type: String
            },
            required: {
            	type: Boolean
            },
            error: {
                type: String
            }
        }
	};
</script>