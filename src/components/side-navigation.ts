import gsap from 'gsap';

import { settings } from '$global/settings';
import '$styles/side-navigation.css';

const sideNavigation = (function () {
  const attributes = settings.attributes.sideNavigation;
  const accordionAttr = settings.attributes.accordion;
  const { global } = settings.attributes;
  const options = {
    open: {
      display: 'flex',
      width: '14.5rem',
      accordion: {
        height: 'auto',
        display: 'block',
        opacity: 1,
      },
      backing: {
        rotate: '0',
        spacer: 'block',
      },
    },
    close: {
      display: 'none',
      width: '4rem',
      accordion: {
        height: '0',
        display: 'none',
        opacity: 0,
      },
      backing: {
        rotate: '180',
        spacer: 'none',
      },
    },
  };

  return {
    init: function () {
      const sideNavigation = document.querySelectorAll(attributes.component);
      sideNavigation.forEach((query) => {
        const component = query as HTMLElement;
        const accordionBodies: NodeList = component.querySelectorAll(accordionAttr.body);
        const accordionIcons: NodeList = component.querySelectorAll(accordionAttr.icon);
        const background = document.querySelector(settings.attributes.background) as HTMLElement;
        const backing = component.querySelector(attributes.backing) as HTMLDivElement;
        const backingIcon = backing.querySelector(attributes.icon) as HTMLElement;
        const hamburger = document.querySelector(attributes.navButton) as HTMLDivElement;
        const bodySpacer = document.querySelector(attributes.bodySpacer) as HTMLDivElement;

        let isOpenDesktop = component.getAttribute(global.co_toggle) === global.toggleOn;
        let isOpenMobile = false;
        let firstClick = true;

        initialize();

        backing.addEventListener('click', function () {
          resize();
        });

        hamburger.addEventListener('click', function () {
          isOpenMobile = !isOpenMobile;

          if (firstClick) {
            firstClick = false;
            component.style.display = options.close.display;
            component.style.transform = 'translateX(-100%)';
            component.style.opacity = '0';
            background.style.opacity = '0';
            background.style.display = 'none';
          }

          // if (isOpenMobile) component.style.display = options.open.display;

          gsap.to(component, {
            transform: isOpenMobile ? 'translateX(0%)' : 'translateX(-100%)',
            opacity: isOpenMobile ? 1 : 0,
            onStart: () => {
              if (isOpenMobile) component.style.display = 'flex';
            },
            onComplete: () => {
              if (!isOpenMobile) component.style.display = 'none';
            },
          });

          gsap.to(background, {
            opacity: isOpenMobile ? 1 : 0,
            onStart: () => {
              if (isOpenMobile) background.style.display = 'block';
            },
            onComplete: () => {
              if (!isOpenMobile) background.style.display = 'none';
            },
          });

          background.addEventListener('click', function () {
            isOpenMobile = false;
            gsap.to(component, {
              transform: 'translateX(-100%)',
              opacity: 0,
              onComplete: () => {
                component.style.display = 'none';
              },
            });
            gsap.to(background, {
              opacity: 0,
              onComplete: () => {
                background.style.display = 'none';
              },
            });
          });
        });

        function initialize() {
          const option = isOpenDesktop ? options.open : options.close;

          accordionBodies.forEach((body) => {
            const accordionBody: HTMLElement = body as HTMLElement;
            accordionBody.style.height = option.accordion.height;
          });

          accordionIcons.forEach((icon) => {
            const accordionIcon: HTMLElement = icon as HTMLElement;
            accordionIcon.style.display = option.accordion.display;
          });

          if (isOpenDesktop || !backingIcon) return;
          component.classList.add(settings.classes.close);
          backingIcon.style.transform = `rotate(${options.close.backing.rotate}deg)`;
        }

        function resize() {
          isOpenDesktop = !isOpenDesktop;
          const option = isOpenDesktop ? options.open : options.close;

          gsap.to(component, {
            width: option.width,
          });
          gsap.to(bodySpacer, {
            width: option.width,
          });
          gsap.to(backingIcon, {
            rotate: option.backing.rotate,
          });

          accordionBodies.forEach((body) => {
            const accordionBody: HTMLElement = body as HTMLElement;
            gsap.to(accordionBody, {
              height: option.accordion.height,
            });
          });

          accordionIcons.forEach((icon) => {
            const accordionIcon: HTMLElement = icon as HTMLElement;
            gsap.to(accordionIcon, {
              opacity: option.accordion.opacity,
              display: option.accordion.display,
            });
          });
        }
      });
    },
  };
})();

// Initialize the component
sideNavigation.init();
