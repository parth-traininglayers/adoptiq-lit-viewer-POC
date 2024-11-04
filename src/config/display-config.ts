import { Placement } from "@floating-ui/dom";

export type DisplayType = "tooltip" | "popover" | "card" | "modal";
export type InvocationStrategy = "hover" | "click" | "focus";
export type DismissalStrategy =
  | "mouseleave"
  | "click"
  | "clickOutside"
  | "escape";

export interface DisplayConfig {
  type: DisplayType;
  alignment: Placement;
  invocation: InvocationStrategy;
  dismissal: DismissalStrategy[];
  enableCaret: boolean;
  zIndex: number;
  maxWidth: string;
  minWidth: string;
  offset: number;
  enableAutomatic: boolean;
  delay: {
    show: number;
    hide: number;
  };
  interactive: boolean;
  appendTo: "parent" | "body";
  hideOnClickOutside: boolean;
  animation: {
    duration: number;
    easing: string;
  };
}

export function createDefaultConfig(): DisplayConfig {
  return {
    type: "popover",
    alignment: "top",
    invocation: "click",
    dismissal: ["mouseleave"],
    enableCaret: true,
    zIndex: 1000,
    maxWidth: "300px",
    minWidth: "100px",
    enableAutomatic: true,
    offset: 8,
    delay: {
      show: 0,
      hide: 0,
    },
    interactive: false,
    appendTo: "body",
    hideOnClickOutside: true,
    animation: {
      duration: 300,
      easing: "ease-in-out",
    },
  };
}

export function mergeConfig(userConfig: Partial<DisplayConfig>): DisplayConfig {
  return { ...createDefaultConfig(), ...userConfig };
}
