import { BaseDisplay } from "../components/BaseDisplay";
import { InvocationStrategy } from "../config/display-config";

export function setupInvocation(
  component: BaseDisplay,
  strategy: InvocationStrategy = "hover"
): () => void {
  
  const trigger = component.shadowRoot?.querySelector(
    ".trigger",
  ) as HTMLElement;
  if (!trigger) return () => {};

  const showHandler = () => component.show();
  const hideHandler = () => component.hide();
  const toggleHandler = () => component.toggle();

  switch (strategy) {
    case "hover":
      trigger.addEventListener("mouseenter", showHandler);
      trigger.addEventListener("mouseleave", hideHandler);
      return () => {
        trigger.removeEventListener("mouseenter", showHandler);
        trigger.removeEventListener("mouseleave", hideHandler);
      };
    case "click":
      trigger.addEventListener("click", toggleHandler);
      return () => {
        trigger.removeEventListener("click", toggleHandler);
      };
    case "focus":
      trigger.addEventListener("focus", showHandler);
      trigger.addEventListener("blur", hideHandler);
      return () => {
        trigger.removeEventListener("focus", showHandler);
        trigger.removeEventListener("blur", hideHandler);
      };
    default:
      return () => {};
  }
}
