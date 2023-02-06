import { colors } from '$global/colors';

import json from './database.json';

const chartColors = [
  colors.blue.blue06,
  colors.blue.blue04,
  colors.blue.blue03,
  colors.blue.blue05,
  colors.blue.blue07,
  colors.blue.blue08,
];

const emptyDiv = document.querySelector('[cirque="empty"]') as HTMLElement;
emptyDiv.remove();

function addEmpty(list: HTMLElement) {
  const empty = emptyDiv.cloneNode(true) as HTMLElement;
  list.appendChild(empty);
}

setSummary();
setFullScreen();

function setSummary() {
  const data = json.homepage_summary[0].summary;
  const summaryList = document.querySelector('[cirque="summary_list"]') as HTMLElement;
  const summaryItem = summaryList.querySelector('[cirque="summary_item"]') as HTMLElement;
  summaryItem.remove();
  if (data.length > 0) {
    data.forEach((center) => {
      const newItem = summaryItem.cloneNode(true) as HTMLElement;
      if (newItem !== undefined) {
        const location = newItem.querySelector('[cirque="location"]');
        if (location != null) location.innerHTML = center.location;
        const courses = newItem.querySelector('[cirque="courses"]');
        if (courses != null) courses.innerHTML = center.courses.toString();
        const students = newItem.querySelector('[cirque="students"]');
        if (students != null) students.innerHTML = center.students.toString();
        const instructors = newItem.querySelector('[cirque="instructors"]');
        if (instructors != null) instructors.innerHTML = center.instructors.toString();
      }

      summaryList.appendChild(newItem);
    });
  } else {
    addEmpty(summaryList);
  }
}

function setFullScreen() {
  const tabs = document.querySelector('[cirque="tabs"]') as HTMLElement;
  const tab = document.querySelector('[cirque="tab"]') as HTMLElement;
  const data = json.homepage_fullscreen;
  const firstFullscreen = data[0];
  const fullscreenTabName = tabs.querySelector('[cirque="summary-tab-title"]') as HTMLElement;
  const fullscreenSession = tab.querySelector('[cirque="sessions"]') as HTMLElement;
  const fullscreenStudent = tab.querySelector('[cirque="students"]') as HTMLElement;

  if (firstFullscreen !== undefined) {
    if (fullscreenSession != null)
      fullscreenSession.innerHTML = firstFullscreen.content.progress.sessions.toString();
    if (fullscreenStudent != null)
      fullscreenStudent.innerHTML = firstFullscreen.content.progress.students.toString();
    if (fullscreenTabName != null) fullscreenTabName.innerHTML = firstFullscreen.training_center;
  }

  setCourses();
  setManeuvers();
  setInstructors();

  function setCourses(): void {
    const { courses } = firstFullscreen.content;
    const courseList = tab.querySelector('[cirque="course_list"]') as HTMLElement;
    const courseItem = courseList.querySelector('[cirque="course_item"]') as HTMLElement;
    courseItem.remove();
    if (courses.length > 0) {
      courses.forEach((course) => {
        const newItem = courseItem.cloneNode(true) as HTMLElement;
        if (newItem !== undefined) {
          const courseName = newItem.querySelector('[cirque="course_name"]') as HTMLElement;
          if (courseName != null) courseName.innerHTML = course.session_name;
          const numOfSessions = newItem.querySelector('[cirque="num_of_sessions"]') as HTMLElement;
          if (numOfSessions != null) numOfSessions.innerHTML = course.num_of_sessions.toString();
          const percentageFailed = newItem.querySelector(
            '[cirque="course_percent_failed"]'
          ) as HTMLElement;
          if (percentageFailed != null)
            percentageFailed.innerHTML = course.percent_failed.toString();
        }
        courseList.appendChild(newItem);
      });
    } else {
      addEmpty(courseList);
    }
  }

  function setManeuvers(): void {
    const { maneuvers } = firstFullscreen.content;
    const maneuverList = tab.querySelector('[cirque="maneuver_list"]') as HTMLElement;
    const maneuverItem = maneuverList.querySelector('[cirque="maneuver_item"]') as HTMLElement;

    maneuverItem.remove();
    maneuvers.forEach((maneuver, index) => {
      if (index > 4) return;
      const newItem = maneuverItem.cloneNode(true) as HTMLElement;
      if (newItem !== undefined) {
        const maneuverName = newItem.querySelector('[cirque="task_name"]') as HTMLElement;
        if (maneuverName != null) maneuverName.innerHTML = maneuver.task_name;
        const averageNumber = newItem.querySelector('[cirque="avg_grade"]') as HTMLElement;
        if (averageNumber != null) averageNumber.innerHTML = maneuver.avg_grade.toString();
      }
      maneuverList.appendChild(newItem);
    });
  }

  function setInstructors(): void {
    const { instructors } = firstFullscreen.content;
    const instructorTotal = tab.querySelector('[cirque="instructor-total"]') as HTMLElement;
    if (instructorTotal != null) instructorTotal.innerHTML = instructors[0].total.toString();

    const instructorList = tab.querySelector('[cirque="instructor_list"]') as HTMLElement;
    const instructorItem = instructorList.querySelector(
      '[cirque="instructor_item"]'
    ) as HTMLElement;

    const instructorChartData = instructors.map((instructor) => instructor.counts);
    const instructorNames = instructors.map((instructor) => instructor.instructor_name);
    const chart = tab.querySelector('[cirque="instructor_chart"]') as HTMLElement;

    chart.setAttribute('chart-data', instructorChartData.toString());
    chart.setAttribute('chart-legend', instructorNames.toString());

    instructorItem.remove();
    instructors.forEach((instructor, index) => {
      if (index > 3) return;
      const newItem = instructorItem.cloneNode(true) as HTMLElement;
      if (newItem !== undefined) {
        const instructorName = newItem.querySelector('[cirque="instructor_name"]') as HTMLElement;
        if (instructorName != null) instructorName.innerHTML = instructor.instructor_name;
        const instructorCount = newItem.querySelector('[cirque="instructor_count"]') as HTMLElement;
        if (instructorCount != null) instructorCount.innerHTML = instructor.counts.toString();
        const instructionColor = newItem.querySelector(
          '[cirque="instructor_color"]'
        ) as HTMLElement;
        if (instructionColor != null) instructionColor.style.backgroundColor = chartColors[index];
      }
      instructorList.appendChild(newItem);
    });
  }
}

