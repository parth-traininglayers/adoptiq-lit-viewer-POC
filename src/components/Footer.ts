import { LitElement, html, css, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("footer-menu")
export class FooterMenu extends LitElement {
  @property({ type: Boolean }) isTriggerMenuOpen = false;
  @property({ type: Boolean }) isDropdownOpen = false;

  connectedCallback() {
    super.connectedCallback();
    console.log("CounterApp connected to the DOM");
  }

  static styles = css`
    :host {
      font-family: Arial, Helvetica, sans-serif;
    }

    /* Base styles */
    .footer-container {
      position: fixed;
      z-index: 1000000;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      right: 0;
      background-color: #fff;
      padding: 16px;
    }

    /* Utility classes (converted from Tailwind) */
    .flex {
      display: flex;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .items-center {
      align-items: center;
    }

    .flex-col {
      flex-direction: column;
    }

    .w-full {
      width: 100%;
    }

    .text-center {
      text-align: center;
    }

    .cursor-pointer {
      cursor: pointer;
    }

    .z-99999 {
      z-index: 99999;
    }

    .h-20px {
      height: 20px;
    }

    .text-6b7280 {
      color: #6b7280;
    }

    .fill-6b7280 {
      fill: #6b7280;
    }

    .leading-tight {
      line-height: 1.25;
    }

    .text-sm {
      font-size: 0.875rem;
    }

    .text-xs {
      font-size: 0.75rem;
    }

    .font-extrabold {
      font-weight: 800;
    }

    .font-normal {
      font-weight: 400;
    }

    .mt-10 {
      margin-top: 2.5rem;
    }

    .py-2 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    .px-4 {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .pb-0 {
      padding-bottom: 0 !important;
    }

    .pt-0 {
      padding-top: 0 !important;
    }

    /* Component specific styles */
    .footer {
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
      flex-direction: row;
    }

    .footer-left,
    .footer-right {
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-direction: column;
      cursor: pointer;
      margin: 0.25rem;
    }

    .footer-left img,
    .footer-right img {
      height: auto;
      max-width: 100%;
    }

    .footer-right img {
      border-radius: 50%;
    }

    .dropdown-content {
      display: none;
      z-index: 1;
      list-style-type: none;
      width: 300px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      padding: 0;
      margin-bottom: 16px;
      color: #6b7280;
    }

    .dropdown-content.open {
      display: block;
    }

    .no-layers {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 40px;
      padding: 20px 20px 0 20px;
      background-color: white;
    }

    .no-layers svg {
      fill: #6b7280;
    }

    .hidden {
      display: none;
    }

    .tooltip {
      position: relative;
    }

    .tooltip:hover:before {
      content: attr(data-tip);
      position: absolute;
      top: -30px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
    }

    .form-control {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Rest of your existing styles remain the same */
    .no-layers h4 {
      font-size: 14px;
      font-weight: 800;
      padding-top: 30px;
      margin: 0;
    }

    .no-layers p {
      font-size: 12px;
      text-align: center;
      margin: 0;
      padding: 10px 0;
    }

    li {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    li a {
      text-decoration: none;
      padding: 8px 16px;
      color: #6b7280;
      background: transparent;
      cursor: pointer;
    }

    li a:hover {
      background-color: #f3f4f6;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: #6b7280;
    }

    button svg {
      fill: #6b7280;
    }
  `;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    console.log("FooterMenu called!");
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleTriggerMenu() {
    this.isTriggerMenuOpen = !this.isTriggerMenuOpen;
    if (this.isDropdownOpen) this.isDropdownOpen = false;
  }

  render() {
    console.log("Footer UI Rendering");
    return html`
      <div class="footer-container">
        <div class="footer">
          <div
            class=${this.isTriggerMenuOpen ? "footer-left" : "hidden"}
            @click=${this.toggleDropdown}
          >
            <ul
              tabindex="0"
              class="no-layers dropdown-content ${this.isDropdownOpen
                ? "open"
                : "hidden"}"
              style="left: 0px;"
            >
              <li
                class="flex justify-center align-center items-center flex-col mt-10 text-#6b7280 fill-#6b7280"
                style="background: white;"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="68"
                  font-size="68"
                  viewBox="0 0 65 65"
                  fill="none"
                  style="padding: 0px;"
                >
                  <path
                    d="M58 33H64C64 50.75 49.625 65 32 65C14.25 65 0 50.75 0 33C0 15.375 14.25 1 32 1C39.75 1 46.75 3.875 52.25 8.5L58.875 2C60 0.75 61.875 0.75 63 2C64.25 3.125 64.25 5 63 6.125L39.25 29.875C39.75 30.875 40 32 40 33C40 37.5 36.375 41 32 41C27.5 41 24 37.5 24 33C24 28.625 27.5 25 32 25C33 25 34.125 25.25 35 25.75L39.375 21.375C37.25 19.875 34.75 19 32 19C24.25 19 18 25.375 18 33C18 40.75 24.25 47 32 47C39.625 47 46 40.75 46 33H52C52 42.875 44.875 51 35.625 52.75C34.625 51.75 33.375 51 32 51C30.5 51 29.25 51.75 28.25 52.75C20.125 51.25 13.75 44.875 12.25 36.75C13.25 35.75 14 34.5 14 33C14 31.625 13.25 30.375 12.25 29.375C14 20.125 22.125 13 32 13C36.375 13 40.5 14.5 43.75 17L48 12.75C43.625 9.25 38 7 32 7C19 7 8.25 16.5 6.25 28.875C4.875 29.75 4 31.25 4 33C4 34.875 4.875 36.375 6.25 37.25C8.125 48.25 16.75 56.875 27.625 58.625C28.625 60.125 30.125 61 32 61C33.75 61 35.25 60.125 36.125 58.75C48.5 56.75 58 46 58 33Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <h4
                  class="leading-tight text-sm font-extrabold pb-0"
                  style="padding-top: 30px; background-color: white;"
                >
                  No Layers on This Page
                </h4>
                <p
                  class="text-xs font-normal text-center pt-0"
                  style="background: white;"
                >
                  No content is available in the current view. Click on the gear
                  icon to enable additional layers.
                </p>
              </li>
              <li>
                <a class="py-2 px-4" style="background: 0px center;"
                  ><div class="flex w-full justify-between items-center">
                    <button
                      data-tip="User Preferences"
                      class="cursor-pointer tooltip z-99999 flex justify-center items-center form-control h-20px text-#6b7280 fill-#6b7280"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 14 15"
                        fill="currentColor"
                      >
                        <path
                          d="M7 0.75C7.46484 0.75 7.90234 0.804688 8.33984 0.886719C8.55859 0.941406 8.94141 1.05078 9.16016 1.43359C9.21484 1.54297 9.24219 1.65234 9.26953 1.76172L9.54297 2.82812C9.57031 2.96484 9.84375 3.12891 10.0078 3.07422L11.0469 2.77344C11.1562 2.74609 11.2656 2.71875 11.375 2.71875C11.8125 2.71875 12.1133 2.99219 12.25 3.15625C12.8516 3.83984 13.3164 4.63281 13.6172 5.50781C13.6992 5.72656 13.7812 6.10938 13.5352 6.46484C13.4805 6.57422 13.3984 6.65625 13.3164 6.73828L12.5508 7.50391C12.4141 7.61328 12.4141 7.91406 12.5508 8.02344L13.3164 8.78906C13.3984 8.87109 13.4805 8.95312 13.5352 9.0625C13.7539 9.41797 13.6719 9.80078 13.6172 10.0195C13.3164 10.8945 12.8516 11.6875 12.25 12.3711C12.1133 12.5352 11.8125 12.8086 11.375 12.8086C11.2656 12.8086 11.1562 12.7812 11.0469 12.7539L10.0078 12.4258C9.84375 12.3984 9.57031 12.5352 9.54297 12.6992L9.26953 13.7656C9.24219 13.875 9.21484 13.9844 9.16016 14.0938C8.94141 14.4766 8.55859 14.5859 8.33984 14.6406C7.90234 14.7227 7.46484 14.75 7 14.75C6.53516 14.75 6.07031 14.7227 5.63281 14.6406C5.41406 14.5859 5.03125 14.4766 4.8125 14.0938C4.75781 13.9844 4.73047 13.875 4.70312 13.7656L4.42969 12.6992C4.40234 12.5352 4.12891 12.3984 3.99219 12.4258L2.95312 12.7539C2.84375 12.7812 2.70703 12.7812 2.59766 12.8086C2.16016 12.8086 1.85938 12.5352 1.72266 12.3711C1.12109 11.6875 0.65625 10.8945 0.355469 10.0195C0.300781 9.80078 0.21875 9.41797 0.4375 9.03516C0.492188 8.95312 0.574219 8.84375 0.65625 8.76172L1.44922 8.02344C1.55859 7.91406 1.55859 7.61328 1.44922 7.50391L0.65625 6.73828C0.574219 6.65625 0.492188 6.57422 0.4375 6.46484C0.21875 6.10938 0.300781 5.72656 0.355469 5.50781C0.65625 4.63281 1.12109 3.83984 1.72266 3.15625C1.85938 2.99219 2.16016 2.71875 2.59766 2.71875C2.70703 2.71875 2.84375 2.74609 2.95312 2.77344L3.99219 3.07422C4.12891 3.12891 4.40234 2.96484 4.42969 2.82812L4.70312 1.76172C4.73047 1.65234 4.75781 1.54297 4.8125 1.43359C5.03125 1.05078 5.41406 0.941406 5.63281 0.886719C6.07031 0.804688 6.53516 0.75 7 0.75ZM5.96094 2.17188L5.71484 3.12891C5.49609 4.00391 4.48438 4.60547 3.60938 4.35938L2.65234 4.05859C2.21484 4.60547 1.85938 5.20703 1.61328 5.86328L2.35156 6.54688C3.00781 7.17578 3.00781 8.35156 2.35156 8.98047L1.61328 9.66406C1.85938 10.3203 2.21484 10.9219 2.65234 11.4688L3.60938 11.168C4.48438 10.9219 5.49609 11.5234 5.71484 12.3984L5.96094 13.3555C6.61719 13.4922 7.35547 13.4922 8.03906 13.3555L8.25781 12.3984C8.47656 11.5234 9.48828 10.9219 10.3633 11.168L11.3203 11.4688C11.7578 10.9219 12.1133 10.3203 12.3594 9.66406L11.6484 8.98047C10.9922 8.35156 10.9922 7.17578 11.6484 6.54688L12.3594 5.86328C12.1133 5.20703 11.7578 4.60547 11.3203 4.05859L10.3633 4.35938C9.51562 4.60547 8.47656 4.00391 8.25781 3.12891L8.03906 2.17188C7.35547 2.03516 6.61719 2.03516 5.96094 2.17188ZM5.6875 7.75C5.6875 8.24219 5.93359 8.65234 6.34375 8.89844C6.72656 9.14453 7.24609 9.14453 7.65625 8.89844C8.03906 8.65234 8.3125 8.24219 8.3125 7.75C8.3125 7.28516 8.03906 6.875 7.65625 6.62891C7.24609 6.38281 6.72656 6.38281 6.34375 6.62891C5.93359 6.875 5.6875 7.28516 5.6875 7.75ZM7 10.375C6.04297 10.375 5.19531 9.88281 4.70312 9.0625C4.23828 8.26953 4.23828 7.25781 4.70312 6.4375C5.19531 5.64453 6.04297 5.125 7 5.125C7.92969 5.125 8.77734 5.64453 9.26953 6.4375C9.73438 7.25781 9.73438 8.26953 9.26953 9.0625C8.77734 9.88281 7.92969 10.375 7 10.375Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                    <div class="flex justify-center items-center">
                      <div class="w-full"></div>
                    </div></div
                ></a>
              </li>
            </ul>
            <img
              src="https://via.placeholder.com/150"
              height="48"
              width="48"
              alt="Logo"
            />
          </div>
          <div class="footer-right" @click=${this.toggleTriggerMenu}>
            <img
              src="https://via.placeholder.com/150"
              height="48"
              width="48"
              alt="Logo"
            />
          </div>
        </div>
      </div>
    `;
  }
}
