import { FooterMenu } from "./components/Footer";
import { Pin } from "./interface/pin";
export { BaseDisplay } from "./components/BaseDisplay";
import { PopoverDisplay } from "./components/Popover";

// Utilities
export { setupPositioning } from "./utils/positioning";
export * from "./utils/invocation-strategies";
export * from "./utils/dismissal-strategies";
import { IconPopover } from "./components/IconPopover";
import { ModalDisplay } from "./components/Modal";
import { CardDisplay } from "./components/Card";

export { caretTemplate, positionCaret } from "./templates/caret-template";

// Configuration
export type {
  DisplayConfig,
  DisplayType,
  InvocationStrategy,
  DismissalStrategy,
} from "./config/display-config";
export { createDefaultConfig, mergeConfig } from "./config/display-config";

// Styles
export { baseStyles } from "./styles/base-styles";
export { popoverStyles } from "./styles/popover-styles";

declare global {
  interface HTMLElementTagNameMap {
    "footer-menu": FooterMenu;
    "popover-display": PopoverDisplay;
    "icon-popover": IconPopover;
    "modal-display": ModalDisplay;
    "card-display": CardDisplay;
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
    data: Pin | undefined;
  }

  class ModalDisplay extends HTMLElement {
    data: Pin | undefined ;
  }

  const popovers = new Map(); // Store references to popovers
  const modals = new Map(); // Store references to modals
  const cards = new Map(); // Store references to cards

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
              iconPopover.id = pin.id;
              iconPopover.data = pin;

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
        case "card":
          if (targetElement) {
            // Check if a popover already exists for this target
            if (!modals.has(pin.id)) {
              const cardDisplay = document.createElement(
                "card-display",
              ) as ModalDisplay;
              //iconPopover.cssSelector = pin.selector.cssSelector;
              cardDisplay.id = pin.id;
              cardDisplay.data = pin;

              targetElement.insertAdjacentElement("afterend", cardDisplay); // Insert next to target
              cards.set(pin.id, cardDisplay); // Store reference
            }
          } else {
            // If the target is removed, you can also remove its popover if needed
            if (cards.has(pin.id)) {
              const existingCards = modals.get(pin.id);
              existingCards.remove(); // Remove the popover from DOM
              cards.delete(pin.id); // Remove from map
            }
          }
          break;
          case "modal":
          if (targetElement) {
            // Check if a popover already exists for this target
            if (!modals.has(pin.id)) {
              const modalDisplay = document.createElement(
                "modal-display",
              ) as ModalDisplay;
              //iconPopover.cssSelector = pin.selector.cssSelector;
              modalDisplay.id = pin.id;
              modalDisplay.data = pin;

              targetElement.insertAdjacentElement("afterend", modalDisplay); // Insert next to target
              modals.set(pin.id, modalDisplay); // Store reference
            }
          } else {
            // If the target is removed, you can also remove its popover if needed
            if (modals.has(pin.id)) {
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
