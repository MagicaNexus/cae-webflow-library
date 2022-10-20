import { version } from './../../package.json';
import { settings } from './../global/settings';

const staging = 'http://localhost:3000';
const production = `https://cdn.jsdelivr.net/npm/@cae-cobalt/cae-webflow-library@${version}/dist`;

function createComponents(components: Array<string>) {
  fetch(staging)
    .then(() => {
      createComponents(components, true);
    })
    .catch(() => {
      createComponents(components, false);
    });

  function createComponents(components: Array<string>, isStaging: boolean) {
    const base = isStaging ? staging : production;
    console.log(`[v${version}] ${isStaging ? 'Localhost' : 'CDN'} detected! (${base})`);

    Object.entries(components).forEach(([, component]) => {
      if (!exist(component)) return;

      const source = new URL(`${base}/components/${component}.js`).toString();
      document.body.append(getScriptTag(source));

      if (isStaging) console.log(`${component} loaded`);
    });
  }

  function getScriptTag(url: string) {
    const htmlEl = document.createElement('script');
    htmlEl.defer = true;
    htmlEl.src = url;
    htmlEl.type = 'application/javascript';
    return htmlEl;
  }

  function exist(component: string) {
    const comp = document.querySelectorAll(`[co-element="${component}"]`);
    return comp.length === 0 ? false : true;
  }
}

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
createComponents(settings.components);

//Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initializeScrollbar();
});
