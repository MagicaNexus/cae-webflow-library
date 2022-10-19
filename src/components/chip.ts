import { fadeOut } from '$animations/fade';
import { settings } from '$global/settings';
import '$styles/accordion.css';

const chip = (function () {
  const attributes = settings.attributes.chip;

  return {
    init: function () {
      document.querySelectorAll(attributes.component).forEach((trigger) => {
        const component: HTMLElement = trigger as HTMLElement;
        const button: HTMLDivElement | null = component.querySelector(attributes.icon);
        const list: HTMLDivElement | null = component.closest(attributes.list);

        if (!button || !list) return;

        const { rowGap } = getComputedStyle(list);

        //On click close button
        button.addEventListener('click', closeChip);

        function closeChip() {
          fadeOut(component, rowGap);
        }
      });
    },
  };
})();

// Initialize the component
chip.init();
