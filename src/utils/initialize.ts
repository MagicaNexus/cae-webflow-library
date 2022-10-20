import { version } from './../../package.json';
import { settings, setIsLocal } from './../global/settings';
import { log } from './log';

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
    setIsLocal(isStaging);
    const base = isStaging ? staging : production;
    log(`[v${version}] ${isStaging ? 'Localhost' : 'CDN'} detected! (${base})`);

    Object.entries(components).forEach(([, component]) => {
      if (!exist(component)) return;

      const source = new URL(`${base}/components/${component}.js`).toString();
      document.body.append(getScriptTag(source));
      log(component);
    });

    createIndexScript(base);
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

  function createIndexScript(base: string) {
    const source = new URL(`${base}/index.js`).toString();
    document.body.append(getScriptTag(source));
    log('index');
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
createComponents(settings.components);
