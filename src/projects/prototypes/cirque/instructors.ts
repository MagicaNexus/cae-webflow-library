import json from './database.json';

const data = json.instructors;

const emptyDiv = document.querySelector('[cirque="empty"]') as HTMLElement;
emptyDiv.remove();

function addEmpty(list: Element) {
  const empty = emptyDiv.cloneNode(true) as HTMLElement;
  list.appendChild(empty);
}

const platform = document.querySelector('[cirque="platform"]') as HTMLElement;
const coursePeriod = document.querySelector('[cirque="course_period"]') as HTMLElement;
const tabName = document.querySelector('[cirque="tab-name"]') as HTMLElement;
const pilotNumber = document.querySelector('[cirque="student-number"]') as HTMLElement;

if (pilotNumber != null) pilotNumber.innerHTML = data[0].content.pilots_failed_sessions.toString();

if (coursePeriod != null) coursePeriod.innerHTML = data[0].training_cycle;
if (platform != null) platform.innerHTML = data[0].platform + ' ' + data[0].training_program;
if (tabName != null) tabName.innerHTML = data[0].training_center;

populateSessions('most-repeat', data[0].content.most_in_session_repeats);
populateSessions('exceedances', data[0].content.exceedance_per_instructor);
populateSessions('repeats', data[0].content.repeats_per_instructor);

function populateSessions(mode: string, data: any) {
  const element = document.querySelector('[cirque="' + mode + '"]') as HTMLElement;
  const list = element.querySelector('[cirque="list"]') as HTMLElement;
  const item = list.querySelector('[cirque="item"]') as HTMLElement;
  const chart = element.querySelector('[cirque="chart-' + mode + '"]') as HTMLElement;

  item.remove();

  if (data.length === 0) {
    addEmpty(list);
    chart.remove();
    return;
  }

  const dataCount: number[] = [];
  const dataLabels: string[] = [];

  data.forEach((data: any, index: number) => {
    const hasSubtitle = data.instructor === undefined ? true : false;
    const title = hasSubtitle ? data.maneuver : data.instructor;
    const subtitle = data.maneuver;

    if (mode === 'most-repeat' || mode === 'repeats') {
      dataCount.push(data.repeats);
    }
    if (mode === 'exceedances') {
      dataCount.push(data.exceedance);
    }
    dataLabels.push(title);
    const name = mode === ('most-repeat' || 'repeats') ? 'repeats' : 'exceedances';

    if (index <= 2) {
      const newItem = item.cloneNode(true) as HTMLElement;
      if (newItem !== undefined) {
        const titleEl = newItem.querySelector('[cirque="title"]') as HTMLElement;
        const countEl = newItem.querySelector('[cirque="count"]') as HTMLElement;
        const subEL = newItem.querySelector('[cirque="subtitle"]') as HTMLElement;

        if (titleEl != null) titleEl.innerHTML = title;
        if (mode === 'most-repeat' || mode === 'repeats') {
          if (countEl != null) countEl.innerHTML = data.repeats.toString() + ' repeats';
        }
        if (mode === 'exceedances') {
          if (countEl != null) countEl.innerHTML = data.exceedance.toString() + ' exceedances';
        }

        if (subEL != null) subEL.innerHTML = subtitle;
      }
      list.appendChild(newItem);
    }
    console.log(dataCount, dataLabels);
    createChart(chart, dataCount.toString(), dataLabels.toString(), name);
  });
}

getRepeatedObjectives('without-exceedance', data[0].content.maneuver_wo_exceedance_w_fail);
getRepeatedObjectives('with-exceedance', data[0].content.maneuver_w_exceedance_wo_fail);

function getRepeatedObjectives(mode: string, allData: any) {
  const element = document.querySelector('[cirque="' + mode + '"]') as HTMLElement;
  const list = element.querySelector('[cirque="list"]') as HTMLElement;
  const item = list.querySelector('[cirque="item"]') as HTMLElement;

  item.remove();
  if (allData.length > 0) {
    allData.forEach((data: any) => {
      const newItem = item.cloneNode(true) as HTMLElement;
      if (newItem !== undefined) {
        const session = newItem.querySelector('[cirque="session"]') as HTMLElement;
        if (session != null) session.innerHTML = data.maneuver;
        const count = newItem.querySelector('[cirque="count"]') as HTMLElement;
        if (count != null) count.innerHTML = data.counts.toString();
        const cursor = newItem.querySelector('[cirque="cursor"]') as HTMLElement;
        if (cursor != null) cursor.style.width = data.counts.toFixed(2).toString() + '%';
      }
      list.appendChild(newItem);
    });
  } else addEmpty(list);
}

function createChart(chart: HTMLElement, data: string, label: string, legend: string) {
  if (data == null || label == null || legend == null) {
    addEmpty(chart);
    return;
  }
  if (chart != null) {
    chart.setAttribute('chart-data', data);
    chart.setAttribute('chart-label', label.toString());
    chart.setAttribute('chart-legend', legend);
  }
}
