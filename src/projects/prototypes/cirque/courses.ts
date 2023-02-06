import json from './database.json';

const data = json.courses;

const emptyDiv = document.querySelector('[cirque="empty"]') as HTMLElement;
emptyDiv.remove();

function addEmpty(list: Element) {
  const empty = emptyDiv.cloneNode(true) as HTMLElement;
  list.appendChild(empty);
}

const platform = document.querySelector('[cirque="platform"]') as HTMLElement;
const coursePeriod = document.querySelector('[cirque="course_period"]') as HTMLElement;
const tabName = document.querySelector('[cirque="tab-name"]') as HTMLElement;

if (coursePeriod != null) coursePeriod.innerHTML = data[0].training_cycle;
if (platform != null) platform.innerHTML = data[0].platform + ' ' + data[0].training_program;
if (tabName != null) tabName.innerHTML = data[0].training_center;

populateBehaviour([
  data[0].content.top_developmental_ob,
  data[0].content.top_positive_ob,
  data[0].content.ob_by_session,
]);
populateSessions('repeat', data[0].content.top_repeated_objectives);
populateSessions('skipped', data[0].content.top_skipped_objectives);
populateSessions('incomplete', data[0].content.top_incomplete_sessions);
populateSessions('unsatisfactory', data[0].content.top_unsatisfactory_sessions);
populateStudents('problems', data[0].content.problematic_objectives_students_involved);
populateStudents('exceedances', data[0].content.highest_rate_of_exceedances);

function populateStudents(mode: string, data: any) {
  const chart = document.querySelector('[cirque="' + mode + '"]') as HTMLElement;
  const allData = JSON.parse(data);

  const clientFullName = Object.entries(allData.client_fullName);
  const taskGrades = Object.entries(allData.taskGrades_name);

  if (allData.length === 0) {
    chart.remove();
    return;
  }

  const newArray: unknown[][] = [];
  clientFullName.forEach((data, index) => {
    newArray.push([data[1], taskGrades[index][1]]);
  });

  // sort newArray by key
  newArray.sort((a, b) => {
    const keyA = a[0] as number;
    const keyB = b[0] as number;

    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  newArray.reverse();

  const dataCount: number[] = [];
  const dataLabels: string[] = [];

  newArray.forEach((data, index) => {
    if (index > 2) return;
    const count = data[0] as number;
    const label = data[1] as string;

    // remove all "," from label
    const newLabel = label.replace(',', '');

    dataCount.push(count);

    // truncate the label if it is more than 20 characters and add ellipsis and push to dataLabels anyway
    if (newLabel.length > 25) {
      dataLabels.push(newLabel.substring(0, 25) + '...');
    }
    // if the label is less than 20 characters, push it to dataLabels
    else {
      dataLabels.push(newLabel);
    }
  });

  createChart(chart, dataCount.toString(), dataLabels.toString(), 'Sessions');
}

function populateSessions(mode: string, data: any) {
  const element = document.querySelector('[cirque="' + mode + '"]') as HTMLElement;
  const list = element.querySelector('[cirque="list"]') as HTMLElement;
  const item = list.querySelector('[cirque="item"]') as HTMLElement;
  const chart = element.querySelector('[cirque="chart-' + mode + '"]') as HTMLElement;
  const viewAll = element.querySelector('[co-trigger="' + mode + '"]') as HTMLElement;

  item.remove();

  // Remove the view all button if there are less than 3 items
  if (data.length < 3) {
    viewAll.remove();
  } else {
    if (viewAll != null) viewAll.innerHTML = 'View All (' + data.length + ')';
  }

  if (data.length === 0) {
    addEmpty(list);
    chart.remove();
    return;
  }

  const dataCount: number[] = [];
  const dataLabels: string[] = [];

  data.forEach((data: any, index: number) => {
    const hasSubtitle = data.maneuver === undefined ? true : false;
    const title = hasSubtitle ? data.session : data.maneuver;
    const subtitle = data.session;

    dataCount.push(data.count);
    dataLabels.push(title);
    const name = data.name === undefined ? 'sessions' : data.name;

    if (index <= 2) {
      const newItem = item.cloneNode(true) as HTMLElement;
      if (newItem !== undefined) {
        const titleEl = newItem.querySelector('[cirque="title"]') as HTMLElement;
        const countEl = newItem.querySelector('[cirque="count"]') as HTMLElement;
        const subEL = newItem.querySelector('[cirque="subtitle"]') as HTMLElement;

        if (titleEl != null) titleEl.innerHTML = title;
        if (countEl != null) countEl.innerHTML = data.count.toString() + ' ' + name;
        if (subEL != null) subEL.innerHTML = subtitle;
      }
      list.appendChild(newItem);
    }
    createChart(chart, dataCount.toString(), dataLabels.toString(), name);
  });
}

function populateBehaviour(data: any) {
  const behaviors = document.querySelectorAll('[cirque="behaviors"]');

  behaviors.forEach((list, index) => {
    const item = list.querySelector('[cirque="item"]') as HTMLElement;
    item.remove();

    if (data[index].length === 0) {
      addEmpty(list);
      return;
    }

    data[index].forEach((data: any, index: number) => {
      if (index <= 2) {
        const newItem = item.cloneNode(true) as HTMLElement;
        if (newItem !== undefined) {
          const title = newItem.querySelector('[cirque="title"]') as HTMLElement;
          const percent = newItem.querySelector('[cirque="percent"]') as HTMLElement;
          const behaviour = newItem.querySelector('[cirque="comment"]') as HTMLElement;

          if (title != null) title.innerHTML = data.ob;
          if (percent != null) percent.innerHTML = data.percent.toString();
          if (behaviour != null) behaviour.innerHTML = data.behaviour;
        }
        list.appendChild(newItem);
      }
    });
  });
}

getRepeatedObjectives();

function getRepeatedObjectives() {
  const element = document.querySelector('[cirque="repeated"]') as HTMLElement;
  const list = element.querySelector('[cirque="list"]') as HTMLElement;
  const item = list.querySelector('[cirque="item"]') as HTMLElement;
  const allData = data[0].content.repeated_objectives_per_session;

  item.remove();
  if (allData.length > 0) {
    allData.forEach((data) => {
      const newItem = item.cloneNode(true) as HTMLElement;
      if (newItem !== undefined) {
        const session = newItem.querySelector('[cirque="session"]') as HTMLElement;
        if (session != null) session.innerHTML = data.session;
        const percent = newItem.querySelector('[cirque="percent"]') as HTMLElement;
        if (percent != null) percent.innerHTML = (data.percent * 100).toFixed(2).toString();
        const count = newItem.querySelector('[cirque="count"]') as HTMLElement;
        if (count != null) count.innerHTML = data.count.toString();
        const cursor = newItem.querySelector('[cirque="cursor"]') as HTMLElement;
        if (cursor != null) cursor.style.width = (data.percent * 100).toFixed(2).toString() + '%';
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
