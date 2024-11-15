<script setup lang="ts">
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  type GridComponentOption,
} from "echarts/components";
import { BarChart, type BarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useTemplateRef } from "vue";
import type { LegendComponentOption } from "echarts";
import { useEChart } from "@/utils/hooks";

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | BarSeriesOption | LegendComponentOption
>;

const chartDom = useTemplateRef("el");
const option: EChartsOption = {
  xAxis: {
    type: "category",
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  yAxis: {
    type: "value",
  },
  legend: {
    data: ["本周", "上周"],
  },
  series: [
    {
      name: "本周",
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
    },
    {
      name: "上周",
      data: [110, 150, 190, 100, 120, 100, 80],
      type: "bar",
    },
  ],
};
useEChart(chartDom, option, [
  GridComponent,
  BarChart,
  LegendComponent,
  CanvasRenderer,
]);
</script>
<template>
  <n-card title="访问人数">
    <div
      ref="el"
      style="height: 400px; width: 100%"></div>
  </n-card>
</template>
<style></style>
