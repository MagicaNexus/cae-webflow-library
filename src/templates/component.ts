import { settings } from '$global/settings';

const component = (function () {
  const attributes = settings.attributes.flag_message;
  const { global } = settings.attributes;

  return {
    init: function () {
      document.querySelectorAll(attributes.component).forEach((trigger) => {
        const component: HTMLElement = trigger as HTMLElement;
      });
    },
  };
})();

// Initialize the component
component.init();
