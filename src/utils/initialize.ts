import { version } from './../../package.json';
import { settings } from './../global/settings';

const stagingUrl = 'http://localhost:3000';
const prodUrl = `https://cdn.jsdelivr.net/npm/@cae-cobalt/cae-webflow-library@${version}/dist`;

function createComponents(components: Array<string>) {
  fetch(stagingUrl)
    .then((response) => {
      console.log(`[v${version}] Localhost server detected! (${response.url})`);
      getScript(components, stagingUrl, true);
    })
    .catch((error) => {
      console.log(`[v${version}] CDN detected!`);
      getScript(components, prodUrl, false);
    });

  function getScript(components: Array<string>, baseUrl: string, isStaging: boolean) {
    Object.entries(components).forEach(([, component]) => {
      const url = new URL(`${baseUrl}/components/${component}.js`).toString();
      if (!exist(component)) return;
      appendScript(url);
      if (isStaging) console.log(`${component} loaded`);
    });
  }

  function appendScript(url: string) {
    const htmlEl = document.createElement('script');
    htmlEl.defer = true;
    htmlEl.src = url;
    htmlEl.type = 'application/javascript';
    document.body.append(htmlEl);
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
    // Get the computed style of the element
    const style = getComputedStyle(element);
    // Get the overflow property
    const overflow = style.getPropertyValue('overflow');
    // If the overflow property is auto
    if (overflow === 'auto') {
      // Add the class to the element
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
