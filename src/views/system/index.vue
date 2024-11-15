<script setup lang="ts">
import { ping, wsSystem } from "@/api/socket";

defineOptions({ name: "system" });
definePage({
  meta: {
    role: ["admin"],
    requiresAuth: true,
    title: "概览",
    icon: "mi:bar-chart",
    sort: 1,
    parentMeta: {
      role: ["admin"],
      requiresAuth: true,
      title: "系统管理",
      icon: "mi:computer",
      sort: 3,
    },
  },
});
const { status, data, send, open, close } = wsSystem();

function connection() {
  ping().then((res) => {
    if (res.data.value?.data) {
      open();
    }
  });
}
onActivated(() => connection());
onDeactivated(() => close());
</script>
<template>
  <div class="monitor">
    <n-table
      class="system-info"
      :bordered="true"
      :single-line="false"></n-table>
    <PieChart></PieChart>
    <n-card :title="status">
      <template #header-extra>
        <n-space>
          <n-button @click="close()">取消</n-button>
          <n-button @click="connection">连接</n-button>
        </n-space>
      </template>
      <system-info :data="data"></system-info>
    </n-card>
    <Dependencies></Dependencies>
  </div>
</template>
<style>
.monitor {
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
}
.monitor > *{
  flex-grow: 1;
}
.monitor .dependencies{
  height: min-content;
  flex-basis: 350px;
}
.system-info {
  flex-basis: 480px;
}

</style>
