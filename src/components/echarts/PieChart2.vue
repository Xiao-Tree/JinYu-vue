<script setup lang="ts">
import {
  TooltipComponent,
  type TooltipComponentOption,
  LegendComponent,
  type LegendComponentOption,
} from "echarts/components";
import { PieChart, type PieSeriesOption } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useEChart } from "@/utils/hooks";
import { useTemplateRef } from "vue";

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

const chartDom = useTemplateRef("el");
const option: EChartsOption = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    left: "center",
  },
  series: [
    {
      name: "地域",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 25, name: "华北" },
        { value: 15, name: "华南" },
        { value: 10, name: "华西" },
        { value: 30, name: "华东" },
        { value: 15, name: "华中" },
        { value: 5, name: "海外" },
      ],
    },
  ],
};
useEChart(chartDom, option, [
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);
</script>
<template>
  <div
    ref="el"
    style="height: 350px; width: 99%; margin-left: 1%"></div>
</template>
<style></style>
