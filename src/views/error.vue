<script setup lang="ts">
import LottieIcon from "@/components/LottieIcon.vue";

definePage({
  name: "error",
  path: "/error/:code(\\d+)",
  meta: {
    layout: "blank",
    requiresAuth: false,
    title: "异常页面",
    hideInMenu: true,
    sort: 101,
  },
  props: true,
});

const errorMessages = {
  '404': "没有找到资源",
  '403': "没有访问权限",
  '500': "访问异常",
};
const { code } = defineProps<{ code: string }>();
let errorIcon = "error";
let message = "未知错误";

onBeforeMount(() => {
  if (code!==errorIcon && code in errorMessages) {
    message = errorMessages[code as never];
    errorIcon=code
  }
});
</script>
<template>
  <div class="error-content">
    <div>状态码：{{ code }}</div>
    <div>消息：{{ message }}</div>
    <LottieIcon
      :icon="errorIcon"
      max-width="800px"></LottieIcon>
  </div>
</template>
<style>
.error-content {
  text-align: center;
}
.error-lottie {
  max-width: 200;
  max-height: 200;
}
</style>
