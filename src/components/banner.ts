import { startBannerAnimation } from '$animations/animation';
import { fadeIn, fadeOut } from '$animations/fade';
import { settings } from '$global/settings';
import '$styles/banner.css';

const banner = (function () {
  const attributes = settings.attributes.banner;
  const { global } = settings.attributes;

  return {
    init: function () {
      const banners = document.querySelectorAll(attributes.component);

      banners.forEach((trigger) => {
        const component = trigger as HTMLElement;
        const button = component.querySelector(attributes.hide) as HTMLDivElement;
        const triggerAttribute = component.getAttribute(global.co_trigger);
        const triggerElement = document.querySelectorAll(
          `[${global.co_trigger}="${triggerAttribute}"]`
        );

        triggerElement.forEach((trigger) => {
          if (trigger.getAttribute(global.co_element) === settings.components.banner) return;

          trigger.addEventListener('click', function () {
            startBannerAnimation(component, button);
            banners.forEach((trigger) => {
              const banner = trigger as HTMLElement;
              if (banner === component || banner.style.display === 'none') return;
              // banner.style.display = 'none';
              fadeOut(banner);
            });
          });

          function removeBanners() {
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
