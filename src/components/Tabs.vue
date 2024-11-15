<script setup lang="ts">
import {
  type ButtonProps,
  type DropdownOption,
  type TabsInst,
} from "naive-ui";
import SvgIcon from "./SvgIcon.vue";
import { useTabsStore } from "@/stores/tabs";

const buttonThemeOverrides: NonNullable<ButtonProps["themeOverrides"]> = {
  paddingMedium: "0 3px",
};

const tabsRef = ref<TabsInst | null>(null);

const tabsStore = useTabsStore();

const options: DropdownOption[] = [
  {
    label: "关闭左侧页面",
    key: "closeLeft",
    props: {
      onClick: tabsStore.closeLeft,
    },
  },
  {
    label: "关闭右侧页面",
    key: "closeRight",
    props: {
      onClick: tabsStore.closeRight,
    },
  },
  {
    label: "关闭其他页面",
    key: "closeOthers",
    props: {
      onClick: tabsStore.closeOthers,
    },
  },
  {
    label: "关闭全部页面",
    key: "closeAll",
    props: {
      onClick: tabsStore.closeAll,
    },
  },
];
</script>
<template>
  <n-tabs
    type="card"
    size="small"
    ref="tabsRef"
    v-model:value="tabsStore.currentTab"
    :tabs-padding="10"
    @close="tabsStore.deleteTab"
    @update:value="(value: string)=>$router.push({path:value})"
    closable>
    <n-tab
      v-for="tab in tabsStore.tabsData"
      :name="tab.fullPath"
      :key="tab.fullPath"
      >{{ tab.title }}</n-tab
    >
    <template #suffix>
      <n-dropdown
        trigger="hover"
        :options="options"
        placement="bottom-end">
        <n-button
          quaternary
          style="cursor: default"
          :theme-overrides="buttonThemeOverrides">
          <template #icon>
            <SvgIcon icon="mi:options-vertical"></SvgIcon>
          </template>
        </n-button>
      </n-dropdown>
      <slot></slot>
    </template>
  </n-tabs>
</template>
<style></style>
