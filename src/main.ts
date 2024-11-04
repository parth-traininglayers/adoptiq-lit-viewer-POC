import { FooterMenu } from "./components/Footer";
//import {setupPositioning} from './utils/positioning';
import { Pin } from "./interface/pin";
// Components
export { BaseDisplay } from "./components/BaseDisplay";
//export { TooltipDisplay } from './components/tooltip';
import { PopoverDisplay } from "./components/Popover";
//export { CardDisplay } from './components/card';
//export { ModalDisplay } from './components/modal';

// Utilities
export { setupPositioning } from "./utils/positioning";
export * from "./utils/invocation-strategies";
export * from "./utils/dismissal-strategies";
import { IconPopover } from "./components/IconPopover";
import { ModalDisplay } from "./components/Modal";

// Templates
//export * from './templates/content-templates';
export { caretTemplate, positionCaret } from "./templates/caret-template";

// Configuration
export type {
  DisplayConfig,
  DisplayType,
  InvocationStrategy,
  DismissalStrategy,
} from "./config/display-config";
export { createDefaultConfig, mergeConfig } from "./config/display-config";

// Higher-Order Components
//export { withResize } from './hocs/with-resize';
//export { withDrag } from './hocs/with-drag';

// Styles
export { baseStyles } from "./styles/base-styles";
//export { tooltipStyles } from './styles/tooltip-styles';
export { popoverStyles } from "./styles/popover-styles";
//export { cardStyles } from './styles/card-styles';
//export { modalStyles } from './styles/modal-styles';

// Demo
//export { DemoUI } from "./demo/demo-ui";

declare global {
  interface HTMLElementTagNameMap {
    "footer-menu": FooterMenu;
    "popover-display": PopoverDisplay;
    "icon-popover": IconPopover;
    "modal-display": ModalDisplay;
  }
}

// This function will initialize your component
function initializeApp(data: { pins: Pin[] }) {
  const container = document.createElement("div");
  container.id = "web-component-container";
  document.body.appendChild(container);

  const triggerMenu = document.createElement("footer-menu");
  container.appendChild(triggerMenu);

  /*function getElementByXPath(xpath: string) : Node | null {
    console.log(xpath)
    return document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    ).singleNodeValue;
  }
  */
  class IconPopover extends HTMLElement {
    cssSelector: string | undefined;
  }
  // Step 2: Register the custom elemen

  const popovers = new Map(); // Store references to popovers
  const modals = new Map(); // Store references to modals

  const observer = new MutationObserver(() => {
    data.pins.forEach((pin) => {
      let targetElement = document.querySelector(pin.selector.cssSelector);
      switch(pin.displayType){
        case "popover":
          if (targetElement) {
            // Check if a popover already exists for this target
            if (!popovers.has(pin.id)) {
              const iconPopover = document.createElement(
                "icon-popover",
              ) as IconPopover;
              iconPopover.cssSelector = pin.selector.cssSelector;

              targetElement.insertAdjacentElement("afterend", iconPopover); // Insert next to target
              popovers.set(pin.id, iconPopover); // Store reference
            }
          } else {
            // If the target is removed, you can also remove its popover if needed
            if (popovers.has(pin.id)) {
              const existingPopover = popovers.get(pin.id);
              existingPopover.remove(); // Remove the popover from DOM
              popovers.delete(pin.id); // Remove from map
            }
          }
          break;
        case "modal":
          if (targetElement) {
            // Check if a popover already exists for this target
            if (!modals.has(pin.id)) {
              const iconPopover = document.createElement(
                "modal-display",
              ) as ModalDisplay;
              //iconPopover.cssSelector = pin.selector.cssSelector;

              targetElement.insertAdjacentElement("afterend", iconPopover); // Insert next to target
              modals.set(pin.id, iconPopover); // Store reference
            }
          } else {
            // If the target is removed, you can also remove its popover if needed
            if (popovers.has(pin.id)) {
              const existingModals = modals.get(pin.id);
              existingModals.remove(); // Remove the popover from DOM
              modals.delete(pin.id); // Remove from map
            }
          }
          break;
        default: 
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function init(data: { pins: Pin[] }) {
  // Run the initialization when the DOM is fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initializeApp(data));
  } else {
    initializeApp(data);
  }
}

if (typeof window !== "undefined") {
  (window as any).AdoptIQInit = init;
}

export { FooterMenu, PopoverDisplay, IconPopover, init, ModalDisplay };
