import { DismissalStrategy } from "../main";

export type Pin = {
  id: string;
  selector: {
    cssSelector: string;
    textContent: boolean; // not used
  };
  content: string;
  buttons?: Array<{text: string, action: Function}> // only for modals
  buttonText ?: string;
  triggerType: string;
  dismissType: DismissalStrategy[];
  width: number;
  displayType: string;
  pinPlacement: {
    position: string;
    offset: {
      x: number;
      y: number;
    };
  };
  contentPlacement: {
    position: string;
    offset: {
      x: number;
      y: number;
    };
  };
}
