const stagingUrl = 'http://localhost:3000';
const prodUrl = 'https://cdn.jsdelivr.net/npm/@cae-cobalt/cae-webflow-library@1/dist';

export const initialize = (components: Array<string>) => {
  const request = new XMLHttpRequest();
  request.open('GET', stagingUrl);
  request.send();
  request.onload = () => {
    const isProduction = request.status === 200 || request.status === 301;
    const baseUrl = isProduction ? prodUrl : stagingUrl;
    components.forEach((component) => {
      const url = new URL(`${baseUrl}/components/${component}.js`).toString();
      appendScript(url);
    });
  };
};

function appendScript(url: string) {
  const htmlEl = document.createElement('script');
  htmlEl.src = url;
  htmlEl.type = 'application/javascript';
  htmlEl.defer = true;
  document.body.append(htmlEl);
}
initialize(['tooltip']);
