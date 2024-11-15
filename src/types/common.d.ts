import type { MessageApiInjection } from "naive-ui/es/message/src/MessageProvider";
import type { NotificationApiInjection } from "naive-ui/es/notification/src/NotificationProvider";
import type { LoadingBarApiInjection } from "naive-ui/es/loading-bar/src/LoadingBarProvider";
import type { DialogApiInjection } from "naive-ui/es/dialog/src/DialogProvider";
import type { ModalApiInjection } from "naive-ui/es/modal/src/ModalProvider";

declare global {
  interface Window {
    $message: MessageApiInjection;
    $notification: NotificationApiInjection;
    $loadingBar: LoadingBarApiInjection;
    $dialog: DialogApiInjection;
    $modal: ModalApiInjection;
  }
}

interface IconConfig {
  /** Iconify icon name */
  icon?: string;
  /** Local icon name */
  localIcon?: string;
  /** Icon color */
  color?: string;
  /** Icon size */
  fontSize?: number;
}

interface TabInfo {
  /** name */
  name: string;
  /** 地址 */
  fullPath: string;
  /** 标题 */
  title: string;
}

module chart {
  interface dataItem {
    name: string;
    value: (string | number | null)[];
  }
}

interface message<T> {
  type: string;
  sendTime: string;
  data: T;
}

module ws {
  interface data {
    cpuUsed: number;
    memoryUsed: number;
  }
}
interface activeUser {
  avatar: string;
  username: string;
  dept: string;
  sex: string;
}

/**
 * 构建缺省的对象类型工具，值可为null
 */
type ModelUtil<T> = {
  [K in keyof T]?: T[K] | null;
};
