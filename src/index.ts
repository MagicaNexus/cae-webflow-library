import { settings } from '$global/settings';
import '$styles/index.css';
import { init } from '$utils/initialize';

import { version } from './../package.json';

window.Webflow ||= [];
window.Webflow.push(() => {
  init();
  initializeScrollbar();
});

const versionTag = document.querySelector('[co-element="library-version"]');
if (versionTag) versionTag.innerHTML = version;
console.log('version', version);

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
