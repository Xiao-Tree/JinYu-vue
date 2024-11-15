<script setup lang="ts">
import { fetchUpdateRoleMenus } from "@/api/auth";
import { findMenu } from "@/utils/common";
import type { TreeOption } from "naive-ui";
import { useTemplateRef } from "vue";

const props = defineProps<{
  menuList: data.baseMenu[];
  roleInfo?: table.roleInfo;
}>();
const emit = defineEmits(["updateMenus"]);

const originalRoleMenus: number[] = props.roleInfo?.menus ?? [];
const defaultCheckedKeys = originalRoleMenus.filter(
  (m) => findMenu(props.menuList, m)?.children === null
);
const treeRef = useTemplateRef("tree");
const isFetching = ref(false);

function updateMenus() {
  const addMenus: number[] = [];
  const removeMenus: number[] = [];
  const currentMenus: number[] =
    (treeRef.value?.getCheckedData().keys as number[]) ?? [];
  currentMenus.push(
    ...((treeRef.value?.getIndeterminateData().keys as number[]) ?? [])
  );
  removeMenus.push(
    ...originalRoleMenus.filter(
      (k) => currentMenus.findIndex((m) => m === k) === -1
    )
  );
  addMenus.push(
    ...currentMenus.filter(
      (m) => originalRoleMenus.findIndex((k) => k === m) === -1
    )
  );
  console.log("toAdd=>", addMenus, "toRemove=>", removeMenus);
  if (!addMenus.length && !removeMenus.length) {
    window.$message.warning("没有修改任何信息");
    return;
  }

  isFetching.value = true;
  const {
    execute,
    onFetchResponse,
    data: d,
  } = fetchUpdateRoleMenus(props.roleInfo?.id as number, addMenus, removeMenus);
  onFetchResponse(() => {
    if (d.value?.data) {
      window.$message.success("角色权限已更新");
      emit("updateMenus", currentMenus);
    } else {
      window.$message.warning(d.value?.msg ?? "角色权限更新异常");
    }
  });
  execute().finally(() => (isFetching.value = false));
}
</script>
<template>
  <!-- @vue-expect-error -->
  <n-tree
    ref="tree"
    :data="props.menuList"
    :default-checked-keys="defaultCheckedKeys"
    default-expand-all
    expand-on-click
    multiple
    cascade
    checkable
    key-field="id"
    label-field="name" />
  <n-button
    @click="updateMenus"
    :loading="isFetching"
    >更新</n-button
  >
</template>
<style></style>
