// import { fetch } from "undici-types";

let ctx = document.getElementById('myChart');
let mychart;
let jsondata;

fetch('http://127.0.0.1:3000/dbz')

  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    jsondata = data;
    createChart(data, 'bar');
  })

function setChartType(type) {
  mychart.destroy();
  createChart(jsondata, type)
}
function createChart(data, type) {

  mychart = new Chart(ctx, {
    type: type,
    data: {
      labels: data.map(c => c.name),
      datasets: [{
        label: 'Ki',
        data: data.map(c => c.ki.replaceAll('.', '')),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true

        }
      }
    }
  });
}