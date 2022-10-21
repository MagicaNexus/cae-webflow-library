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
        const toogle: HTMLDivElement | null = component.querySelector(attributes.toogle);
        const icon: HTMLElement | null = component.querySelector(attributes.icon);
        const body: HTMLDivElement | null = component.querySelector(attributes.body);

        if (!toogle || !icon || !body) return;

        //Disable the animation when component has a "disabled" class
        if (toogle.classList.contains(classes.disabled)) {
          component.style.pointerEvents = classes.none;
          return;
        }

        if (toogle.getAttribute(global.co_toogle) === global.toggleOn) {
          body.classList.remove(classes.hide);
          icon.classList.add(classes.active);
        } else {
          body.classList.add(classes.hide);
          icon.classList.remove(classes.active);
        }

        //On click component
        toogle.addEventListener('click', function () {
          icon.classList.toggle(classes.active);
          $(this).next().stop().slideToggle(300);
        });
      });
    },
  };
})();

// Initialize the component
accordion.init();
