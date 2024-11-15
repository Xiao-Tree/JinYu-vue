<script setup lang="ts">
import { NMenu, type MenuOption } from "naive-ui";
import { useRouter } from "vue-router";
import { useAppStore, useUserStore } from "@/stores";
import { storeToRefs } from "pinia";
import { generateMenu } from "@/utils";
import { useTabsStore } from "@/stores/tabs";
import { useWindowSize } from "@vueuse/core";

const appStore = useAppStore();
const { menuCollapsed } = storeToRefs(appStore);
const userStore = useUserStore();
const router = useRouter();

let menuOptions: MenuOption[] = [];
const tabsStore = useTabsStore();
onBeforeMount(() => {
  menuOptions = generateMenu(router.options.routes, userStore.role);
});

function handleUpdateValue(key: string, item: MenuOption) {
  router.push({ name: key as never });
}
const { width } = useWindowSize();
// 折叠后的菜单宽度
const collapseWidth = computed(() => (width.value > 600 ? 64 : 0));
// 是否为绝对定位
const isAbsolute = computed(() => collapseWidth.value === 0);
</script>
<template>
  <n-layout-sider
    collapse-mode="width"
    :collapsed-width="collapseWidth"
    :width="230"
    show-trigger="bar"
    :class="{ absolute: isAbsolute }"
    :show-collapsed-content="true"
    :collapsed="menuCollapsed"
    @collapse="menuCollapsed = true"
    @expand="menuCollapsed = false"
    :native-scrollbar="false"
    bordered>
    <n-menu
      v-model:value="tabsStore.currentMenu"
      :options="menuOptions"
      :collapsed="menuCollapsed"
      :collapsed-width="64"
      :collapsed-icon-size="28"
      accordion
      @update:value="handleUpdateValue"></n-menu>
  </n-layout-sider>
</template>
<style>
.absolute {
  position: absolute;
  height: 100%;
  z-index: 20;
}
</style>
