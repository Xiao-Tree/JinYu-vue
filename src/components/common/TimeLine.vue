<script setup lang="ts">
import type { TimelineItemProps } from "naive-ui";

const items: TimelineItemProps[] = [
  { title: "项目立项", time: "2023-12-03", type: "info" },
  { title: "需求分析", time: "2023-12-05", type: "warning" },
  { title: "系统设计", time: "2023-12-15", type: "success" },
  { title: "实现与编码", time: "2023-12-20", type: "error" },
  { title: "测试", time: "2024-02-06", type: "warning" },
  { title: "部署", time: "2024-02-12", type: "success" },
  { title: "维护", time: "2024-02-13", type: "info" },
  { title: "至今" },
];
</script>
<template>
  <n-timeline>
    <n-timeline-item
      v-for="item in items"
      :key="item.title"
      :title="item.title"
      :time="item.time"
      :type="item.type" />
  </n-timeline>
</template>
<style></style>
