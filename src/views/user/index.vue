<script setup lang="ts">
defineOptions({name:'user'})
definePage({
  meta: {
    role: ["user","admin"],
    requiresAuth: true,
    title: "个人信息",
    icon:'mi:bar-chart',
    sort:1,
    parentMeta: {
      role: ["user"],
      requiresAuth: true,
      title: "用户管理",
      icon:'mi:user',
      sort:4
    },
  },
});
</script>
<template>
  <div>用户页面</div>
</template>
<style></style>
