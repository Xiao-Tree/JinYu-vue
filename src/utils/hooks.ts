import { type ShallowRef } from "vue";
import * as echarts from "echarts/core";
import { useAppStore } from "@/stores";
import { storeToRefs } from "pinia";
import chalk from "@/assets/theme/chalk.json";
import macarons from "@/assets/theme/macarons.json";
import type { ECBasicOption } from "echarts/types/src/util/types.js";

echarts.registerTheme("chalk", chalk);
echarts.registerTheme("macarons", macarons);
let mainEl: HTMLElement | undefined;
export function useEChart(
  chartEl: Readonly<ShallowRef<HTMLDivElement | null>>,
  option: any,
  ext: any,
  colorStops?: any
) {
  echarts.use(ext);

  let myChart: echarts.ECharts;
  let resizeObserver: ResizeObserver;
  let optionData: ECBasicOption;
  if (colorStops) {
    // @ts-ignore
    option.series.forEach((item, index, array) => {
      item.areaStyle = {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          colorStops[index]
        ),
      };
    });
  }
  const appStore = useAppStore();
  const { theme } = storeToRefs(appStore);
  // 自动切换主题
  const { resume, pause, stop } = watch(theme, (newValue, oldValue) => {
    // 销毁原EChart
    myChart.dispose();
    // 重新创建适应当前主题的EChart
    myChart = echarts.init(
      chartEl.value,
      newValue === "dark" ? "chalk" : "macarons"
    );
    // 设置初始option
    if (optionData) {
      // @ts-ignore 将最新的数据复制到option中
      option.series.forEach((se, i) =>Object.assign(se.data, optionData.series[i].data));
    }
    myChart.setOption(option);
  });
  onMounted(() => {
    myChart = echarts.init(
      chartEl.value,
      theme.value === "dark" ? "chalk" : "macarons"
    );
    myChart.setOption(option);
    resizeChart();
  });
  onBeforeUnmount(() => {
    disposeChart();
    stop();
  });
  onActivated(() => {
    resizeObserver.observe(mainEl as HTMLElement, { box: "border-box" });
    resume();
  });
  onDeactivated(() => {
    resizeObserver.unobserve(mainEl as HTMLElement);
    pause();
  });

  function resizeChart() {
    // 创建监听元素大小的观察者
    resizeObserver = new ResizeObserver(() => {
      // 当#main元素的大小发生变化时，调整echart的大小
      myChart.resize({
        animation: { duration: 1000, easing: "cubicInOut", delay: 500 },
      });
      // console.log(`${myChart.id} 调整大小`);
    });
    if (!mainEl) {
      mainEl = document.getElementById("main") as HTMLElement;
    }
  }
  function disposeChart() {
    if (!myChart.isDisposed()) {
      myChart.dispose();
    }
    resizeObserver.disconnect();
  }
  function updateOption(newOption: ECBasicOption) {
    optionData = newOption;
    myChart.setOption(optionData);
  }

  return { updateOption };
}

export function updateMainEl() {
  mainEl = undefined;
}
