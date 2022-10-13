const accordion = (function () {
  // Accordion Settings
  const settings = {
    speed: 300, // Animation speed
    attributeToogle: '[cobalt-element="accordion-toogle"]',
    attributeIcon: '[cobalt-element="accordion-icon"]',
    attributeItem: '[cobalt-element="accordion-item"]',
    attributeOpen: 'accordion-open',
    classes: {
      active: 'active',
      disabled: 'disabled',
      none: 'none',
    },
  };

  const prefix = settings.classes;
  const closestIcon = `> ${settings.attributeToogle} > ${settings.attributeIcon}`;

  return {
    init: function () {
      document.querySelectorAll(settings.attributeToogle).forEach((trigger) => {
        const triggerElement: HTMLElement = trigger as HTMLElement;
        const parent: HTMLElement | null = triggerElement.parentElement;

        if (parent == null) return;

        //Disable the animation when component has a "disabled" class
        if (parent.classList.contains(prefix.disabled)) {
          triggerElement.style.pointerEvents = prefix.none;
          return;
        }

        //On click component
        triggerElement.addEventListener('click', toogleAccordion);

        function toogleAccordion(this: any) {
          //Rotate the icon of the selected accordion
          $(this)
            .closest(settings.attributeItem)
            .toggleClass(prefix.active)
            .find(closestIcon)
            .closest(settings.attributeIcon)
            .toggleClass(prefix.active);

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
