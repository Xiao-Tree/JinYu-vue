import { useMyFetch } from ".";

export function fetchDict(key: string) {
  return useMyFetch(`/users/dicts/${key}`, {
    immediate: false,
  }).json<Result<data.dict>>();
}

export function fetchDictList(
  page: number,
  pageSize: number,
  totalRow?: number
) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());
  if (totalRow) {
    params.append("totalRow", totalRow.toString());
  }
  return useMyFetch(`/system/dicts?${params}`).json<
    Result<page<data.dictType>>
  >();
}

export function fetchDictValues(dictId: number) {
  return useMyFetch(`/system/dicts/${dictId}`, { immediate: true }).json<
    Result<data.dictValue[]>
  >();
}

export function fetchCreateDict(dict: form.dictInfo) {
  return useMyFetch("/system/dicts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dict),
  }).json<Result<boolean>>();
}

export function fetchDeleteDicts(dictIds: number[]) {
  return useMyFetch(
    "/system/dicts",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dictIds),
    },
    { immediate: true }
  ).json<Result<boolean>>();
}

export function fetchUpdateDict(dictInfo: Object) {
  return useMyFetch("/system/dicts", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dictInfo),
  }).json<Result<boolean>>();
}

export function fetchDeptList() {
  return useMyFetch("/system/cache/depts", { immediate: true }).json();
}

export function fetchRoleList() {
  return useMyFetch("/system/cache/roles", { immediate: true }).json();
}

export function fetchQueryUsers(
  page: number,
  pageSize: number,
  totalRow?: number
) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());
  if (totalRow) {
    params.append("totalRow", totalRow.toString());
  }
  return useMyFetch(`/system/users?${params}`).json();
}

export function fetchCreateUser(userInfo: table.userInfo) {
  const formData = new FormData();
  Object.entries(userInfo).forEach((info) => {
    if (info[1] !== null && info[1] !== undefined) {
      formData.append(info[0], info[1]);
    }
  });
  return useMyFetch(
    "/system/users",
    {
      method: "POST",
      body: formData,
    },
    { immediate: true }
  ).json();
}

export function fetchUpdateUser(newUserInfo: [string, any][], uid: number) {
  const formData = new FormData();
  newUserInfo.forEach((info) => formData.append(info[0], info[1]));
  return useMyFetch(`/system/users/${uid}`, {
    method: "PUT",
    body: formData,
  }).json();
}

export function fetchDeleteUser(userIds: number[]) {
  const formData = new FormData();
  formData.append("userIds", userIds.toString());
  return useMyFetch(
    "/system/users",
    { method: "DELETE", body: formData },
    { immediate: true }
  ).json<Result<boolean>>();
}

export function fetchQueryRoles(
  page: number,
  pageSize: number,
  totalRow?: number
) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());
  if (totalRow) {
    params.append("totalRow", totalRow.toString());
  }
  return useMyFetch(`/system/roles?${params}`).json<
    Result<page<table.roleInfo>>
  >();
}

export function fetchQueryMenus() {
  return useMyFetch("/system/roles/menu", { immediate: true }).json<
    Result<data.baseMenu[]>
  >();
}

export function fetchCreateRole(roleInfo: table.roleInfo) {
  const formData = new FormData();
  Object.entries(roleInfo).forEach((info) => {
    if (info[1] !== null && info[1] !== undefined) {
      formData.append(info[0], info[1]);
    }
  });
  return useMyFetch("/system/roles", { method: "POST", body: formData }).json<
    Result<boolean>
  >();
}

export function fetchUpdateRole(roleInfo: table.roleInfo, roleId: number) {
  const formData = new FormData();
  Object.entries(roleInfo).forEach((info) => {
    if (info[1] !== null && info[1] !== undefined) {
      formData.append(info[0], info[1]);
    }
  });
  return useMyFetch(`/system/roles/${roleId}`, {
    method: "PUT",
    body: formData,
  }).json<Result<boolean>>();
}

export function fetchDeleteRoles(roleIds: number[]) {
  return useMyFetch(
    "/system/roles",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleIds),
    },
    { immediate: true }
  ).json<Result<boolean>>();
}

export function fetchUpdateRoleMenus(
  roleId: number,
  addMenus: number[],
  removeMenus: number[]
) {
  return useMyFetch(`/system/menus/${roleId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ addMenus, removeMenus }),
  }).json<Result<boolean>>();
}
