<script setup lang="ts">
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  type TitleComponentOption,
  type TooltipComponentOption,
  type GridComponentOption,
  LegendComponent,
} from "echarts/components";
import { LineChart, type LineSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { useTemplateRef } from "vue";
import type { chart, message, ws } from "@/types/common";
import pkg from "~/package.json";
import type { LegendComponentOption } from "echarts";
import { useEChart } from "@/utils/hooks";
import type { ComposeOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { formatDate } from "@/utils/common";

type ECOption = ComposeOption<
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
>;
const { data } = defineProps<{ data: string | null }>();

const chartDom = useTemplateRef("el");
const cpuData: chart.dataItem[] = [];
const memoryData: chart.dataItem[] = [];
const now = new Date();
const info = ref({
  cpu: null,
  cpuNum: null,
  cpuUsed: null,
  memory: null,
  memoryUsed: null,
  os: null,
  javaVersion: null,
});
for (let i = 0; i < 120; i++) {
  const date = new Date(+now - i * 5 * 1000);
  const dateStr = formatDate(date);

  cpuData.unshift({
    name: dateStr,
    value: [dateStr, null],
  });
  memoryData.unshift({
    name: dateStr,
    value: [dateStr, null],
  });
}
const option: ECOption = {
  title: {
    text: "系统负载",
  },
  tooltip: {
    trigger: "axis",
    valueFormatter: (value) => (value === null ? "" : `${value}%`),
    axisPointer: {
      animation: false,
    },
  },
  legend: {
    data: ["CPU使用率", "内存使用率"],
  },
  xAxis: {
    type: "time",
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      name: "CPU使用率",
      type: "line",
      showSymbol: false,
      data: cpuData,
    },
    {
      name: "内存使用率",
      type: "line",
      showSymbol: false,
      data: memoryData,
    },
  ],
};

const { updateOption } = useEChart(chartDom, option, [
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);
const { stop, pause, resume } = watchPostEffect(() => {
  if (!data) return;
  cpuData.shift();
  memoryData.shift();
  const d = JSON.parse(data) as message<ws.data>;
  cpuData.push({
    name: d.sendTime,
    value: [d.sendTime, d.data.cpuUsed],
  });
  memoryData.push({
    name: d.sendTime,
    value: [d.sendTime, d.data.memoryUsed],
  });
  updateOption({
    series: [
      {
        data: cpuData,
      },
      {
        data: memoryData,
      },
    ],
  });
  if (d.type === "info" && info.value.cpu === null) {
    Object.assign(info.value, d.data);
  }
});
onActivated(() => resume());
onDeactivated(() => {
  pause();
  cpuData.shift();
  memoryData.shift();
  const dateStr = formatDate(new Date());
  const endData = {
    name: dateStr,
    value: [dateStr, null],
  };
  cpuData.push(endData);
  memoryData.push(endData);
});
onBeforeUnmount(()=>stop())
</script>
<template>
  <div
    ref="el"
    style="height: 300px; width: 100%"></div>
  <Teleport
    defer
    to="#main .system-info">
    <thead>
      <tr>
        <th>系统信息</th>
        <th>规格</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>操作系统</td>
        <td>{{ info.os }}</td>
      </tr>
      <tr>
        <td>CPU</td>
        <td>{{ info.cpu }} {{ info.cpuNum }} 核心</td>
      </tr>
      <tr>
        <td>内存</td>
        <td>{{ info.memory }}GB</td>
      </tr>
      <tr>
        <td>Java版本</td>
        <td>{{ info.javaVersion }}</td>
      </tr>
      <tr>
        <td>前端构建版本</td>
        <td>{{ pkg.version }}</td>
      </tr>
    </tbody>
  </Teleport>
</template>
<style></style>
