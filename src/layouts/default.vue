<script setup lang="ts">
import HeaderVue from "./modules/header.vue";
import MainVue from "./modules/main.vue";
import NavVue from "./modules/nav.vue";
import FooterVue from "./modules/footer.vue";
import { useAppStore } from "@/stores";

const lightThemeOverrides = {
  color: "#f4eef6",
};
const darkThemeOverrides = {
  color: "#1d161d",
};

const appStore = useAppStore();
</script>
<template>
  <n-layout
    has-sider
    class="layout">
    <NavVue></NavVue>
    <div class="content">
      <HeaderVue></HeaderVue>
      <n-layout
        vertical
        size="small"
        :theme-overrides="
          appStore.theme === 'dark' ? darkThemeOverrides : lightThemeOverrides
        "
        content-class="main-scroll"
        :native-scrollbar="false">
        <MainVue></MainVue>
        <FooterVue></FooterVue>
      </n-layout>
    </div>
  </n-layout>
</template>
<style>
.layout {
  height: 100%;
}
.layout .content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
}
.main-scroll {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.n-tabs .n-tabs-nav.n-tabs-nav--top.n-tabs-nav--card-type .n-tabs-tab.n-tabs-tab--active{
  border-bottom: 1px solid var(--n-color);
}
.n-tabs .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab.n-tabs-tab--active{
  background-color: var(--n-color);
}
</style>
