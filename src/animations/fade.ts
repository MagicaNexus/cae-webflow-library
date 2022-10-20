import { fadeIn as utilsFadeIn, fadeOut as utilsFadeOut } from '@finsweet/ts-utils';

import { settings } from '$global/settings';

const { attributes } = settings;
const { components } = settings;

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

export const fadeOut = (element: HTMLElement, gap = '0px', hasAnimation = true) => {
  switch (element.getAttribute(attributes.global.co_element)) {
    case components.chip:
      chipFadeOut(element, gap);
      break;
    case components.flagMessage:
      flagFadeOut(element);
      break;
    case components.banner:
      bannerFadeOut(element, hasAnimation);
      break;
    default:
      utilsFadeOut(element);
  }
};

function flagFadeOut(element: HTMLElement) {
  element.style.transition = 'all 0.3s ease-in-out';
  element.style.transform = 'translateX(100%)';
  element.style.opacity = '0';
  setTimeout(() => {
    element.style.display = 'none';
  }, 300);
}

function bannerFadeOut(element: HTMLElement, hasAnimation: boolean) {
  if (hasAnimation) {
    element.style.transition = 'all 0.3s ease-in-out';
    element.style.transform = 'translateY(-100%)';
    element.style.opacity = '0';
    setTimeout(() => {
      element.style.display = 'none';
    }, 300);
  } else {
    element.style.transform = 'translateY(-100%)';
    element.style.opacity = '0';
    element.style.display = 'none';
  }
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

function flagFadeIn(element: HTMLElement) {
  element.style.display = 'flex';
  setTimeout(() => {
    element.style.transition = 'all 0.3s ease-in-out';
    element.style.transform = 'translateX(0%)';
    element.style.opacity = '100';
  }, 100);
}

function bannerFadeIn(element: HTMLElement) {
  element.style.display = 'flex';
  setTimeout(() => {
    element.style.transition = 'all 0.3s ease-in-out';
    element.style.transform = 'translateY(0%)';
    element.style.opacity = '100';
  }, 100);
}
