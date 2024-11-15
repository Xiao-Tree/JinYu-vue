<script setup lang="ts">
import pkg from "~/package.json"

const { dependencies, devDependencies } = pkg;

</script>
<template>
  <n-table class="dependencies" :bordered="true" :single-line="false">
    <thead>
      <tr>
        <th>开发依赖</th>
        <th>版本号</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="d,i in Object.entries(devDependencies)" :key="i">
        <td>{{ d[0] }}</td>
        <td>{{ d[1] }}</td>
      </tr>
    </tbody>
  </n-table>
  <n-table class="dependencies"  :bordered="true" :single-line="false">
    <thead>
      <tr>
        <th>生产依赖</th>
        <th>版本号</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="d,i in Object.entries(dependencies)" :key="i">
        <td>{{ d[0] }}</td>
        <td>{{ d[1] }}</td>
      </tr>
    </tbody>
  </n-table>
</template>
<style></style>
