import { version } from './../../package.json';
import { settings, setIsLocal } from './../global/settings';
import { log, logAll } from './log';

const staging = 'http://localhost:3000';
const production = `https://cdn.jsdelivr.net/npm/@cae-cobalt/cae-webflow-library@${version}/dist`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const components = settings.components as Array<string>;

export function init() {
  fetch(staging)
    .then(() => {
      createComponents(components, true);
    })
    .catch(() => {
      createComponents(components, false);
    });

  function createComponents(components: Array<string>, isStaging: boolean) {
    setIsLocal(isStaging);
    const base = isStaging ? staging : production;
    logAll(`[v${version}] ${isStaging ? 'Localhost' : 'CDN'} detected! (${base})`);
    createIndexScript(base);

    Object.entries(components).forEach(([, component]) => {
      if (!componentExist(component)) return;

      const url = `${base}/components/${component}`;
      createScript(`${url}.js`);
      createStyle(`${url}.css`);
      log(component);
    });
  }
  function componentExist(component: string) {
    const comp = document.querySelectorAll(`[co-element="${component}"]`);
    return comp.length === 0 ? false : true;
  }

  function createScript(url: string) {
    const el = document.createElement('script');
    el.src = url;
    el.type = 'text/javascript';
    document.body.append(el);
  }

  function createStyle(url: string) {
    fetch(url).then((response) => {
      if (!response.ok) return;
      const el = document.createElement('link');
      el.rel = 'stylesheet';
      el.type = 'text/css';
      el.href = url;
      document.head.append(el);
    });
  }

  function createIndexScript(base: string) {
    //createScript(`${base}/index.js`);
    createStyle(`${base}/index.css`);
    log('index');
  }
}
