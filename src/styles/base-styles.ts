import { css } from "lit";

export const baseStyles = css`
  :host {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --background-color: #ffffff;
    --text-color: #333333;
    --border-color: #e0e0e0;
    --shadow-color: rgba(0, 0, 0, 0.1);

    display: inline-block;
    position: relative;
  }

  .trigger {
    display: inline-block;
    cursor: pointer;
  }

  .content {
    position: absolute;
    z-index: var(--z-index, 1000);
    background-color: var(--background-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    box-shadow: 0 2px 10px var(--shadow-color);
    padding: 8px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    max-width: var(--max-width, 300px);
    min-width: var(--min-width, 100px);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    pointer-events: none;
  }

  .content[data-show] {
    opacity: 1;
    pointer-events: auto;
  }

  .caret {
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--background-color);
    border: 1px solid var(--border-color);
    transform: rotate(45deg);
    z-index: -1;
  }

  .close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: var(--secondary-color);
  }

  .close-btn:hover {
    color: var(--text-color);
  }

  .card-footer,
  .modal-footer,
  .popover-footer {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }

  button {
    padding: 5px 10px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  button:hover {
    background-color: var(--secondary-color);
  }
`;
