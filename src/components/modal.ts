import { startModalAnimation } from '$animations/animation';
import { settings } from '$global/settings';

const modal = (function () {
  const attributes = settings.attributes.modal;
  const { global } = settings.attributes;

  return {
    init: function () {
      const modals = document.querySelectorAll(attributes.component);
      modals.forEach((modal) => {
        const component = modal as HTMLElement;
        const buttons = component.querySelectorAll(attributes.hide) as NodeList;

        const triggerAttribute = component.getAttribute(global.co_trigger);
        const triggerElement = document.querySelectorAll(
          `[${global.co_trigger}="${triggerAttribute}"]`
        );

        triggerElement.forEach((trigger) => {
          if (trigger.getAttribute(global.co_element) === settings.components.modal) return;
          trigger.addEventListener('click', function () {
            startModalAnimation(component, buttons);
          });
        });
      });
    },
  };
})();

// Initialize the component
modal.init();
