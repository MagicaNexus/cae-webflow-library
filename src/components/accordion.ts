import { settings } from '$global/settings';
import '$styles/accordion.css';

const accordion = (function () {
  const { classes } = settings;
  const attributes = settings.attributes.accordion;
  const { global } = settings.attributes;

  return {
    init: function () {
      const accordions = document.querySelectorAll(attributes.component);

      accordions.forEach((accordion) => {
        const component: HTMLElement = accordion as HTMLElement;
        const toggle: HTMLDivElement | null = component.querySelector(attributes.toggle);
        const icon: HTMLElement | null = component.querySelector(attributes.icon);
        const body: HTMLDivElement | null = component.querySelector(attributes.body);

        if (!toggle || !icon || !body) return;

        //Disable the animation when component has a "disabled" class
        if (toggle.classList.contains(classes.disabled)) {
          component.style.pointerEvents = classes.none;
          return;
        }

        if (toggle.getAttribute(global.co_toggle) === global.toggleOn) {
          body.classList.remove(classes.hide);
          icon.classList.add(classes.active);
        } else {
          body.classList.add(classes.hide);
          icon.classList.remove(classes.active);
        }

        //On click component
        toggle.addEventListener('click', function () {
          icon.classList.toggle(classes.active);
          $(this).next().stop().slideToggle(300);
        });
      });
    },
  };
})();

// Initialize the component
accordion.init();
