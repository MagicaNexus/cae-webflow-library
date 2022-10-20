import { fadeIn, fadeOut } from '$animations/fade';
import { settings } from '$global/settings';

const banner = (function () {
  const attributes = settings.attributes.banner;
  const { global } = settings.attributes;

  return {
    init: function () {
      const banners = document.querySelectorAll(attributes.component);

      banners.forEach((trigger) => {
        const component: HTMLElement = trigger as HTMLElement;
        const button: HTMLDivElement | null = component.querySelector(attributes.hide);

        component.style.display = 'none';
        component.style.opacity = '0';
        component.style.transform = 'translateY(-100%)';

        const triggerAttribute = component.getAttribute(global.co_trigger);
        const triggerElement = document.querySelectorAll(
          `[${global.co_trigger}="${triggerAttribute}"]`
        );

        triggerElement.forEach((trigger) => {
          if (trigger.getAttribute(global.co_element) === settings.components.banner) return;
          trigger.addEventListener('click', showBanner);

          function showBanner() {
            banners.forEach((trigger) => {
              const banner: HTMLElement = trigger as HTMLElement;
              if (banner === component || banner.style.display === 'none') return;

              banner.style.display = 'none';
              fadeOut(banner, undefined, false);
            });

            fadeIn(component);
          }
        });

        if (!button) return;

        //On click close button
        button.addEventListener('click', hideBanner);

        function hideBanner() {
          fadeOut(component);
        }
      });
    },
  };
})();

// Initialize the component
banner.init();

//TODO add delay on click
