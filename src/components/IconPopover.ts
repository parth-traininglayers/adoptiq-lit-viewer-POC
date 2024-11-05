import { LitElement, html } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { baseStyles } from "../styles/base-styles";
import { DisplayConfig, createDefaultConfig } from "../config/display-config";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { popoverStyles } from "../main";
import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
  autoPlacement,
  Placement,
} from '@floating-ui/dom';
import { Pin } from "../interface/pin";

@customElement("icon-popover")
export class IconPopover extends LitElement {
  static styles = [baseStyles, popoverStyles];

  @query('.trigger') triggerEl!: HTMLElement;
  @query('.content') contentEl!: HTMLElement;
  @query('.caret') caretEl!: HTMLElement;

  @property({ type: Object }) data: Pin | null = null;
  @property({ type: Object }) config: DisplayConfig = {
    ...createDefaultConfig(),
    dismissal: this.data ? this.data.dismissType : ['mouseleave'],
    delay: {
      show: 0,
      hide: 5000,
    },
    alignment: this.data?.contentPlacement.position as Placement || 'right'
  };

  private cleanup: (() => void) | null = null;
  private autoCloseTimer: number | null = null;
  private clickOutsideHandler: ((event: MouseEvent) => void) | null = null;
  private escapeHandler: ((event: KeyboardEvent) => void) | null = null;
  @state() protected isVisible = false;
  private isHoveringContent = false;

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
          placement: "right" ,//this.alignment as Placement,
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

  private setupDismissalHandlers() {
    if (this.config.dismissal.includes('clickOutside')) {
      this.clickOutsideHandler = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!this.contains(target)) {
          this.hide();
        }
      };
      document.addEventListener('click', this.clickOutsideHandler);
    }

    if (this.config.dismissal.includes('escape')) {
      this.escapeHandler = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          this.hide();
        }
      };
      document.addEventListener('keydown', this.escapeHandler);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanup?.();
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
    }
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
    }
    this.clearAutoCloseTimer();
  }

  render() {
    return html`
      <div class="trigger" 
           @click=${this.data?.triggerType === 'click' ? this.show : null} 
           @mouseover=${this.handleTriggerMouseOver}
           @mouseleave=${this.handleTriggerMouseLeave}>
        <span class="icon">🔔</span>
      </div>
      <div class="content" 
           ?data-show=${this.isVisible}
           @mouseover=${this.handleContentMouseOver}
           @mouseleave=${this.handleContentMouseLeave}>
        <div class="content-header">
          ${this.config.dismissal.includes('closeButton') 
            ? html`<button class="close-btn" @click=${this.hide}>&times;</button>` 
            : ''}
          <slot name="content">${unsafeHTML(this.data?.content)}</slot>
        </div>
        ${this.config.enableCaret ? html`<div class="caret"></div>` : ''}
      </div>
    `;
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

  show() {
    this.isVisible = true;
    this.setupPositioning();
    this.startAutoCloseTimer();
  }

  hide() {
    this.isVisible = false;
    this.clearAutoCloseTimer();
  }

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }
}