<script setup lang="ts">
import { type Component, type RendererElement, type RendererNode } from "vue";
import { useTabsStore } from "@/stores/tabs";
import { useAppStore } from "@/stores";
import { updateMainEl } from "@/utils/hooks";

const tabsStore = useTabsStore();
const isRouterKeepAlive = ref(true);
function reload(component: Component, event: Event) {
  // @ts-ignore
  const name = component.type.name ?? component.type.__name;
  tabsStore.excludes.push(name);
  isRouterKeepAlive.value = false;
  nextTick(() => {
    isRouterKeepAlive.value = true;
    tabsStore.excludes.pop();
  });
}
const appStore = useAppStore();
// 将tabs中当前激活的标签的颜色与#main的背景色保持一致
const baseColor = computed(() =>
  appStore.theme === "dark" ? "#1d161d" : "#f4eef6"
);
onUnmounted(() => updateMainEl());
</script>
<template>
  <main id="main">
    <RouterView v-slot="{ Component, route }">
      <!-- 将tabs传递到header中 -->
      <Teleport
        defer
        to=".content .n-layout-header">
        <Tabs :style="{ '--n-color': baseColor }">
          <!-- 将刷新按钮插入到tabs中 -->
          <n-popover
            trigger="hover"
            placement="bottom-end">
            <template #trigger>
              <n-button
                quaternary
                class="but-refiresh"
                @click="(event) => reload(Component, event)">
                <LottieIcon
                  icon="refresh"
                  mode="click"
                  width="20px"
                  target-el=".but-refiresh"
                  reset-color></LottieIcon>
              </n-button>
            </template>刷新页面</n-popover>
        </Tabs>
      </Teleport>
      <Transition
        mode="out-in"
        name="fade">
        <KeepAlive
          ref="keep"
          :exclude="tabsStore.excludes"
          :max="10">
          <component
            :is="Component"
            v-if="isRouterKeepAlive"
            :key="route.fullPath">
          </component>
          <div v-else></div>
        </KeepAlive>
      </Transition>
    </RouterView>
  </main>
</template>
<style>
.content #main {
  flex-grow: 1;
  margin: 10px;
}

.but-refiresh {
  padding: 0 9px;
  margin: 0 10px;
}

.fade-enter-active {
  transition: all 0.2s ease-out;
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter-from,
.fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
