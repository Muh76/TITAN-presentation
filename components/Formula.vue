<script setup>
import { computed } from 'vue'
import katex from 'katex'
const props = defineProps({ tex: { type: String, required: true } })
const formula = computed(() => katex.renderToString(props.tex, { displayMode: true, throwOnError: true, output: 'htmlAndMathml' }))
</script>
<template><div class="formula" v-html="formula" /></template>
