import json from './database.json';

const data = json.students;

const emptyDiv = document.querySelector('[cirque="empty"]') as HTMLElement;
emptyDiv.remove();

function addEmpty(list: Element) {
  const empty = emptyDiv.cloneNode(true) as HTMLElement;
  list.appendChild(empty);
}

const platform = document.querySelector('[cirque="platform"]') as HTMLElement;
const coursePeriod = document.querySelector('[cirque="course_period"]') as HTMLElement;
const tabName = document.querySelector('[cirque="tab-name"]') as HTMLElement;

const studentNumber = document.querySelector('[cirque="student-number"]') as HTMLElement;

if (studentNumber != null)
  studentNumber.innerHTML = json.homepage_summary[0].summary[0].students.toString();

if (coursePeriod != null) coursePeriod.innerHTML = data[0].training_cycle;
if (platform != null) platform.innerHTML = data[0].platform + ' ' + data[0].training_program;
if (tabName != null) tabName.innerHTML = data[0].training_center;

const telemetryData = JSON.parse(data[0].content.challenging_maneuvers_telemetry);
const gradingData = JSON.parse(data[0].content.challenging_maneuvers_grading);
const competencyData = JSON.parse(data[0].content.challenging_competencies);

populateStudents('telemetry', telemetryData, telemetryData.client_fullName, telemetryData.Maneuver);
populateStudents(
  'competencies',
  competencyData,
  competencyData.client_fullName,
  competencyData.Competency
);
populateStudents('grading', gradingData, gradingData.client_fullName, gradingData.taskGrades_name);

function populateStudents(mode: string, data: any, clientData: any, gradeData: any) {
  const chart = document.querySelector('[cirque="' + mode + '"]') as HTMLElement;

  const client = Object.entries(clientData);
  const grade = Object.entries(gradeData);

  if (data.length === 0) {
    chart.remove();
    return;
  }

  const newArray: unknown[][] = [];
  client.forEach((data, index) => {
    newArray.push([data[1], grade[index][1]]);
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
    if (newLabel.length > 1000) {
      dataLabels.push(newLabel.substring(0, 25) + '...');
    }
    // if the label is less than 20 characters, push it to dataLabels
    else {
      dataLabels.push(newLabel);
    }
  });
  createChart(chart, dataCount.toString(), dataLabels.toString(), 'Sessions');
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
