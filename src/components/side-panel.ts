import { startSidePanelAnimation } from '$animations/animation';
import { settings } from '$global/settings';
import '$styles/side-panel.css';

const sidePanel = (function () {
  const attributes = settings.attributes.sidePanel;
  const { global } = settings.attributes;

  return {
    init: function () {
      const sidePanels = document.querySelectorAll(attributes.component);
      sidePanels.forEach((item) => {
        const sidePanel = item as HTMLElement;
        const closeButtons = sidePanel.querySelectorAll(attributes.hide) as NodeList;

        const triggers = document.querySelectorAll(
          `[${global.co_trigger}="${sidePanel.getAttribute(global.co_trigger)}"]`
        );

        triggers.forEach((trigger) => {
          if (trigger.getAttribute(global.co_element) === 'side-panel') return;
          trigger.addEventListener('click', function () {
            startSidePanelAnimation(sidePanel, closeButtons);
          });
        });
      });
    },
  };
})();

// Initialize the component
sidePanel.init();
