import Chart from 'chart.js/auto';

import { colors } from '$global/colors';
import { settings } from '$global/settings';

Chart.defaults.font.family = 'Red Hat Text';

const component = (function () {
  const attributes = settings.attributes.chart;
  const { global } = settings.attributes;

  const chartColors = [
    colors.blue.blue04,
    colors.blue.blue06,
    colors.blue.blue03,
    colors.blue.blue05,
    colors.blue.blue07,
    colors.blue.blue08,
  ];

  return {
    init: function () {
      document.querySelectorAll(attributes.component).forEach((trigger) => {
        const component: HTMLElement = trigger as HTMLElement;

        // if (component.hasAttribute('has-data') === true) {
        //   return;
        // }

        if (component.getAttribute(global.fieldType) === 'bar') {
          createBarChart(component);
        }

        if (component.getAttribute(global.fieldType) === 'doughnut') {
          createDoughnutChart(component);
        }
      });

      function createBarChart(component: HTMLElement) {
        const canvas = createCanvas();
        component.appendChild(canvas);

        const legend = getLegend(component);
        const data = getData(component);
        const labels = getLabels(component);
        const datasets: {
          label: string;
          data: number[];
          borderColor: string;
          backgroundColor: string;
          barThickness: number;
        }[] = [];

        data.forEach((element, index) => {
          datasets.push({
            label: legend[index].trim(),
            data: element.split(',').map((x) => parseFloat(x)),
            borderColor: chartColors[index],
            backgroundColor: chartColors[index],
            barThickness: 16,
          });
        });

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          categoryPercentage: 0.2,
          barPercentage: 1,
          indexAxis: getAxis(component),
          scales: {
            x: {
              beforeUpdate(axis: any) {
                const { labels } = axis.chart.data;
                for (let i = 0; i < labels.length; i++) {
                  const lbl = labels[i];
                  if (typeof lbl === 'string' && lbl.length > 25) {
                    labels[i] = lbl.substring(0, 25); // cutting
                  }
                }
              },
              ticks: {
                font: {
                  size: getAxis(component) === 'x' ? 16 : 12,
                },
              },
              display: true,
              drawOnChartArea: false,
              drawTicks: false,
              grid: {
                display: true,
                color: getXGridColor(component),
              },
            },
            y: {
              beginAtZero: false,
              offset: true,
              grid: {
                color: getYGridColor(component),
                display: true,
              },
              ticks: {
                font: {
                  size: getAxis(component) === 'y' ? 16 : 12,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },

            tooltip: {
              enabled: true,
              /*titleFont: {
                size: 8,
              },*/
              callbacks: {
                label: function (context: any) {
                  const label = context.dataset.label || '';
                  return label;
                },
              },
            },
          },
        };

        createChart(canvas, datasets, labels, options, 'bar');
      }

      function getXGridColor(component: HTMLElement): string {
        const { body } = document;
        const theme = body.hasAttribute('theme') ? body.getAttribute('theme') : 'light';
        const axis = getAxis(component);
        const isXAxis = axis === 'x';

        if (theme === 'dark') {
          return isXAxis ? '#1d2225' : colors.neutral.neutral02;
        }
        return isXAxis ? 'fff' : colors.neutral.neutral09;
      }

      function getYGridColor(component: HTMLElement): string {
        const { body } = document;
        const theme = body.hasAttribute('theme') ? body.getAttribute('theme') : 'light';
        const axis = getAxis(component);
        const isXAxis = axis === 'x';

        if (theme === 'dark') {
          return isXAxis ? colors.neutral.neutral02 : colors.neutral.neutral00;
        }
        return isXAxis ? colors.neutral.neutral02 : 'fff';
      }

      function createDoughnutChart(component: HTMLElement) {
        const canvas = createCanvas();
        component.appendChild(canvas);

        const legend = getLegend(component);
        const data = component.getAttribute('chart-data');

        const datasets: any = [
          {
            backgroundColor: chartColors,
            data: data?.split(',').map((x) => parseFloat(x)),
            borderWidth: 0,
          },
        ];

        const options = {
          responsive: true,
          maintainAspectRatio: false,

          cutout: '80%',
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
          },
          title: {
            display: false,
          },
        };
        createChart(canvas, datasets, legend, options, 'doughnut');
      }
    },
  };
})();

function createCanvas() {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', '100%');
  //canvas.setAttribute('height', '16rem');
  canvas.setAttribute('overflow', 'hidden');
  canvas.setAttribute('style', 'padding-bottom: 0rem;');
  return canvas;
}

function getLegend(component: HTMLElement): string[] {
  return component.getAttribute('chart-legend')?.split(',') as string[];
}

function getData(component: HTMLElement): string[] {
  const data = [];
  for (let i = 0; i < component.attributes.length; i++) {
    if (component.attributes[i].name.startsWith('chart-data')) {
      data.push(component.attributes[i].value);
    }
  }
  return data;
}

function getLabels(component: HTMLElement): string[] {
  const labels = component.getAttribute('chart-label')?.split(',') as string[];
  try {
    return labels.map((s) => s.trim());
  } catch (error) {
    console.log('error', error);
    return [];
  }
}

function getAxis(component: HTMLElement): string {
  return component.getAttribute('chart-axis') as string;
}

function createChart(
  canvas: HTMLCanvasElement,
  data: any,
  labels: string[],
  options: any,
  type: any
) {
  new Chart(canvas, {
    type: type,
    data: {
      labels: labels,
      datasets: data,
    },
    options: options,
  });
}

// Initialize the component
component.init();
