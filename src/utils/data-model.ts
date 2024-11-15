import { fetchDeleteRoles, fetchDeleteUser } from "@/api/auth";
import RoleForm from "@/components/form/RoleForm.vue";
import UserForm from "@/components/form/UserForm.vue";
import { appMessage } from "./common";

export function createUserModal(
  sexDict: data.dict,
  deptList: data.deptInfo[],
  roleList: data.role[]
) {
  const m = window.$modal.create({
    title: "新增用户",
    preset: "card",
    style: {
      width: "500px",
    },
    content: () => h(UserForm, { sexDict, deptList, roleList }),
  });
}

export function updateUserModal(
  sexDict: data.dict,
  statusDict: data.dict,
  deptList: data.deptInfo[],
  roleList: data.role[],
  userInfo: table.userInfo
) {
  const m = window.$modal.create({
    title: "更新用户",
    preset: "card",
    style: {
      width: "500px",
    },
    content: () =>
      h(UserForm, { sexDict, statusDict, deptList, roleList, userInfo }),
  });
}

export function deleteUser(userIds: number[]) {
  const m = window.$modal.create({
    title: "删除用户",
    preset: "dialog",
    content: () => `确定要删除用户id为{${userIds}}的用户吗？`,
    positiveText: "确认",
    negativeText: "取消",
    onPositiveClick: () => {
      fetchDeleteUser(userIds).then((res) => {
        if (res.data.value?.data) {
          window.$message.success(res.data.value.msg);
          m.destroy();
        } else {
          window.$message.error(res.data.value?.msg ?? "访问失败");
        }
      });
    },
    onNegativeClick: () => {
      m.destroy();
    },
  });
}

export function createRoleModal(statusDict: data.dict) {
  const m = window.$modal.create({
    title: "新增角色",
    preset: "card",
    style: {
      width: "500px",
    },
    content: () => h(RoleForm, { statusDict: statusDict }),
  });
}

export function updateRoleModal(
  roleInfo: table.roleInfo,
  statusDict: data.dict
) {
  const m = window.$modal.create({
    title: "更新角色",
    preset: "card",
    style: {
      width: "500px",
    },
    content: () => h(RoleForm, { roleInfo, statusDict ,onUpdate:(newRole)=>{
      Object.assign(roleInfo,newRole)
      m.destroy()
    }}),
  });
}

export function deleteRoleModal(roleIds: number[]) {
  const m = window.$modal.create({
    title: "删除角色",
    preset: "dialog",
    content: () => `确定要删除用户id为{${roleIds[0]}}的用户吗？`,
    positiveText: "确认",
    negativeText: "取消",
    onPositiveClick: () => {
      fetchDeleteRoles(roleIds).then((res) => {
        if (res.data.value?.data) {
          window.$message.success(res.data.value.msg);
          m.destroy();
        } else {
          appMessage.error(res.data.value?.msg ?? "删除角色失败");
        }
      });
    },
    onNegativeClick: () => {
      m.destroy();
    },
  });
}
