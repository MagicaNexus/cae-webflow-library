import { startSidePanelAnimation } from '$animations/animation';
import { sidePanelFadeOut } from '$animations/fade';
import { settings } from '$global/settings';
import '$styles/side-panel.css';

const sidePanel = (function () {
  const attributes = settings.attributes.sidePanel;
  const { global } = settings.attributes;

  return {
    init: function () {
      const sidePanels = document.querySelectorAll(attributes.component);
      sidePanels.forEach((sidePanel) => {
        const component = sidePanel as HTMLElement;
        const buttons = component.querySelectorAll(attributes.hide) as NodeList;

        const triggerAttribute = component.getAttribute(global.co_trigger);
        const triggerElement = document.querySelectorAll(
          `[${global.co_trigger}="${triggerAttribute}"]`
        );

        triggerElement.forEach((trigger) => {
          if (trigger.getAttribute(global.co_element) === settings.components.sidePanel) {
            const card = component.firstChild as HTMLElement;

            trigger.addEventListener('click', function () {
              sidePanelFadeOut(component);
            });
            if (!card) return;
            card.addEventListener('click', function (e) {
              e.stopPropagation();
            });
            return;
          }
          trigger.addEventListener('click', function () {
            startSidePanelAnimation(component, buttons);
          });
        });
      });
    },
  };
})();

// Initialize the component
sidePanel.init();
