import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Placement } from "@floating-ui/dom";
import { baseStyles } from "../styles/base-styles";
import { DisplayConfig, createDefaultConfig } from "../config/display-config";

@customElement("icon-popover")
export class IconPopover extends LitElement {
  static styles = [baseStyles];

  @property({ type: String }) cssSelector = "";
  @property({ type: Object }) config: DisplayConfig = createDefaultConfig();
  @property({ type: String }) alignment: Placement = "top";

  @state() protected isVisible = false;

  connectedCallback() {
    console.log(this, this.cssSelector, "[CONNECTED CALLBACK]");
    super.connectedCallback();
    this.injectPopover();
  }

  render() {
    return html`
      <div class="trigger" @click=${this.toggle}>
        <span class="icon">🔔</span>
        <!-- Example icon -->
      </div>
      <div class="content" ?data-show=${this.isVisible}>
        <slot name="content">My content</slot>
      </div>
    `;
  }

  private injectPopover() {
    const targetElement = document.querySelector(this.cssSelector);
    console.log(this.cssSelector, targetElement, "[CSS SELECTOR] ");
    if (targetElement) {
      const popoverElem = document.createElement("popover-display");
      popoverElem.config = this.config; // Pass configuration
      targetElement.appendChild(popoverElem);
    }
  }

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }
}
