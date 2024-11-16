import router from "@/router";
import { useUserStore } from "@/stores";
import { appMessage } from "@/utils/common";
import { createFetch, type AfterFetchContext } from "@vueuse/core";

export const useMyFetch = createFetch({
  baseUrl: import.meta.env.VITE_BASE_URL,
  combination: "chain",
  options: {
    immediate: false,
    updateDataOnError: true,
    timeout: 3000,

    // 预配置实例中的beforeFetch，只会在新生成的实例没有通过beforeFetch时运行
    beforeFetch({ url, options, cancel }) {
      console.log(`fetch:${url}`);
      const userStore = useUserStore();
      const token = userStore.token;
      if (!token) {
        return { options };
      } else {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return { options };
    },
    afterFetch(ctx: AfterFetchContext) {
      const msg = ctx.data.msg ?? "服务器出现错误";
      switch (ctx.data.code) {
        case 500:
          appMessage.error(msg);
          break;
        case 400:
          appMessage.error(msg);
      }
      return ctx;
    },
    onFetchError(ctx) {
      const msg = ctx.data.msg;
      switch (ctx.response?.status) {
        case 401:
          appMessage.error(msg ?? '登录凭证无效，请重新登录');
          if (router.currentRoute.value.name !== "login") {
            router.push("/login");
          }
          break;
        case 403:
          appMessage.error(msg ?? '禁止访问');
          break;
        case 500:
          appMessage.error(msg ?? '服务器出现错误');
          break;
        default:
          appMessage.error(msg ?? '未知错误');
      }
      return ctx;
    },
  },
  fetchOptions: {
    mode: "cors",
    method: "GET",
    redirect: "error",
  },
});
