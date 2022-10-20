import { fadeInElement as fadeIn, fadeOutElement as fadeOut } from '$animations/fade';
import { settings } from '$global/settings';
import '$styles/accordion.css';

const chip = (function () {
  const attributes = settings.attributes.flag_message;
  const { global } = settings.attributes;

  return {
    init: function () {
      document.querySelectorAll(attributes.component).forEach((trigger) => {
        const component: HTMLElement = trigger as HTMLElement;
        const button: HTMLDivElement | null = component.querySelector(attributes.hide);

        component.style.display = 'none';
        component.style.opacity = '0';
        component.style.transform = 'translateX(100%)';

        const triggerAttribute = component.getAttribute(global.co_trigger);
        const triggerElement = document.querySelectorAll(
          `[${global.co_trigger}="${triggerAttribute}"]`
        );

        triggerElement.forEach((trigger) => {
          if (trigger.getAttribute(global.co_element) === settings.components.flagMessage) return;

          trigger.addEventListener('click', showFlagMessage);

          function showFlagMessage() {
            fadeIn(component);

            setTimeout(() => {
              fadeOut(component);
            }, 5000);
          }
        });

        if (!button) return;

        //On click close button
        button.addEventListener('click', hideFlagMessage);

        function hideFlagMessage() {
          fadeOut(component);
        }
      });
    },
  };
})();

// Initialize the component
chip.init();

//TODO add delay on click
