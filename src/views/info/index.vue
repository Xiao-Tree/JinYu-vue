<script setup lang="ts">
defineOptions({name:'info'})
definePage({
  meta: {
    role: ["user","admin"],
    requiresAuth: true,
    title: "基础信息",
    icon:'mi:bar-chart',
    sort:1,
    parentMeta: {
      role: ["user"],
      requiresAuth: true,
      title: "信息管理",
      icon:'mi:database',
      sort:5
    },
  },
});
</script>
<template>
  <div>基础信息页面</div>
</template>
<style></style>
