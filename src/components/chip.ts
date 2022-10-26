import { startChipAnimation } from '$animations/animation';
import { settings } from '$global/settings';

const chip = (function () {
  const attributes = settings.attributes.chip;

  return {
    init: function () {
      document.querySelectorAll(attributes.component).forEach((trigger) => {
        const component = trigger as HTMLElement;
        const button = component.querySelector(attributes.hide) as HTMLDivElement;
        const list = component.closest(attributes.list) as HTMLDivElement;

        if (!button || !list) return;

        const { rowGap } = getComputedStyle(list);

        startChipAnimation(component, button, rowGap);
      });
    },
  };
})();

// Initialize the component
chip.init();
