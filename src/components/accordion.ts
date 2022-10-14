import { attrElement } from 'src';

const accordion = (function () {
  // Accordion Settings
  const settings = {
    speed: 300, // Animation speed
    attribute: {
      toogle: `[${attrElement}="accordion-toogle"]`,
      icon: `[${attrElement}="accordion-icon"]`,
      item: `[${attrElement}="accordion-item"]`,
      open: 'accordion-open',
    },
    class: {
      active: 'active',
      disabled: 'disabled',
      none: 'none',
    },
  };

  const classes = settings.class;
  const attributes = settings.attribute;
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
            .closest(attributes.item)
            .toggleClass(classes.active)
            .find(closestIcon)
            .closest(attributes.icon)
            .toggleClass(classes.active);

          //Toogle the body of the accordion
          $(this).next().stop().slideToggle(settings.speed);
        }
      });
    },
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  accordion.init();
});
