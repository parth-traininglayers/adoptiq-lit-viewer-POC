import { css } from "lit";

export const popoverStyles = css`
  .content.popover {
    padding: 0;
    position: absolute;
    z-index: var(--z-index, 1000);
    background-color: var(--background-color, white);
    border: 1px solid var(--border-color, #ccc);
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
  }

  .popover-header {
    padding: 8px 12px;
    background-color: var(--primary-color, #007bff);
    color: white;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .popover-header h3 {
    margin: 0;
    font-size: 16px;
  }

  .popover-body {
    padding: 12px;
  }

  .close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: white;
  }

  .close-btn:hover {
    color: var(--background-color, #f8f9fa);
  }

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
