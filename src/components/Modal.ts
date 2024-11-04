import { customElement, property } from "lit/decorators.js";
import { html } from "lit";
import { BaseDisplay } from "./BaseDisplay";
import { modalStyles } from "../styles/modal-styles";

@customElement("modal-display")
export class ModalDisplay extends BaseDisplay {
  static styles = [...BaseDisplay.styles, modalStyles];

  @property({ type: String }) modalTitle = "my title";
  @property({ type: String }) modalContent = "my content";
  @property({ type: Array }) buttons: Array<{
    text: string;
    action: () => void;
  }> = [
    {
      text: "My button",
      action: function () {
        window.alert("10");
      },
    },
  ];

  render() {
    return html`
      <div class="trigger" @click=${this.show}>
        <button>My button</button>
      </div>
      ${this.isVisible
        ? html`
            <div class="modal-backdrop" @click=${this.hide}></div>
            <div class="content modal" ?data-show=${this.isVisible}>
              <div class="modal-header">
                <h3>${this.modalTitle}</h3>
                <button class="close-btn" @click=${this.hide}>&times;</button>
              </div>
              <div class="modal-body">${this.modalContent}</div>
              <div class="modal-footer">
                ${this.buttons.map(
                  (button) => html`
                    <button @click=${button.action}>${button.text}</button>
                  `,
                )}
              </div>
            </div>
          `
        : ""}
    `;
  }

  show() {
    super.show();
    document.body.style.overflow = "hidden";
  }

  hide() {
    super.hide();
    document.body.style.overflow = "";
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }
}