/*fullscreenCenters.forEach((center, index) => {
  const newTab = tabs.querySelector('[cirque="tab"]')?.cloneNode(true) as HTMLElement;
  if (newTab !== undefined) {
    const tab = newTab.querySelector('[cirque="tab"]') as HTMLElement;
  }
});*/

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [77.209, 28.6139],
      },
      properties: {
        title: 'newdelhi',
        description: 'New Delhi, India',
      },
      // },
      // {
      //   type: 'Feature',
      //   geometry: {
      //     type: 'Point',
      //     coordinates: [-112.074, 33.448376],
      //   },
      //   properties: {
      //     title: 'phoenix',
      //     description: 'Phoenix, AZ',
      //   },
      // },
      // {
      //   type: 'Feature',
      //   geometry: {
      //     type: 'Point',
      //     coordinates: [-122.335167, 47.608013],
      //   },
      //   properties: {
      //     title: 'seattle',
      //     description: 'Seattle, WA',
      //   },
    },
  ],
};

mapboxgl.accessToken =
  'pk.eyJ1IjoibmlrLWJpYmljaGUiLCJhIjoiY2w0bXVwcnQ3MjRyczNrc3ZmemQ3eHJjZSJ9.d8WNkB3tKYTqmHOpwUxYTQ';
const map = new mapboxgl.Map({
  container: 'map-container',
  style: 'mapbox://styles/nik-bibiche/claiks71n001o15qobrj84ddy', // style URL
  center: [77.863, 26.738], // starting position [lng, lat]
  zoom: 4.19, // starting zoom
});

const size = 100;

// This implements `StyleImageInterface`
// to draw a pulsing dot icon on the map.
const pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  // When the layer is added to the map,
  // get the rendering context for the map canvas.
  onAdd: function () {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');
  },

  // Call once before every frame where the icon will be used.
  render: function () {
    const duration = 1000;
    const t = (performance.now() % duration) / duration;

    const radius = (size / 2) * 0.3;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.context;

    // Draw the outer circle.
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
    context.fillStyle = `rgba(41, 105, 242, ${1 - t})`;
    context.fill();

    // Draw the inner circle.
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = 'rgba(41, 105, 242, 0.5)';
    context.strokeStyle = 'rgba(41, 105, 242, 0.5)';
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();

    // Update this image's data with data from the canvas.
    this.data = context.getImageData(0, 0, this.width, this.height).data;

    // Continuously repaint the map, resulting
    // in the smooth animation of the dot.
    map.triggerRepaint();
    map.resize();

    // Return `true` to let the map know that the image was updated.
    return true;
  },
};

map.on('load', () => {
  map.addImage('pulsing-dot', pulsingDot);

  map.addSource('point', {
    type: 'geojson',
    data: geojson,
  });
  map.addLayer({
    id: 'pulsing-dot-id',
    type: 'symbol',
    source: 'point',
    layout: {
      'icon-image': 'pulsing-dot',
      'text-field': ['get', 'description'],
      'text-variable-anchor': ['left'],
      'text-radial-offset': 1,
      'text-justify': 'auto',
    },
  });
  map.on('click', 'pulsing-dot-id', (e) => {
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    $('#cirque-mapbox').trigger('click');
    $('#tab-link_cirque-db-' + e.features[0].properties.title).trigger('click');
    $('#tab-link_cirque-co-' + e.features[0].properties.title).trigger('click');
    e.preventDefault();
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'pulsing-dot-id', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'pulsing-dot-id', () => {
    map.getCanvas().style.cursor = '';
  });
});
