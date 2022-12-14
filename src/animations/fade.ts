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
    case components.modal:
      modalFadeIn(element);
      break;
    case components.sidePanel:
      sidePanelFadeIn(element);
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
    case components.modal:
      modalFadeOut(element);
      break;
    case components.sidePanel:
      sidePanelFadeOut(element);
      break;
    default:
      utilsFadeOut(element);
  }
};

function sidePanelFadeIn(element: HTMLElement) {
  const card = element.firstChild as HTMLElement;
  card.style.transform = 'translateX(1rem)';
  card.style.opacity = '0';
  element.style.opacity = '0';

  const timeline = gsap.timeline();

  timeline.to(element, {
    opacity: 1,
    display: 'flex',
  });

  timeline.to(
    card,
    {
      transform: 'translateX(0rem)',
      opacity: 1,
    },
    0
  );
}

export function sidePanelFadeOut(element: HTMLElement) {
  const card = element.firstChild as HTMLElement;
  gsap.to(card, {
    transform: 'translateX(1rem)',
  });

  gsap.to(element, {
    opacity: 0,
    display: 'none',
  });
}

function modalFadeIn(element: HTMLElement) {
  const card = element.firstChild as HTMLElement;
  card.style.transform = 'translateY(1rem)';
  card.style.opacity = '0';
  element.style.opacity = '0';

  const timeline = gsap.timeline();

  timeline.to(element, {
    opacity: 1,
    display: 'flex',
  });

  timeline.to(
    card,
    {
      transform: 'translateY(0rem)',
      opacity: 1,
    },
    0.3
  );
}

export function modalFadeOut(element: HTMLElement) {
  const card = element.firstChild as HTMLElement;
  gsap.to(card, {
    transform: 'translateY(1rem)',
  });

  gsap.to(element, {
    opacity: 0,
    display: 'none',
  });
}

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
  const timeline = gsap.timeline();
  timeline.to(element, {
    transform: 'translateY(-1.5rem)',
    opacity: 0,
  });
  timeline.to(
    element,
    {
      width: '0px',
      height: '0px',
      marginLeft: `-${gap}`,
      padding: '0px',
      onComplete: () => {
        element.style.display = 'none';
      },
    },
    0.2
  );
}
