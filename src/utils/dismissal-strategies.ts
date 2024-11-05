import { BaseDisplay } from "../components/BaseDisplay";
import { DismissalStrategy } from "../config/display-config";

export function setupDismissal(
  component: BaseDisplay,
  strategies: DismissalStrategy[] = ["mouseleave"],
): () => void {
  const cleanupFunctions: (() => void)[] = [];

  strategies.forEach((strategy) => {
    switch (strategy) {
      case "mouseleave":
        const content = component.shadowRoot?.querySelector(
          ".content",
        ) as HTMLElement;
        if (content) {
          const hideHandler = () => component.hide();
          content.addEventListener("mouseleave", hideHandler);
          cleanupFunctions.push(() =>
            content.removeEventListener("mouseleave", hideHandler),
          );
        }
        break;
      case "clickOutside":
        const clickOutsideHandler = (e: Event) => {
          if (!component.shadowRoot?.contains(e.target as Node)) {
            component.hide();
          }
        };
        document.addEventListener("click", clickOutsideHandler);
        cleanupFunctions.push(() =>
          document.removeEventListener("click", clickOutsideHandler),
        );
        break;
      case "escape":
        const escHandler = (e: KeyboardEvent) => {
          if (e.key === "Escape") {
            component.hide();
          }
        };
        document.addEventListener("keydown", escHandler);
        cleanupFunctions.push(() =>
          document.removeEventListener("keydown", escHandler),
        );
        break;
    }
  });

  return () => cleanupFunctions.forEach((cleanup) => cleanup());
}
