<script setup lang="ts">
import { RouterView } from "vue-router";
import {
  darkTheme,
  NConfigProvider,
  zhCN,
  type GlobalThemeOverrides,
} from "naive-ui";
import { useAppStore } from "./stores";

const appStore = useAppStore();

const appTheme = computed(() => (appStore.theme === "dark" ? darkTheme : null));

const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    // 用户名
    primaryColor: "#eb14eb",
    // successColor:'#14eb14',
    primaryColorHover: "#df7de8",
    // --n-toggle-button-color
    // baseColor:'#66ff7f',
    // bodyColor:'#ccffd4',
  },

  // Menu:{
  //   itemTextColor:'#e5ffea',
  //   itemIconColor:'#e5ffea',
  //   // item尾部图标
  //   arrowColor:'#e5ffea',

  //   itemColorActive:'#33ff55',
  //   itemTextColorActive:'#003308',
  //   itemIconColorActive:'#003308',

  //   itemColorActiveHover:'#00cc22',

  //   itemIconColorChildActiveHover:'#009919',
  //   itemTextColorChildActiveHover:'#009919',
  //   arrowColorChildActiveHover:'#009919',

  //   itemIconColorCollapsed:'#66ff7f',
  //   // itemColorActiveHoverInverted:'#ffaa00',
  //   // arrowColorActiveHoverInverted:'#0055ff',
  //   itemColorActiveCollapsed:'#ff0015',
  //   // itemColorActiveCollapsedInverted:'#0055ff'
  // },
  // Layout:{
  //   siderColor:'#fbd0fb',
  //   siderBorderColor:'#fbd0fb',
  // headerColor:'#00cc22'
  // },
  Tabs: {
    // tabBorderColor:'#ff0015',
    // tabColorSegment:'#ff0015',
    // closeColorHover:'#d92635',
    tabBorderColor: "#faebfa",
    tabTextColorActiveCard: "#a219e6",
    // tabColor:'#faebfa',
    tabColorSegment: "#faebfa",
    tabBorderRadius: "16px",
    tabPaddingSmallCard: "7px 16px",

    // tabTextColorActiveCard:'#f4eef6'
    // tabTextColorActiveCard:'#ff2b00',
    // colorSegment:'#ffaa00',
    // barColor:'#ff2b00'
  },
  // Button:{
  //   colorHoverWarning:'#ff33ee',
  //   colorHover:'#ff33ee',
  //   color:'#ff33ee'
  // }
};

const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#eb14eb",
  },
};
onMounted(() => {
  const loadEl = document.querySelector(".loader-container");
  if (loadEl) {
    // 添加退场动画的类
    loadEl.classList.add("hidden");
    // 等待动画完成后移除元素
    loadEl.addEventListener("transitionend", removeEl);
  }
  // 从 DOM 中删除
  function removeEl() {
    loadEl?.removeEventListener("transitionend", removeEl);
    loadEl?.remove();
  }
});
</script>
<template>
  <n-config-provider
    :theme="appTheme"
    :locale="zhCN"
    :theme-overrides="
      appTheme === null ? lightThemeOverrides : darkThemeOverrides
    "
    :inline-theme-disabled="true"
    :abstract="true">
    <AppProvider>
      <router-view></router-view>
    </AppProvider>
  </n-config-provider>
</template>

<style>
body {
  margin: 0;
}
#app {
  height: 100vh;
  width: 100vw;
}
</style>
