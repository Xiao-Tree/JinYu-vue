import router from "@/router";
import { useUserStore } from "@/stores";
import { appMessage } from "@/utils/common";
import { createFetch, type AfterFetchContext } from "@vueuse/core";
import { useRouter } from "vue-router";

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
      switch (ctx.data.code) {
        case 500:
          appMessage.error(`服务端出现错误：${ctx.data.msg}`);
          break;
        case 400:
          appMessage.error(ctx.data.msg);
      }
      return ctx;
    },
    onFetchError(ctx) {
      switch (ctx.response?.status) {
        case 401:
          appMessage.error(ctx.data.msg ?? "登录凭证失效，请重新登录");
          if (router.currentRoute.value.name !== "login") {
            router.push("/login");
          }
          break;
        case 403:
          appMessage.error(`禁止访问：${ctx.data.msg}`);
          break;
        case 500:
          appMessage.error(`服务端出现错误：${ctx.data.msg}`);
          break;
        default:
          appMessage.error(`${ctx.data.msg}`);
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
