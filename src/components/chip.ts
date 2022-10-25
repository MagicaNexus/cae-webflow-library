import { startChipAnimation } from '$animations/animation';
import { settings } from '$global/settings';

const chip = (function () {
  const attributes = settings.attributes.chip;

  return {
    init: function () {
      document.querySelectorAll(attributes.component).forEach((trigger) => {
        const component: HTMLElement = trigger as HTMLElement;
        const button: HTMLDivElement | null = component.querySelector(attributes.hide);
        const list: HTMLDivElement | null = component.closest(attributes.list);

        if (!button || !list) return;

        const { rowGap } = getComputedStyle(list);

        startChipAnimation(component, button, rowGap);
      });
    },
  };
})();

// Initialize the component
chip.init();
