interface Result<T> {
  code: number;
  msg: string;
  data: T;
}
// 分页数据包装体
interface page<T> {
  /**
   * 数据列表
   */
  records: T[];
  /**
   * 当前页
   */
  pageNumber: number;
  /**
   * 每页数量
   */
  pageSize: number;
  /**
   * 总页数
   */
  totalPage: number;
  /**
   * 总数量
   */
  totalRow: number;
}

module table {
  interface userInfo {
    id: number | null;
    username: string;
    password?: string;
    sex: number | null;
    email: string | null;
    phoneNum: string | null;
    avatar?: File | string | null;
    deptId: number | null;
    roleIds: number[];
    status?: number;
    createAt?: string;
    updateAt?: string;
  }

  interface roleInfo {
    id: number;
    name: string;
    key: string;
    status: number;
    comment: string;
    createAt: string;
    menus: number[];
  }
}

module form {
  interface dictInfo extends data.dictType {
    id: number | null;
    name: string | null;
    key: string | null;
    values: data.dictValue[];
  }
}

module data {
  interface dict {
    type: dictType;
    values: dictValue[];
  }
  interface dictType {
    id: number;
    name: string;
    key: string;
    status: boolean;
    comment: string | null;
  }
  interface dictValue {
    typeId?: number;
    label: string;
    value: number;
    orderNum: number;
  }
  /**
   * 角色基础信息
   */
  interface role {
    id: number;
    name: string;
  }

  interface baseMenu {
    id: number;
    name: string;
    parentId: number;
    children: baseMenu[] | null;
  }
  interface deptInfo {
    id: number;
    name: string;
  }
  interface LoginUser {
    uid: number;
    username: string;
    avatar: string;
    roles: string[];
    auth: string;
  }
}

module api {
  interface createUser {
    username: string;
    password: string;
    sex: number | null;
    email?: string | null;
    avatar?: File | null;
    phoneNum: string | null;
    deptId: number | null;
    roleIds: number[] | null;
  }
}

module common {
  interface rule {
    regexp: RegExp;
    message: string;
  }
  interface fromItem {
    path: string;
    label: string;
    content: () => VNode | number | string | null | undefined;
  }
}

/**
 * 
 * {
    "cpuNum": 6,
    "toTal": 6000,
    "sys": 0.52,
    "user": 0,
    "wait": 0,
    "free": 99.22,
    "cpuModel": "Intel(R) Core(TM) i5-8600K CPU @ 3.60GHz\n 1 physical CPU package(s)\n 6 physical CPU core(s)\n 6 logical CPU(s)\nIdentifier: Intel64 Family 6 Model 158 Stepping 10\nProcessorID: BFEBFBFF000906EA\nMicroarchitecture: Coffee Lake",
    "ticks": {
        "idle": 5953,
        "nice": 0,
        "irq": 16,
        "softIrq": 0,
        "steal": 0,
        "cSys": 31,
        "user": 0,
        "ioWait": 0
    },
    "used": 0.78
}
 */
