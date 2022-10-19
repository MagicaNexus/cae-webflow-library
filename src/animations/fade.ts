export const fadeOut = (element: HTMLElement, gap = '0px') => {
  const parent: ParentNode | null = element.parentNode;
  const wrapper: HTMLDivElement = document.createElement('div');
  if (!parent) return;

  wrapper.style.width = element.offsetWidth.toString() + 'px';
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
    wrapper.style.width = '0rem';
    wrapper.style.marginLeft = `-${gap}`;
  }, 200);

  setTimeout(() => {
    wrapper.style.display = 'none';
  }, 500);
};
