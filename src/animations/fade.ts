import { fadeIn as utilsFadeIn, fadeOut as utilsFadeOut } from '@finsweet/ts-utils';
import gsap from 'gsap';

import { settings } from '$global/settings';

const { attributes } = settings;
const { components } = settings;

gsap.defaults({
  ease: 'power1.inOut',
  duration: 0.3,
});

export const fadeIn = (element: HTMLElement) => {
  switch (element.getAttribute(attributes.global.co_element)) {
    case components.flagMessage:
      flagFadeIn(element);
      break;
    case components.banner:
      bannerFadeIn(element);
      break;
    default:
      utilsFadeIn(element);
  }
};

export const fadeOut = (element: HTMLElement, gap = '0px') => {
  switch (element.getAttribute(attributes.global.co_element)) {
    case components.chip:
      chipFadeOut(element, gap);
      break;
    case components.flagMessage:
      flagFadeOut(element);
      break;
    case components.banner:
      bannerFadeOut(element);
      break;
    default:
      utilsFadeOut(element);
  }
};

function flagFadeIn(element: HTMLElement) {
  element.style.transform = 'translateX(100%)';
  element.style.opacity = '0';
  gsap.to(element, {
    transform: 'translateX(0%)',
    opacity: 1,
    display: 'flex',
  });
}

function flagFadeOut(element: HTMLElement) {
  gsap.to(element, {
    transform: 'translateX(100%)',
    opacity: 0,
    onComplete: () => {
      element.style.display = 'none';
    },
  });
}

function bannerFadeIn(element: HTMLElement) {
  element.style.transform = 'translateY(-100%)';
  element.style.opacity = '0';
  gsap.to(element, {
    transform: 'translateY(0%)',
    opacity: 1,
    display: 'flex',
  });
}

export function bannerFadeOut(element: HTMLElement) {
  gsap.to(element, {
    opacity: 0,
    transform: 'translateY(-100%)',
    onComplete: () => {
      element.style.display = 'none';
    },
  });
}

function chipFadeOut(element: HTMLElement, gap: string) {
  const parent: ParentNode | null = element.parentNode;
  const wrapper: HTMLDivElement = document.createElement('div');

  if (!parent) return;

  wrapper.style.width = element.offsetWidth.toString() + 'px';
  wrapper.style.height = element.offsetHeight.toString() + 'px';
  parent.insertBefore(wrapper, element);

  setTimeout(() => {
    wrapper.appendChild(element);
    wrapper.style.transition = 'all 0.3s ease-in-out';
    wrapper.style.transform = 'translateY(-1.5rem)';
  }, 0);

  setTimeout(() => {
    wrapper.style.opacity = '0';
  }, 50);

  setTimeout(() => {
    wrapper.style.width = '0px';
    wrapper.style.height = '0px';
    wrapper.style.marginLeft = `-${gap}`;
  }, 200);

  setTimeout(() => {
    wrapper.style.display = 'none';
  }, 500);
}
