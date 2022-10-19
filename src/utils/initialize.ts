import { version } from './../../package.json';

const stagingUrl = 'http://localhost:3000';
const prodUrl = 'https://cdn.jsdelivr.net/npm/@cae-cobalt/cae-webflow-library@1/dist';

export function createComponents(components: Array<string>) {
  fetch(stagingUrl)
    .then((response) => {
      console.log(`[v${version}] Localhost server detected! (${response.url})`);
      getScript(components, stagingUrl, true);
    })
    .catch(() => {
      console.log(`[v${version}] CDN detected!`);
      getScript(components, prodUrl, false);
    });

  function getScript(components: Array<string>, baseUrl: string, isStaging: boolean) {
    components.forEach((component) => {
      const url = new URL(`${baseUrl}/components/${component}.js`).toString();

      appendScript(url);
      if (isStaging) console.log(`${component} Loaded`);
    });
  }

  function appendScript(url: string) {
    const htmlEl = document.createElement('script');
    htmlEl.src = url;
    htmlEl.type = 'application/javascript';
    htmlEl.defer = true;
    document.body.append(htmlEl);
  }
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
createComponents(components);
