import { settings } from '$global/settings';
import '$styles/index.css';

function initializeScrollbar() {
  // Get all the elements with the style overflow: auto
  const elements = document.querySelectorAll('*');

  // Loop through the elements
  elements.forEach((element) => {
    const style = getComputedStyle(element);
    const overflow = style.getPropertyValue('overflow');

    if (overflow === 'auto') {
      element.classList.add(settings.classes.scrollbar);
    }
  });
}

//Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initializeScrollbar();
});
