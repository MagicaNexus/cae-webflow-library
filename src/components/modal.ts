import { startModalAnimation } from '$animations/animation';
import { settings } from '$global/settings';
import '$styles/modal.css';

const modal = (function () {
  const attributes = settings.attributes.modal;
  const { global } = settings.attributes;

  return {
    init: function () {
      const modals = document.querySelectorAll(attributes.component);
      modals.forEach((item) => {
        const modal = item as HTMLElement;

        // Get all the buttons that close the modal
        const closeButtons = modal.querySelectorAll(attributes.hide) as NodeList;

        //List all the elements that trigger the modal
        const triggers = document.querySelectorAll(
          `[${global.co_trigger}="${modal.getAttribute(global.co_trigger)}"]`
        );

        triggers.forEach((trigger) => {
          if (!isModal(trigger)) {
            trigger.addEventListener('click', function () {
              startModalAnimation(modal, closeButtons);
            });
          }
        });
      });
    },
  };

  function isModal(element: Element) {
    return element.getAttribute(global.co_element) === 'modal';
  }
})();

// Initialize the component
modal.init();
