import { fadeIn, fadeOut } from './fade';

export const startFlagAnimation = (
  element: HTMLElement,
  buttons: NodeList,
  timer = 5000,
  delay = 0
) => {
  const timeout = setTimeout(setTimer, timer);
  setTimeout(setDelay, delay);

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      fadeOut(element);
      clearTimeout(timeout);
    });
  });

  function setDelay() {
    fadeIn(element);
  }

  function setTimer() {
    fadeOut(element);
  }
};

export const startBannerAnimation = (element: HTMLElement, buttons: NodeList, delay = 300) => {
  setTimeout(setDelay, delay);

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      fadeOut(element);
    });
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

export const startModalAnimation = (element: HTMLElement, buttons: NodeList, delay = 0) => {
  setTimeout(setDelay, delay);

  function setDelay() {
    fadeIn(element);
  }

  buttons.forEach((btn) => {
    const button = btn as HTMLAnchorElement;
    button.href = 'javascript:void(0)';
    button.addEventListener('click', function () {
      fadeOut(element);
    });
  });
};

export const startSidePanelAnimation = (element: HTMLElement, buttons: NodeList, delay = 0) => {
  setTimeout(setDelay, delay);

  function setDelay() {
    fadeIn(element);
  }

  buttons.forEach((btn) => {
    const button = btn as HTMLAnchorElement;
    button.href = 'javascript:void(0)';
    button.addEventListener('click', function () {
      fadeOut(element);
    });
  });
};
