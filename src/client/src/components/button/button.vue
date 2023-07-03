<script setup lang="ts">
const props = defineProps({ text: String, link: String });
</script>

<template>
  <button data-test="button-text">
    {{ text }}
  </button>
</template>
