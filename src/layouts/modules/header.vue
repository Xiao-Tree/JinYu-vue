<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { useAppStore, useUserStore } from "@/stores";
import { useTabsStore } from "@/stores/tabs";
import { useSvgIcon } from "@/utils/use-svg-icon-render";
import { useThemeVars, type DropdownOption } from "naive-ui";
import { useRoute, useRouter } from "vue-router";

const appStore = useAppStore();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const options: DropdownOption[] = [
  {
    label: "浅色",
    key: "light",
    icon:()=> h(SvgIcon,{icon:'mi:sun'})
  },
  {
    label: "深色",
    key: "dark",
    icon:()=> h(SvgIcon,{icon:'mi:moon'})
  },
  {
    label: "自动",
    key: "auto",
    icon:()=> h(SvgIcon,{icon:'mi:computer'})
  },
];
function handleSelect(key: "light" | "dark" | "auto") {
  appStore.setTheme(key);
}

const { SvgIconVNode } = useSvgIcon();
const router = useRouter();
const userOptions: DropdownOption[] = [
  {
    label: "个人中心",
    key: "user",
    icon: SvgIconVNode({ icon: "mi:user" }),
    props: {
      onClick: () => {
        router.push({ name: "user_" });
      },
    },
  },
  {
    label: "退出登录",
    key: "logout",
    icon: SvgIconVNode({ icon: "mi:log-out" }),
    props: {
      onClick: () => {
        const m = window.$modal.create({
          title: "提示",
          preset: "dialog",
          content: "是否退出登录?",
          positiveText: "确认",
          negativeText: "取消",
          onPositiveClick: () => {
            m.destroy();
            router.push({ name: "login" });
            userStore.$reset();
            tabsStore.resetTabs();
          },
          onNegativeClick: () => window.$message.info("已取消"),
        });
      },
    },
  },
];

const route = useRoute();
const themeVars = useThemeVars();
</script>
<template>
  <n-layout-header id="header">
    <div class="head-info">
      <n-breadcrumb>
        <template v-for="route in route.matched">
          <n-breadcrumb-item v-if="route?.meta?.title"
            >{{ route.meta.title }}
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
      <LottieIcon
        icon="github"
        class="github-but"
        mode="hover"
        component="a"
        href="https://github.com/Xiao-Tree"
        title="github"
        target="_blank"
        max-width="24px"
        :style="{ '--n-color-hover': themeVars.buttonColor2Hover }"
        reset-color></LottieIcon>
      <n-dropdown
        trigger="click"
        :show-arrow="true"
        :options="options"
        @select="handleSelect">
        <n-button
          quaternary
          size="small"
          >主题</n-button
        >
      </n-dropdown>
      <n-dropdown
        trigger="click"
        :show-arrow="true"
        :options="userOptions">
        <n-button
          quaternary
          class="user-button"
          type="primary">
          <n-avatar
            size="small"
            round
            :src="userStore.avatar" />
          <span class="username">{{ userStore.username }}</span></n-button
        >
      </n-dropdown>
    </div>
  </n-layout-header>
</template>
<style>
#header {
  padding: 10px 0px 0px 0px;
}

.head-info {
  display: flex;
  margin-bottom: 16px;
  padding: 0 10px;
  gap: 10px;
  align-items: center;
}
.github-but {
  margin-left: auto;
  cursor: pointer;
  border-radius: 3px;
}
.github-but :hover {
  background-color: var(--n-color-hover);
}
.user-button .n-button__content {
  gap: 6px;
}

@media only screen and (max-width: 400px) {
  .username {
    display: none;
  }
}
</style>
