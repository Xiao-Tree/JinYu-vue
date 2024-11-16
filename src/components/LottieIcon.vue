<script setup lang="ts">
import Lottie, {
  type AnimationDirection,
  type AnimationItem,
} from "lottie-web";
import { useTemplateRef } from "vue";
interface props {
  icon?: string | number;
  mode?: "loop" | "click" | "hover";
  loop?: boolean;
  component?: string;
  maxWidth?: string;
  width?: string;
  resetColor?: boolean;
  /**
   * 是否为状态
   */
  state?: boolean;
  /**
   * 初始状态为动画结束时
   */
  finished?: boolean;
  /**
   * 动画结束帧
   */
  segment?: number;
  /**
   * 将监听事件绑定到目标元素上
   */
  targetEl?: string;
}

const {
  icon = "error",
  mode = "loop",
  component = "i",
  maxWidth,
  resetColor = false,
  loop = true,
  width,
  state = false,
  finished = false,
  segment = 60,
  targetEl,
} = defineProps<props>();

let direction: AnimationDirection = 1;
const el = useTemplateRef<HTMLElement>("lottie");
el.value?.parentElement?.parentElement?.parentElement;
let loader: AnimationItem | null = null;

function click1() {
  loader?.setDirection(direction);
  loader?.play();
  changeDirection();
}
function changeDirection() {
  direction = -direction as AnimationDirection;
}
function click2() {
  loader?.playSegments([0, segment], true);
}
onMounted(() => {
  loader = Lottie.loadAnimation({
    container: el.value as HTMLElement, // the dom element that will contain the animation
    renderer: "svg",
    loop,
    autoplay: mode === "loop",
    path: `/lottie/${icon}.json`, // the path to the animation json
  });
  if (mode !== "loop") loader.setLoop(false);

  if (resetColor) {
    loader.addEventListener("DOMLoaded", () => {
      const paths = el.value?.firstElementChild?.querySelectorAll("path");
      paths?.forEach((path) => {
        // 移除预设颜色
        if (path?.getAttribute("stroke") === "rgb(0,0,0)")
          path.setAttribute("stroke", "currentColor");
      });
    });
  }
  const tel = targetEl ? document.querySelector(targetEl) : el.value;

  switch (mode) {
    case "click":
      tel?.addEventListener("click", state ? click1 : click2);
      break;
    case "hover":
      tel?.addEventListener("mousemove", () => {
        loader?.setDirection(1);
        loader?.play();
      });
      tel?.addEventListener("mouseleave", () => {
        loader?.setDirection(-1);
        loader?.stop();
      });
  }
  if (mode === "loop" || finished) {
    loader.play();
    changeDirection();
  }
});

onUnmounted(() => {
  loader?.destroy();
});
</script>
<template>
  <component
    :is="component"
    ref="lottie"
    class="lottie-icon"
    :style="{ maxWidth, width }"></component>
</template>
<style>
.lottie-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
