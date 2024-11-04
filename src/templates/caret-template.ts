import { html, TemplateResult, css } from "lit";

const caretStyles = css`
  .caret {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    visibility: hidden;
  }
  .caret::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    visibility: visible;
    content: "";
    transform: rotate(45deg);
  }
`;

export const caretTemplate = (): TemplateResult => {
  return html`
    <style>
      ${caretStyles}
    </style>
    <div class="caret"></div>
  `;
};

export const positionCaret = (
  caretElement: HTMLElement,
  placement: string,
  x: number | null,
  y: number | null,
) => {
  if (!caretElement) return;

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[placement.split("-")[0]] as string;

  Object.assign(caretElement.style, {
    left: x != null ? `${x}px` : "",
    top: y != null ? `${y}px` : "",
    right: "",
    bottom: "",
    [staticSide]: "-4px",
  });
};
