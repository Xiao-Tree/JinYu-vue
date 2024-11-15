<script setup lang="ts"></script>
<template>
  <n-layout class="layout" content-class="layout-content"><RouterView></RouterView></n-layout>
</template>
<style>
.layout{
  height: 100%;
}
.layout-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
