import { css } from "lit";

export const cardStyles = css`
  :host {
    z-index: var(--z-index, 1000);
  }

  .card-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .content.card {
    background-color: var(--background-color, #ffffff);
    border-radius: 8px;
    box-shadow: 0 4px 20px var(--shadow-color, rgba(0, 0, 0, 0.1));
    min-width: 300px;
    max-width: 600px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .card-header {
    padding: 16px;
    background-color: var(--primary-color, #007bff);
    color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-header h3 {
    margin: 0;
    font-size: 20px;
  }

  .card-body {
    padding: 20px;
    overflow-y: auto;
  }

  .card-footer {
    padding: 16px;
    background-color: var(--background-color, #ffffff);
    border-top: 1px solid var(--border-color, #e0e0e0);
    text-align: right;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .card-footer button {
    margin-left: 8px;
    padding: 8px 16px;
    background-color: var(--primary-color, #007bff);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .card-footer button:hover {
    background-color: var(--secondary-color, #6c757d);
  }

  .close-btn {
    color: white;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
  }

  .close-btn:hover {
    color: var(--background-color, #ffffff);
  }
`;
