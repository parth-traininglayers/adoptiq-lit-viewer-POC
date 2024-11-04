export type Pin = {
  id: string;
  selector: {
    cssSelector: string;
    textContent: boolean;
  };
  title: string;
  content: string;
  triggerType: string;
  dismissType: string;
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
