// import { h } from "vue";
// import type { Component } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import type { IconConfig } from "@/types/common";

/**
 * Svg icon render hook
 *
 * @param SvgIcon Svg icon component
 */
function useSvgIconRender(SvgIcon: Component) {
  type IconStyle = Partial<Pick<CSSStyleDeclaration, "color" | "fontSize">>;

  /**
   * Svg icon VNode
   *
   * @param config
   */
  const SvgIconVNode = (config: IconConfig) => {
    const { color, fontSize, icon, localIcon } = config;

    const style: IconStyle = {};

    if (color) {
      style.color = color;
    }
    if (fontSize) {
      style.fontSize = `${fontSize}px`;
    }

    if (!icon && !localIcon) {
      return undefined;
    }

    return () => h(SvgIcon, { icon, localIcon, style });
  };

  return {
    SvgIconVNode,
  };
}

export function useSvgIcon() {
  const { SvgIconVNode } = useSvgIconRender(SvgIcon);

  return {
    SvgIconVNode,
  };
}
