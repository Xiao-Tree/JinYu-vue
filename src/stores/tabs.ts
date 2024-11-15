import type { TabInfo } from "@/types/common";
import { type TabsInst } from "naive-ui";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useTabsStore = defineStore("tabs", () => {
  const router = useRouter();

  const tabsData = ref<TabInfo[]>([
    { name: "home", fullPath: "/", title: "主页" },
  ]);
  const currentTab = ref<string | number>("/");
  let tabsRef: globalThis.Ref<TabsInst> | null = null;
  const currentMenu = ref<string>("home");
  const excludes = ref<string[]>([]);

  
  function addTab(tab: TabInfo): boolean {
    if (tabsData.value.find((ta) => ta.fullPath === tab.fullPath)) {
      //   window.$message.info(`已存在${tab.fullPath}`);
      return false;
    } else {
      tabsData.value.push(tab);
      // window.$message.info(`已添加${tab.fullPath}`);
      return true;
    }
  }
  function resetTabs() {
    if (tabsData.value.length > 1) {
      tabsData.value.splice(1, tabsData.value.length - 1);
    }
  }

  function deleteTab(name: string) {
    const tabIndex = tabsData.value.findIndex((tab) => tab.fullPath === name);
    if (tabIndex === -1) {
      window.$message.error(`无法删除:${name}`);
    } else if (tabsData.value[tabIndex].name === "home") {
      window.$message.error(`无法删除:主页是固定标签`);
    } else {
      tabsData.value.splice(tabIndex, 1);
      if (name === currentTab.value) {
        router.push({ path: tabsData.value[tabIndex - 1].fullPath });
      }
      // window.$message.success(`已删除:${name}`);
    }
  }

  function setTabsRef(newTabsRef: globalThis.Ref<TabsInst>) {
    if (!tabsRef) {
      tabsRef = newTabsRef;
    } else {
      window.$message.warning("tabsRef不为空");
    }
  }

  function updateCurrentTab(fullPath: string) {
    if (currentTab.value === fullPath) {
      // window.$message.success(`无需更新标签：{ ${fullPath} }`);
    } else {
      currentTab.value = fullPath;
      nextTick(() => tabsRef?.value?.syncBarPosition());
    }
  }

  function updateCurrentMenu(name: string) {
    if (currentMenu.value === name) {
      // window.$message.success(`无需更新菜单：{ ${name} }`);
    } else {
      currentMenu.value = name;
    }
  }
  function addCache(key: string) {
    if (excludes.value.findIndex((k) => k === key) !== -1)
      excludes.value.push(key);
    else window.$message.warning(`已缓存：${key}`);
  }

  function deleteCache(key: string) {
    const keyIndex = excludes.value.findIndex((k) => k === key);
    if (keyIndex !== -1) excludes.value.splice(keyIndex, 1);
    else window.$message.warning(`已删除缓存：${key}`);
  }

  function closeLeft() {
    if (currentTab.value !== "/") {
      const tabIndex = tabsData.value.findIndex(
        (tab) => tab.fullPath === currentTab.value
      );
      if (tabIndex > 1) tabsData.value.splice(1, tabIndex - 1);
    }
  }
  function closeRight() {
    const length = tabsData.value.length;
    const tabIndex = tabsData.value.findIndex(
      (tab) => tab.fullPath === currentTab.value
    );
    if (tabIndex < length - 1) {
      tabsData.value.splice(tabIndex + 1, length - 1 - tabIndex);
    }
  }
  function closeOthers() {
    closeRight();
    closeLeft();
  }
  function closeAll() {
    const length = tabsData.value.length;
    if (length > 1) tabsData.value.splice(1, length - 1);
    if (router.currentRoute.value.fullPath !== "/") {
      router.push({ name: "home" });
    }
  }
  return {
    tabsData,
    currentTab,
    currentMenu,
    excludes,
    addTab,
    resetTabs,
    deleteTab,
    setTabsRef,
    updateCurrentTab,
    updateCurrentMenu,
    addCache,
    deleteCache,
    closeLeft,
    closeRight,
    closeOthers,
    closeAll,
  };
});
