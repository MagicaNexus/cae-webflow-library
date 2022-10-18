import { settings } from '$global/settings';
import '$styles/accordion.css';

const accordion = (function () {
  const { classes } = settings;
  const attributes = settings.attributes.accordion;
  const closestIcon = `> ${attributes.toogle} > ${attributes.icon}`;

  return {
    init: function () {
      document.querySelectorAll(attributes.toogle).forEach((trigger) => {
        const triggerElement: HTMLElement = trigger as HTMLElement;
        const parent: HTMLElement | null = triggerElement.parentElement;

        if (parent == null) return;

        //Disable the animation when component has a "disabled" class
        if (parent.classList.contains(classes.disabled)) {
          triggerElement.style.pointerEvents = classes.none;
          return;
        }

        //On click component
        triggerElement.addEventListener('click', toogleAccordion);

        function toogleAccordion(this: any) {
          //Rotate the icon of the selected accordion
          $(this)
            .closest(attributes.component)
            .toggleClass(classes.active)
            .find(closestIcon)
            .closest(attributes.icon)
            .toggleClass(classes.active);

          //Toogle the body of the accordion
          $(this).next().stop().slideToggle(300);
        }
      });
    },
  };
})();

// Initialize the component
accordion.init();
