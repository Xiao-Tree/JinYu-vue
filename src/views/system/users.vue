<script setup lang="ts">
import { fetchDeptList, fetchQueryUsers, fetchRoleList } from "@/api/auth";
import SvgIcon from "@/components/SvgIcon.vue";
import { useDictStore } from "@/stores/data";
import { getType } from "@/utils/common";
import {
  createUserModal,
  updateUserModal,
  deleteUser,
} from "@/utils/data-model";
import {
  NAvatar,
  NButton,
  NDropdown,
  NSpace,
  NTag,
  type DataTableColumns,
  type DataTableRowKey,
  type PaginationProps,
} from "naive-ui";
import type { RowData } from "naive-ui/es/data-table/src/interface";
definePage({
  meta: {
    role: ["admin"],
    hideInMenu: false,
    requiresAuth: true,
    title: "用户管理",
    icon: "mi:users",
    sort: 2,
  },
});
const data = ref<table.userInfo[]>([]),
  selectRow = ref<DataTableRowKey[]>([]),
  dictStore = useDictStore(),
  sexDict = ref<data.dict | null>(null),
  statusDict = ref<data.dict | null>(null),
  deptList = ref<data.deptInfo[]>([]),
  roleList = ref<data.role[]>([]);

const isFetching = ref(true),
  isEdit = computed(() => selectRow.value.length === 1),
  isDelete = computed(() => selectRow.value.length > 0),
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

function getData(updatefetch: boolean = true) {
  const {
    execute,
    onFetchResponse,
    data: d,
  } = fetchQueryUsers(
    pagination.page as number,
    pagination.pageSize as number,
    pagination.itemCount
  );
  if (updatefetch) {
    isFetching.value = true;
  }
  onFetchResponse((response) => {
    data.value = d.value.data.records;
    pagination.itemCount = d.value.data.totalRow;
  });
  execute().finally(() => {
    if (updatefetch) {
      isFetching.value = false;
    }
  });
}

Promise.all([
  getData(false),
  fetchDeptList(),
  fetchRoleList(),
  dictStore.getDict("sex"),
  dictStore.getDict("status"),
]).then((datas) => {
  deptList.value.push(...datas[1].data.value.data);
  roleList.value.push(...datas[2].data.value.data);
  sexDict.value = datas[3] as data.dict;
  statusDict.value = datas[4] as data.dict;
  isFetching.value = false;
});

const columns: DataTableColumns<table.userInfo> = [
  {
    type: "selection",
  },
  {
    title: "UID",
    key: "id",
    align: "center",
    maxWidth: 60,
  },
  {
    title: "用户名",
    key: "username",
    align: "center",
    maxWidth: 120,
  },
  {
    title: "头像",
    key: "avatar",
    align: "center",
    render(row) {
      return row.avatar
        ? h(NAvatar, {
            size: "small",
            round: true,
            src: `${window.location.origin}${
              import.meta.env.VITE_BASE_URL
            }/resources/upload/${row.avatar}`,
          })
        : null;
    },
  },
  {
    title: () => sexDict.value?.type.name,
    key: "sex",
    align: "center",
    maxWidth: 80,
    render(row) {
      return h(
        NTag,
        { type: getType(row.sex as number) },
        () => sexDict.value?.values.find((v) => v.value === row.sex)?.label
      );
    },
  },
  {
    title: "邮箱",
    key: "email",
    align: "center",
    maxWidth: 120,
  },
  {
    title: "手机号",
    key: "phoneNum",
    align: "center",
    maxWidth: 120,
  },
  {
    title: "部门",
    key: "deptId",
    align: "center",
    maxWidth: 120,
    render(row) {
      return deptList.value
        .filter((v) => v.id === row.deptId)
        .map((v) =>
          h(NTag, { type: getType(row.deptId as number) }, () => v.name)
        );
    },
  },
  {
    title: "角色",
    key: "roleIds",
    align: "center",
    minWidth: 100,
    render(row) {
      return row.roleIds?.length
        ? h(
            NDropdown,
            {
              trigger: "hover",
              options: row.roleIds?.map((roleId) => {
                const role = roleList.value.find((v) => v.id === roleId);
                return { label: role?.name, key: role?.name };
              }),
            },
            () =>
              h(
                NButton,
                {
                  iconPlacement: "right",
                  size: "small",
                },
                {
                  default: () => "查看",
                  icon: () => h(SvgIcon, { icon: "mi:list" }),
                }
              )
          )
        : null;
    },
  },
  {
    title: () => statusDict.value?.type.name,
    key: "status",
    align: "center",
    maxWidth: 80,
    render(row) {
      return h(
        NTag,
        { type: getType(row.status as number) },
        () =>
          statusDict.value?.values.find((v) => v.value === row.status)?.label
      );
    },
  },
  {
    title: "创建时间",
    key: "createAt",
    align: "center",
  },
];

function handleCheck(rowKeys: DataTableRowKey[]) {
  selectRow.value = rowKeys;
}
</script>

<template>
  <n-card title="用户列表">
    <n-space style="margin-bottom: 10px">
      <n-button
        type="info"
        size="small"
        @click="createUserModal(sexDict as data.dict, deptList, roleList)">
        <template #icon>
          <SvgIcon icon="mi:circle-add" />
        </template>新增</n-button>
      <n-button
        :disabled="!isEdit"
        type="primary"
        size="small"
        @click="updateUserModal(
            sexDict as data.dict,
            statusDict as data.dict,
            deptList,
            roleList,
            data.find((d) => d.id === selectRow[0]) as table.userInfo)">
          <template #icon>
            <SvgIcon icon="mi:edit-alt" />
          </template>编辑</n-button>
      <n-button
        :disabled="!isDelete"
        type="error"
        size="small"
        @click="deleteUser(selectRow as number[])"
        >
        <template #icon>
            <SvgIcon icon="mi:delete" />
          </template>删除</n-button>
    </n-space>
    <n-data-table
      :columns="columns"
      :data="data"
      :loading="isFetching"
      remote
      @update-checked-row-keys="handleCheck"
      :row-key="(row:RowData) => row.id"
      :pagination="pagination" />
  </n-card>
</template>
<style></style>
