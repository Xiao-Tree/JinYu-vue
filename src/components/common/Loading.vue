<script setup lang="ts">
const { content = "Loading" } = defineProps<{ content?: string }>();
</script>
<template>
  <div class="loader-container">
    <div class="loader">{{ content }}</div>
  </div>
</template>
<style></style>
