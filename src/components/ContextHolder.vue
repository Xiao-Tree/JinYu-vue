<script setup lang="ts">
import { useModal } from 'naive-ui';


if (!window.$message) {
  window.$loadingBar = useLoadingBar();
  window.$dialog = useDialog();
  window.$message = useMessage();
  window.$notification = useNotification();
  window.$modal = useModal();
}

</script>
<template></template>
<style></style>
