import http from 'http';

const stagingUrl = 'http://localhost:3000';
const prodUrl = 'https://cdn.jsdelivr.net/npm/@cae-cobalt/cae-webflow-library@1/dist';

export const initialize = (components: Array<string>) => {
  http.get({ host: stagingUrl }, function (res) {
    const isStaging = res.statusCode === 200 || res.statusCode === 301;
    const baseUrl = isStaging ? stagingUrl : prodUrl;
    components.forEach((component) => {
      const url = new URL(`${baseUrl}/components/${component}.js`).toString();
      appendScript(url);
    });
  });
};

function appendScript(url: string) {
  const htmlEl = document.createElement('script');
  htmlEl.src = url;
  htmlEl.type = 'application/javascript';
  htmlEl.defer = true;
  document.body.append(htmlEl);
}

initialize(['tooltip']);
