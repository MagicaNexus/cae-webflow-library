import { fadeIn, fadeOut } from '@finsweet/ts-utils';

import { settings } from '$global/settings';

const { attributes } = settings;
const { components } = settings;

export const fadeOutElement = (element: HTMLElement, gap = '0px') => {
  switch (element.getAttribute(attributes.global.co_element)) {
    case components.chip:
      fadeOutChip(element, gap);
      break;
    case components.flagMessage:
      fadeOutTopRight(element);
      break;
    default:
      fadeOut(element);
  }
};

export const fadeInElement = (element: HTMLElement) => {
  switch (element.getAttribute(attributes.global.co_element)) {
    case components.flagMessage:
      fadeInTopRight(element);
      break;
    default:
      fadeIn(element);
  }
};

function fadeOutTopRight(element: HTMLElement) {
  element.style.transition = 'all 0.3s ease-in-out';
  element.style.transform = 'translateX(100%)';
  element.style.opacity = '0';
  setTimeout(() => {
    element.style.display = 'none';
  }, 300);
}

function fadeOutChip(element: HTMLElement, gap: string) {
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

function fadeInTopRight(element: HTMLElement) {
  element.style.display = 'flex';
  setTimeout(() => {
    element.style.transition = 'all 0.3s ease-in-out';
    element.style.transform = 'translateX(0%)';
    element.style.opacity = '100';
  }, 100);
}
