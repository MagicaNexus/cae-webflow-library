import { settings } from '$global/settings';
import '$styles/index.css';
import { init } from '$utils/initialize';

import { version } from './../package.json';

init();
initializeScrollbar();

const versionTag = document.querySelector('[co-element="library-version"]');
if (versionTag) versionTag.innerHTML = version;

const copyrightYEar = document.querySelector('[co-element="copyright-year"]');
if (copyrightYEar) copyrightYEar.innerHTML = new Date().getFullYear().toString();

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
