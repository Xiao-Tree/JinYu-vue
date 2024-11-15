<script setup lang="ts">
import Error from './error.vue';

// @ts-nocheck
definePage({
  name:'notFound',
  path:'/:pathMatch(.*)',
  meta: {
    layout: 'blank',
    requiresAuth: false,
    title:'未知页面',
    hideInMenu:true,
    sort:102
  },
});
</script>
<template>
  <Error code="404"></Error>
</template>
<style></style>
