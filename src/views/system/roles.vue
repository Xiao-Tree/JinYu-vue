<script setup lang="ts">
import { fetchQueryMenus, fetchQueryRoles } from "@/api/auth";
import SvgIcon from "@/components/SvgIcon.vue";
import { useDictStore } from "@/stores/data";
import { getType } from "@/utils/common";
import {
  createRoleModal,
  deleteRoleModal,
  updateRoleModal,
} from "@/utils/data-model";
import {
  NButton,
  NSpace,
  NTag,
  type DataTableColumns,
  type PaginationProps,
} from "naive-ui";
import type { RowData } from "naive-ui/es/data-table/src/interface";

definePage({
  meta: {
    role: ["admin"],
    requiresAuth: true,
    title: "角色管理",
    icon: "mi:user-check",
    sort: 3,
  },
});

const data = ref<table.roleInfo[]>([]),
  dictStore = useDictStore(),
  statusDict = ref<data.dict>(),
  menuList = ref<data.baseMenu[]>([]),
  roleInfo = ref<table.roleInfo>(),
  isFetching = ref(true),
  isActive = ref(false),
  columns: DataTableColumns<table.roleInfo> = [
    {
      title: "id",
      key: "id",
      align: "center",
      maxWidth: 60,
    },
    {
      title: "名称",
      key: "name",
      align: "center",
      maxWidth: 120,
    },
    {
      title: "标识",
      key: "key",
      align: "center",
      maxWidth: 120,
    },
    {
      title: "状态",
      key: "status",
      align: "center",
      maxWidth: 60,
      render: (row) =>
        h(
          NTag,
          { type: getType(row.status) },
          () =>
            statusDict.value?.values.find((v) => v.value === row.status)?.label
        ),
    },
    {
      title: "备注",
      key: "comment",
      align: "center",
    },
    {
      title: "操作",
      key: "operation",
      align: "center",
      width: 240,
      render: (row) =>
        h(NSpace, () => [
          h(
            NButton,
            {
              type: "tertiary",
              size: "tiny",
              onClick: () => {
                roleInfo.value = row;
                isActive.value = true;
              },
            },
            () => "权限"
          ),
          h(
            NButton,
            {
              type: "warning",
              size: "tiny",
              onClick: () =>
                updateRoleModal(row, statusDict.value as data.dict),
            },
            {
              default: () => "编辑",
              icon: () => h(SvgIcon, { icon: "mi:edit-alt" }),
            }
          ),
          h(
            NButton,
            {
              type: "error",
              size: "tiny",
              onClick: () => deleteRoleModal([row.id]),
            },
            {
              default: () => "删除",
              icon: () => h(SvgIcon, { icon: "mi:delete" }),
            }
          ),
        ]),
    },
  ],
  pagination = reactive<PaginationProps>({
    page: 1,
    pageSize: 10,
    pageCount: undefined,
    itemCount: undefined,
    showSizePicker: true,
    pageSizes: [10, 20, 40],
    onChange: (page: number) => {
      pagination.page = page;
      getData();
    },
    onUpdatePageSize: (pageSize: number) => {
      if (pagination.pageSize && pagination.itemCount) {
        if (
          pageSize > pagination.pageSize &&
          pagination.itemCount > pagination.pageSize
        ) {
          getData();
        }
      }
      pagination.pageSize = pageSize;
      if (pagination.page !== 1) {
        pagination.page = 1;
      }
    },
  });

function getData() {
  const {
    execute,
    data: d,
    onFetchResponse,
  } = fetchQueryRoles(
    pagination.page as number,
    pagination.pageSize as number,
    pagination.itemCount
  );
  onFetchResponse((res) => {
    data.value = d.value?.data.records as table.roleInfo[];
    pagination.itemCount = d.value?.data.totalRow;
  });
  execute();
}
Promise.all([getData(), dictStore.getDict("status"), fetchQueryMenus()])
  .then((datas) => {
    statusDict.value = datas[1];
    menuList.value.push(...(datas[2].data.value?.data as data.baseMenu[]));
  })
  .finally(() => (isFetching.value = false));

function createRole() {
  createRoleModal(statusDict.value as data.dict);
}
</script>
<template>
  <n-card title="角色管理">
    <n-space style="margin-bottom: 10px">
      <n-button
        type="info"
        size="small"
        @click="createRole">
        <template #icon>
          <SvgIcon icon="mi:circle-add" /> </template
        >新增</n-button
      >
    </n-space>
    <n-data-table
      :columns="columns"
      :data="data"
      :loading="isFetching"
      remote
      :row-key="(row:RowData) => row.id"
      :pagination="pagination" />
    <n-drawer
      v-model:show="isActive"
      :width="350">
      <n-drawer-content
        :title="`${roleInfo?.name} · 权限列表`"
        closable
        :trap-focus="false">
        <MenuTree
          :menuList="menuList"
          :roleInfo="roleInfo"
          @update-menus="(newMenus: number[])=>{
            isActive=false
            if(roleInfo){
              roleInfo.menus=newMenus
            }
          }" />
      </n-drawer-content>
    </n-drawer>
  </n-card>
</template>
<style></style>
