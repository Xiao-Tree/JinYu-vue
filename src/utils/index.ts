import { type MenuOption } from "naive-ui";
import { type RouteMeta, type RouteRecordRaw } from "vue-router";
import { useSvgIcon } from "./use-svg-icon-render";
/**
 * 检查用户是否拥有至少一个路由权限
 * @param routeRoles
 * @param userRoles
 * @returns
 */
export function hasRouteAuth(routeRoles: string[] | undefined, userRoles: string[]) {
  // 路由权限为空
  if (!routeRoles?.length) {
    return true;
    // 路由权限不为空并且用户权限为空
  } else if (!userRoles.length) {
    return false;
  } else {
    return routeRoles.some(
      (role) => userRoles.findIndex((r) => r === role) !== -1
    );
  }
}

export function setWindowVar() {
  if (!window.$message) {
    console.log("开始设置window变量...");
    window.$message = useMessage();
    window.$notification = useNotification();
  } else {
    console.log("已设置window变量");
  }
}

export function addRouteMeta(routes: RouteRecordRaw[]) {
  routes.forEach((route, index, array) => {
    if (route.children?.length) {
      if (!route.component) {
        if (
          route.children[0].path.length == 0 &&
          route.children[0].meta?.parentMeta
        ) {
          route.meta = route.children[0].meta.parentMeta as RouteMeta;
          route.name = route.children[0].name?.toString().slice(0, -1);
          delete route.children[0].meta.parentMeta;
        }
      }
      addRouteMeta(route.children);
    }
  });
}

export function sortRoute(routes: RouteRecordRaw[]) {
  routes.sort((a, b) => {
    const a_sort = (a.meta?.sort as number) ?? -1;
    const b_sort = (b.meta?.sort as number) ?? -1;
    return a_sort - b_sort;
  });
  routes.forEach((route) => {
    if (route.children?.length) {
      sortRoute(route.children);
    }
  });
}

export function generateMenu(
  routes: readonly RouteRecordRaw[],
  currentUserRoles: string[]
) {
  const menu: MenuOption[] = [];
  const { SvgIconVNode } = useSvgIcon();

  routes.forEach((route) => {
    if (route.meta?.isLayout) {
      route = route.children?.[0] as RouteRecordRaw;
    }
    // 判断路由是否有权限字段，以及当前用户是否有权限
    const routeRoles = route.meta?.role as string[];

    if (route.meta?.hideInMenu) {
      return null;
    } else if (
      routeRoles &&
      !routeRoles.some((role) => currentUserRoles.includes(role))
    ) {
      // 如果当前用户角色不包含在路由的角色中，则跳过这个路由
      return null;
    }

    // 如果有权限，构造菜单项
    if (route.meta) {
      const menuItem: MenuOption = {
        label: route.meta?.title,
        key: route.name as string,
        icon: SvgIconVNode({ icon: route.meta.icon as string }),
      };

      // 如果该路由有子路由，递归生成子菜单
      if (route.children?.length) {
        const childMenu = generateMenu(route.children, currentUserRoles);

        // 如果子菜单有内容才添加子菜单（避免空的children）
        if (childMenu) {
          menuItem.children = childMenu;
        }
      }

      // 将生成的菜单项添加到菜单数组中
      menu.push(menuItem);
    }
  });

  return menu;
}
