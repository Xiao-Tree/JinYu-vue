import { useUserStore } from "@/stores";
import { addRouteMeta, hasRouteAuth, sortRoute } from "@/utils";
import { createRouter, createWebHistory, isNavigationFailure } from "vue-router";
import { routes } from "vue-router/auto-routes";
import { setupLayouts } from "virtual:generated-layouts";
import { useTabsStore } from "@/stores/tabs";

console.log("原始路由：", routes);

addRouteMeta(routes);
sortRoute(routes);

const layoutRoutes = setupLayouts(routes);
const router = createRouter({
  history: createWebHistory(),
  routes: layoutRoutes,
});

console.log("布局路由：", layoutRoutes);

router.beforeEach((to,from) => {
  if(from.matched.length){
    window.$loadingBar.start();
  }
  
  const userStore = useUserStore();

  
  // 需要登录
  if (to.meta.requiresAuth) {
    if (!userStore.isLogin && to.name !== "login") {
      window.$notification.warning({
        title: "无法访问",
        content: "请登录后访问",
        duration: 5000,
      });
      // 若未登录，定向到登录页面
      return { name: "login" };
    } else if (userStore.isLogin)
      if (!hasRouteAuth(to.meta.role as string[], userStore.role)) {
        window.$notification.error({
          title: "无法访问",
          content: "没有访问权限",
          duration: 5000,
        });
        return { path: "/error/403" };
      }
  }
});

router.afterEach((to, from, failure) => {
  if (!isNavigationFailure(failure)) {
    window.$loadingBar.finish();
    // console.log(`导航确定： ${to.fullPath}`);
    if (to.meta.requiresAuth) {
      // 更新导航栏和标签栏
      const tabsStore = useTabsStore();
      tabsStore.addTab({
        title: to.meta?.title as string,
        fullPath: to.fullPath,
        name: to.name,
      });
      tabsStore.updateCurrentTab(to.fullPath);
      tabsStore.updateCurrentMenu(to.name);
    }
  } else {
    window.$loadingBar.error();
  }
});

export default router;
