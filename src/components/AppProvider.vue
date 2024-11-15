<script setup lang="ts">
import ContextHolder from "./ContextHolder.vue";
</script>
<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <NNotificationProvider>
        <NMessageProvider>
          <n-modal-provider>
            <ContextHolder />
            <slot></slot>
          </n-modal-provider>
        </NMessageProvider>
      </NNotificationProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>
<style></style>
