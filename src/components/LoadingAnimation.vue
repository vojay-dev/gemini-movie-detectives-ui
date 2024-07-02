<template>
  <div class="gemini-loading-wrapper">
    <div class="gemini-loading-circle"></div>
    <div class="gemini-loading-circle"></div>
    <div class="gemini-loading-circle"></div>
    <div class="gemini-loading-shadow"></div>
    <div class="gemini-loading-shadow"></div>
    <div class="gemini-loading-shadow"></div>
    <span>{{ loadingText }}</span>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  loadingText: {
    type: String,
    default: 'Loading...'
  },
})
</script>
