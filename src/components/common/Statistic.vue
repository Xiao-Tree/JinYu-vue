<script setup lang="ts">
import { useThemeVars, type NumberAnimationInst } from "naive-ui";
import { useTemplateRef } from "vue";

const themVars = useThemeVars();
interface option {
  label: string;
  number: number;
  icon: string;
  suffix?: string;
}
const datas: option[] = [
  {
    label: "今日访问量",
    number: 23,
    icon: "hugeicons:analysis-text-link",
  },
  {
    label: "总访问量",
    number: 10000,
    icon: "hugeicons:chart-histogram",
  },
  {
    label: "用户数量",
    number: 150,
    icon: "hugeicons:certificate-01",
  },
  {
    label: "建站时长",
    number: 23,
    icon: "hugeicons:timer-01",
    suffix:'天'
  },
];

const numEls = useTemplateRef<NumberAnimationInst[] | null>("numEl");
onActivated(() => {
  numEls.value?.forEach((numEl) => numEl.play());
});
</script>
<template>
  <div
    class="statistic"
    :style="{ '--n-color': themVars.bodyColor }">
    <div
      v-for="data in datas"
      :key="data.label">
      <n-statistic
        :label="data.label"
        tabular-nums>
        <n-number-animation
          ref="numEl"
          :from="0"
          :to="data.number" />
        <template #suffix v-if="data.suffix">{{ data.suffix }}</template>
      </n-statistic>
      <SvgIcon
        :icon="data.icon"
        style="font-size: 3em"></SvgIcon>
    </div>
  </div>
</template>
<style>
.statistic {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.statistic > * {
  flex-basis: 49%;
  flex-grow: 1;
  box-sizing: border-box;
  background-color: var(--n-color);
  border-radius: 10px;
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media only screen and (min-width: 1200px) {
  .statistic > * {
    flex-basis: 24%;
  }
}
</style>
