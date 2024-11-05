import { customElement, property, query } from "lit/decorators.js";
import { html } from "lit";
import { BaseDisplay } from "./BaseDisplay";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { createDefaultConfig, DisplayConfig } from "../config/display-config";
import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
  autoPlacement,
} from '@floating-ui/dom';
import { Pin } from "../interface/pin";
import { cardStyles } from "../styles/card-styles";

@customElement("card-display")
export class CardDisplay extends BaseDisplay {
  static styles = [...BaseDisplay.styles, cardStyles];

  @query('.trigger') triggerEl!: HTMLElement;
  @query('.content') contentEl!: HTMLElement;
  @query('.caret') caretEl!: HTMLElement;

  private cleanup: (() => void) | null = null;

  private isHoveringContent = false;
  @property({ type: Object }) data: Pin | null = null;
  @property({ type: Object }) config: DisplayConfig = {
    ...createDefaultConfig(),
    dismissal: this.data?.dismissType || ['clickOutside'],
    delay: {
      show: 0,
      hide: 5000,
    }
  };

  private autoCloseTimer: number | null = null;
  private clickOutsideHandler: ((event: MouseEvent) => void) | null = null;
  private escapeHandler: ((event: KeyboardEvent) => void) | null = null;


  connectedCallback() {
    super.connectedCallback();
    console.log("card connected", this.config);
  }

  protected firstUpdated() {
    this.setupDismissalHandlers();
  }


  private async setupPositioning() {
    if (!this.triggerEl || !this.contentEl) return;

    const updatePosition = async () => {
      if (!this.isVisible) return;

      const middleware = [
        offset(this.config.offset),
        this.config.enableAutomatic ? autoPlacement() : flip(),
        shift(),
      ];

      if (this.config.enableCaret) {
        middleware.push(arrow({ element: this.caretEl }));
      }

      const { x, y, placement, middlewareData } = await computePosition(
        this.triggerEl,
        this.contentEl,
        {
          placement: this.config.alignment,
          middleware,
        }
      );

      // Update content position
      Object.assign(this.contentEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      // Update caret position if enabled
      if (this.config.enableCaret && middlewareData.arrow) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow;
        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]] as string;

        Object.assign(this.caretEl.style, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          right: '',
          bottom: '',
          [staticSide]: '-4px',
          transform: "rotate(45deg)",
        });
      }
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    updatePosition();

    this.cleanup = () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }

  show() {
    this.isVisible = true;
    document.body.style.overflow = 'hidden';
    this.setupPositioning();
    if (this.config.dismissal.includes('autoClose')) {
      this.startAutoCloseTimer();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanup?.();
    this.clearAutoCloseTimer();
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
    }
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
    }
  }

  private setupDismissalHandlers() {
    // Click outside handler
    if (this.config.dismissal.includes('clickOutside')) {
      this.clickOutsideHandler = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const card = this.shadowRoot?.querySelector('.card-content');
        if (card && !card.contains(target) && this.isVisible) {
          this.hide();
        }
      };
      document.addEventListener('click', this.clickOutsideHandler);
    }

    // Escape key handler
    if (this.config.dismissal.includes('escape')) {
      this.escapeHandler = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && this.isVisible) {
          this.hide();
        }
      };
      document.addEventListener('keydown', this.escapeHandler);
    }
  }

  private startAutoCloseTimer() {
    this.clearAutoCloseTimer();
    if (this.config.delay.hide > 0) {
      this.autoCloseTimer = window.setTimeout(() => {
        this.hide();
      }, this.config.delay.hide);
    }
  }

  private clearAutoCloseTimer() {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
    }
  }

  hide() {
    this.isVisible = false;
    document.body.style.overflow = '';
    this.clearAutoCloseTimer();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    console.log("card updated", changedProperties);
  }


  private handleTriggerMouseOver = () => {
    if (this.data?.triggerType === 'hover') {
      this.show();
    }
  };

  private handleTriggerMouseLeave = () => {
    if (this.data?.triggerType === 'hover' && this.config.dismissal.includes('mouseleave')) {
      setTimeout(() => {
        if (!this.isHoveringContent) {
          this.hide();
        }
      }, 100);
    }
  };

  private handleContentMouseOver = () => {
    this.isHoveringContent = true;
    if (this.autoCloseTimer) {
      this.clearAutoCloseTimer();
    }
  };

  private handleContentMouseLeave = () => {
    this.isHoveringContent = false;
    if (this.config.dismissal.includes('mouseleave')) {
      this.hide();
    } else if (this.config.dismissal.includes('autoClose')) {
      this.startAutoCloseTimer();
    }
  };

  render() {
    return html`
      <div class="trigger" 
           @click=${this.data?.triggerType === 'click' ? this.show : () => null} 
           @mouseover=${this.handleTriggerMouseOver}
           @mouseleave=${this.handleTriggerMouseLeave}>
        <button>${unsafeHTML(this.data?.buttonText)}</button>
      </div>
      ${this.isVisible
        ? html`
            <div class="card-backdrop" @click=${this.hide}></div>
            <div class="content card" 
                 ?data-show=${this.isVisible}
                 @mouseover=${this.handleContentMouseOver}
                 @mouseleave=${this.handleContentMouseLeave}>
              ${this.config.dismissal.includes('closeButton')
            ? html`<button class="close-btn" @click=${this.hide}>&times;</button>`
            : ''}
              <div class="card-body">${unsafeHTML(this.data?.content)}</div>
              <div class="card-footer">
                ${this.data && this.data.buttons && this.data.buttons.map(
              (button) => html`
                    <button @click=${button.action}>${button.text}</button>
                  `
            )}
              </div>
            </div>
          `
        : ""}
    `;
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }
}
