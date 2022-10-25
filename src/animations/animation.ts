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
