<script setup lang="ts">
import { fetchDeleteDicts, fetchDictList } from "@/api/auth";
import {
  NButton,
  NSpace,
  NTag,
  type DataTableColumns,
  type PaginationProps,
} from "naive-ui";
import SvgIcon from "@/components/SvgIcon.vue";
import type { RowData } from "naive-ui/es/data-table/src/interface";

definePage({
  meta: {
    role: ["admin"],
    hideInMenu: false,
    requiresAuth: true,
    title: "字典管理",
    icon: "mi:clipboard-list",
    sort: 4,
  },
});

const data = ref<data.dictType[] | undefined>([]),
  columns: DataTableColumns<data.dictType> = [
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
      render: (row) => {
        if (row.status) {
          return h(NTag, { type: "success" }, () => "启用");
        } else {
          return h(NTag, { type: "error" }, () => "停用");
        }
      },
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
      render: (row) => {
        return h(NSpace, () => [
          h(
            NButton,
            {
              type: "primary",
              size: "tiny",
              onClick: () => {
                drawerTitle.value = "查看字典";
                viewDict.value = row;
                isEdit.value = false;
                isActive.value = true;
              },
            },
            () => "查看"
          ),
          h(
            NButton,
            {
              type: "warning",
              size: "tiny",
              onClick: () => {
                drawerTitle.value = "编辑字典";
                viewDict.value = row;
                isEdit.value = true;
                isActive.value = true;
              },
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
              onClick: () => {
                const m = window.$modal.create({
                  title: "删除字典",
                  preset: "dialog",
                  content: () => `确定要删除id为{${row.id}}的字典吗？`,
                  positiveText: "确认",
                  negativeText: "取消",
                  onPositiveClick: () => {
                    fetchDeleteDicts([row.id]).then((res) => {
                      if (res.data.value?.data) {
                        window.$message.success("已删除字典");
                        m.destroy();
                      } else {
                        window.$message.error("删除字典失败");
                      }
                    });
                  },
                  onNegativeClick: () => {
                    m.destroy();
                  },
                });
              },
            },
            {
              default: () => "编辑",
              icon: () => h(SvgIcon, { icon: "mi:edit-alt" }),
            }
          ),
        ]);
      },
    },
  ],
  isFetching = ref(false),
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
  }),
  isEdit = ref(false),
  isActive = ref(false),
  viewDict = ref<data.dictType>(),
  drawerTitle = ref("查看字典");

function getData() {
  isFetching.value = true;
  const {
    execute,
    onFetchResponse,
    data: d,
  } = fetchDictList(
    pagination.page as number,
    pagination.pageSize as number,
    pagination.itemCount
  );
  onFetchResponse(() => {
    data.value = d.value?.data.records;
    pagination.itemCount = d.value?.data.totalRow;
  });
  execute().finally(() => (isFetching.value = false));
}
getData();

function createDict() {
  drawerTitle.value = "新增字典";
  viewDict.value = undefined;
  isActive.value = true;
  isEdit.value = true;
}
</script>
<template>
  <n-card title="字典管理">
    <n-space style="margin-bottom: 10px">
      <n-button
        type="info"
        size="small"
        @click="createDict">
        <template #icon>
          <SvgIcon icon="mi:circle-add" />
        </template>新增</n-button>
    </n-space>
    <n-data-table
      :columns="columns"
      :data="data"
      :loading="isFetching"
      remote
      :row-key="(row:RowData) => row.id"
      :pagination="pagination" />
    <!-- 右侧弹出菜单 -->
    <n-drawer
      v-model:show="isActive"
      :width="350">
      <n-drawer-content
        :title="drawerTitle"
        closable
        :trap-focus="false">
        <DictForm
          :dict="viewDict"
          :isEdit="isEdit"></DictForm>
      </n-drawer-content>
    </n-drawer>
  </n-card>
</template>
<style></style>
