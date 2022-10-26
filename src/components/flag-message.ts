import { startFlagAnimation } from '$animations/animation';
import { settings } from '$global/settings';
import '$styles/flag-message.css';

const flagMessage = (function () {
  const attributes = settings.attributes.flag_message;
  const { global } = settings.attributes;

  return {
    init: function () {
      document.querySelectorAll(attributes.component).forEach((trigger) => {
        const component = trigger as HTMLElement;
        const buttons = component.querySelectorAll(attributes.hide) as NodeList;

        const triggerAttribute = component.getAttribute(global.co_trigger);
        const triggerElement = document.querySelectorAll(
          `[${global.co_trigger}="${triggerAttribute}"]`
        );

        triggerElement.forEach((trigger) => {
          if (trigger.getAttribute(global.co_element) === settings.components.flagMessage) return;

          trigger.addEventListener('click', function () {
            startFlagAnimation(component, buttons);
          });
        });
      });
    },
  };
})();

// Initialize the component
flagMessage.init();
