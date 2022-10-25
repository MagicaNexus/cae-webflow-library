import { fadeIn, fadeOut } from './fade';

export const startFlagAnimation = (
  element: HTMLElement,
  button: HTMLElement,
  timer = 5000,
  delay = 0
) => {
  const timeout = setTimeout(setTimer, timer);
  setTimeout(setDelay, delay);

  button.addEventListener('click', function () {
    fadeOut(element);
    clearTimeout(timeout);
  });

  function setDelay() {
    fadeIn(element);
  }

  function setTimer() {
    fadeOut(element);
  }
};

export const startBannerAnimation = (element: HTMLElement, button: HTMLElement, delay = 300) => {
  setTimeout(setDelay, delay);

  button.addEventListener('click', function () {
    fadeOut(element);
  });

  function setDelay() {
    fadeIn(element);
  }
};

export const startChipAnimation = (element: HTMLElement, button: HTMLElement, gap: string) => {
  button.addEventListener('click', function () {
    fadeOut(element, gap);
  });
};
