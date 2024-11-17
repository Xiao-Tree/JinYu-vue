<script setup lang="ts">
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
