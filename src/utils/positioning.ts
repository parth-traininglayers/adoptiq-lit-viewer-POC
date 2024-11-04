import {
  computePosition,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
} from "@floating-ui/dom";
import { DisplayConfig } from "../config/display-config";

export function setupPositioning(
  referenceElement: HTMLElement,
  floatingElement: HTMLElement,
  caretElement: HTMLElement | null,
  config: DisplayConfig,
): () => void {
  const middleware = [
    offset(config.offset), // Simplified offset
    shift({ padding: 5 }),
  ];

  if (config.enableAutomatic) {
    middleware.push(
      flip({
        fallbackPlacements: ["top", "right", "bottom", "left"],
        fallbackStrategy: "bestFit",
      }),
    );
  }

  if (caretElement) {
    middleware.push(arrow({ element: caretElement }));
  }

  return autoUpdate(referenceElement, floatingElement, () => {
    computePosition(referenceElement, floatingElement, {
      placement: config.alignment,
      middleware,
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(floatingElement.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      if (caretElement && middlewareData.arrow) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow;
        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right",
        }[placement.split("-")[0] as "top" | "right" | "bottom" | "left"];

        Object.assign(caretElement.style, {
          left: arrowX != null ? `${arrowX}px` : "",
          top: arrowY != null ? `${arrowY}px` : "",
          right: "",
          bottom: "",
          [staticSide]: "-4px",
        });
      }

      console.log("Popover dimensions:", {
        width: floatingElement.offsetWidth,
        height: floatingElement.offsetHeight,
        placement,
        x,
        y,
      });
    });
  });
}
