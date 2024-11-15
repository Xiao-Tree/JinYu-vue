const rules: Record<any, common.rule> = {
  username: {
    regexp: /^[a-zA-Z0-9_-]{4,16}$/,
    message: "用户名要求4到16位，可以包含（字母，数字，下划线，减号）",
  },
  password: {
    regexp:
      /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
    message:
      "密码最少6位，至少包括1个大写字母，1个小写字母，1个数字，1个特殊字符",
  },
  email: {
    regexp: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    message: "请输入合法邮箱地址",
  },
  phoneNum: {
    regexp: /^(?:(?:\+|00)86)?1\d{10}$/,
    message: "请输入合法手机号",
  },
};

export function verifyValue(value: string, type: string) {
  if (!rules[type].regexp.test(value)) {
    throw new Error(rules[type].message);
  }
  return true;
}

type Type = "default" | "error" | "primary" | "info" | "success" | "warning";
const typeList: Type[] = ["success", "warning", "error", "info", "primary"];
export function getType(value: number) {
  return value < 5 ? typeList[value] : typeList[(value % 5) - 1];
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // 补零，月份从0开始
  const day = ("0" + date.getDate()).slice(-2); // 补零

  const hours = ("0" + date.getHours()).slice(-2); // 补零
  const minutes = ("0" + date.getMinutes()).slice(-2); // 补零
  const seconds = ("0" + date.getSeconds()).slice(-2); // 补零

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 测试生命周期
 * @param name 组件名称
 */
export function useLifecycle(name: string) {
  onMounted(() => console.log(`onMounted: ${name}`));
  onUnmounted(() => console.log(`onUnmounted: ${name}`));
  onActivated(() => console.log(`onActivated: ${name}`));
  onDeactivated(() => console.log(`onDeactivated: ${name}`));
}

export function findMenu(
  menuList: data.baseMenu[],
  menuId: number
): data.baseMenu | null {
  let menu: data.baseMenu | null = null;
  for (const m of menuList) {
    if (m.id === menuId) {
      menu = m;
      break;
    }
    if (m.children?.length) {
      menu = findMenu(m.children, menuId);
      if (menu) {
        break;
      }
    }
  }

  return menu;
}

export const appMessage = {
  error: (message: string) => {
    window.$message.error(message, {
      duration: 0,
      closable: true,
    });
  },
};
