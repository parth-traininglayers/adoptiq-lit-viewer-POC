import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { Placement } from '@floating-ui/dom';
import { baseStyles } from '../styles/base-styles';
import { DisplayConfig, createDefaultConfig } from '../config/display-config';
import { setupInvocation } from '../utils/invocation-strategies';
import { setupDismissal } from '../utils/dismissal-strategies';
import { setupPositioning } from '../utils/positioning';

@customElement('base-display')
export class BaseDisplay extends LitElement {
  static styles = [baseStyles];

  @property({ type: Object }) config: DisplayConfig = createDefaultConfig();
  @property({ type: String }) alignment: Placement = 'top';

  @query('.trigger') trigger!: HTMLElement;
  @query('.content') content!: HTMLElement;
  @query('.caret') caret!: HTMLElement;

  @state() protected isVisible = false;

  private cleanupPositioning: (() => void) | null = null;
  private cleanupInvocation: (() => void) | null = null;
  private cleanupDismissal: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();
    console.log('BaseDisplay connected', { config: this.config, alignment: this.alignment });
  }

  render() {
    console.log('BaseDisplay rendering', { isVisible: this.isVisible, alignment: this.alignment });
    return html`
      <div class="trigger">
        <slot></slot>
      </div>
      <div class="content" ?data-show=${this.isVisible}>
        <slot name="content"></slot>
        ${this.config.enableCaret ? html`<div class="caret"></div>` : ''}
      </div>
    `;
  }

  protected firstUpdated() {
    console.log('BaseDisplay firstUpdated');
    this.setupBehaviors();
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    console.log('BaseDisplay updated', changedProperties);
    if (changedProperties.has('alignment') || changedProperties.has('config')) {
      this.setupBehaviors();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('BaseDisplay disconnected');
    this.cleanupPositioning?.();
    this.cleanupInvocation?.();
    this.cleanupDismissal?.();
  }

  private setupBehaviors() {
    console.log('Setting up behaviors', this.trigger, this.content);
    if (!this.trigger || !this.content) return;

    this.cleanupPositioning?.();
    this.cleanupInvocation?.();
    this.cleanupDismissal?.();

    this.cleanupPositioning = setupPositioning(
      this.trigger,
      this.content,
      this.config.enableCaret ? this.caret : null,
      this.config  // Pass the entire config object
    );
    this.cleanupInvocation = setupInvocation(this, this.config.invocation);
    this.cleanupDismissal = setupDismissal(this, this.config.dismissal);
  }

  show() {
    console.log('Show called');
    this.isVisible = true;
  }

  hide() {
    console.log('Hide called');
    this.isVisible = false;
  }

  toggle() {
    console.log('Toggle called');
    this.isVisible = !this.isVisible;
  }
}