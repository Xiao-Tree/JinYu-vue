import { useOsTheme } from "naive-ui";
import { defineStore } from "pinia";

export const useAppStore = defineStore(
  "app",
  () => {
    const osTheme = useOsTheme();
    const userTheme = ref<"light" | "dark" | "auto">("auto");
    const theme = computed(() => {
      if (userTheme.value != "auto") return userTheme.value;
      else return osTheme.value;
    });
    const menuCollapsed = ref(true);

    function setTheme(theme: "light" | "dark" | "auto") {
      userTheme.value = theme;
    }
    return {
      userTheme,
      menuCollapsed,
      theme,
      setTheme,
    };
  },
  {
    persist: true,
  }
);

export const useUserStore = defineStore(
  "user",
  () => {
    const username = ref<null | string>(null);
    const uid = ref<null | number>(null);
    const token = ref<null | string>(null);
    const userAvatar = ref<string | null>(null);
    const role = ref<string[]>([]);
    const isLogin = computed(
      () => !!(username.value && uid.value && token.value)
    );
    const avatar = computed(() =>
      userAvatar.value
        ? `${window.location.origin}${
            import.meta.env.VITE_BASE_URL
          }/resources/upload/${userAvatar.value}`
        : "/src/assets/avatar.svg"
    );

    function $reset() {
      username.value = null;
      uid.value = null;
      token.value = null;
      userAvatar.value = null;
      role.value.splice(0, role.value.length);
    }

    return { username, uid, token, avatar, userAvatar, role, isLogin, $reset };
  },
  {
    persist: true,
  }
);
