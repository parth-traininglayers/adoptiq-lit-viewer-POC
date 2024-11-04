import { customElement, property } from "lit/decorators.js";
import { html } from "lit";
import { BaseDisplay } from "./BaseDisplay";
import { popoverStyles } from "../styles/popover-styles";

@customElement("popover-display")
export class PopoverDisplay extends BaseDisplay {
  static styles = [...BaseDisplay.styles, popoverStyles];

  @property({ type: String }) popoverTitle = "";
  @property({ type: String }) popoverContent = "";
  @property({type: Object}) data = {};

  connectedCallback() {
    super.connectedCallback();
    console.log("PopoverDisplay connected", this.config);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log("PopoverDisplay disconnected");
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    console.log("PopoverDisplay updated", changedProperties);
  }

  render() {
    console.log("PopoverDisplay rendering", {
      isVisible: this.isVisible,
      alignment: this.alignment,
      config: this.config,
    });

    return html`
      <div class="trigger">
        <slot></slot>
      </div>
      <div class="content popover" ?data-show=${this.isVisible}>
        <div class="popover-header">
          <h3>${this.popoverTitle}</h3>
          <button class="close-btn" @click=${this.hide}>&times;</button>
        </div>
        <div class="popover-body">${(this.data as unknown as any).content! || 'Default content'}</div>
        ${this.config.enableCaret ? html`<div class="caret"></div>` : ""}
      </div>
    `;
  }

  show() {
    console.log("PopoverDisplay show called");
    super.show();
  }

  hide() {
    console.log("PopoverDisplay hide called");
    super.hide();
  }

  toggle() {
    console.log("PopoverDisplay toggle called");
    super.toggle();
  }
}
