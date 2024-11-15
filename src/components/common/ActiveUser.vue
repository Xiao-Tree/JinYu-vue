<script setup lang="ts">
import type { activeUser } from '@/types/common';
import { NAvatar, type DataTableColumns } from 'naive-ui';
import type { RowData } from 'naive-ui/es/data-table/src/interface';

const loading=ref(false)
const data=ref<activeUser[]>([
    {
        avatar: '20241004-1842217866255011840.svg',
        username: 'admin',
        dept: '测试部门',
        sex: '男'
    },
    {
        avatar: '20241004-1842217866255011840.svg',
        username: 'test',
        dept: '测试部门',
        sex: '男'
    },
    {
        avatar: '20241004-1842217866255011840.svg',
        username: 'test1',
        dept: '测试部门',
        sex: '男'
    },
    {
        avatar: '20241004-1842217866255011840.svg',
        username: 'test2',
        dept: '测试部门',
        sex: '男'
    },
    {
        avatar: '20241004-1842217866255011840.svg',
        username: 'test3',
        dept: '测试部门',
        sex: '男'
    }
])
const columns: DataTableColumns<activeUser> =[
    {
    title: "头像",
    key: "avatar",
    align: "center",
    maxWidth: 60,
    render(row) {
      return row.avatar
        ? h(NAvatar, {
            size: "small",
            round:true,
            src: `${window.location.origin}${
              import.meta.env.VITE_BASE_URL
            }/resources/upload/${row.avatar}`,
          })
        : null;
    },
  },
  {
    title: "用户名",
    key: "username",
    align: "center",
    maxWidth: 120,
  },
  {
    title: "性别",
    key: "sex",
    align: "center",
    maxWidth: 60,
  },
  {
    title: "部门",
    key: "dept",
    align: "center",
  }
]
</script>
<template>
  <n-data-table
    remote
    :columns="columns"
    :data="data"
    :loading="loading"
    :row-key="(row:RowData) => row.username"
  />
</template>
<style></style>