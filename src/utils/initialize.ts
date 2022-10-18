import axios from 'axios';

const stagingUrl = 'http://localhost:3000';
const prodUrl = 'https://cdn.jsdelivr.net/npm/@cae-cobalt/cae-webflow-library@1/dist';

export function createComponent(components: Array<string>) {
  axios
    .get(stagingUrl)
    .then((response) => {
      console.log(`Localhost server detected! (${response.config.url})`);
      getScript(components, stagingUrl);
    })
    .catch((error) => {
      console.log(`CDN detected!`);
      getScript(components, prodUrl);
    });

  function getScript(components: Array<string>, baseUrl: string) {
    components.forEach((component) => {
      const url = new URL(`${baseUrl}/components/${component}.js`).toString();
      console.log(`${component} Loaded`);
      appendScript(url);
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

createComponent(components);
