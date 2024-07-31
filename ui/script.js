// import { fetch } from "undici-types";

let ctx = document.getElementById('myChart');

fetch('http://127.0.0.1:3000/dbz')

  .then(function (response) {
    if (response.ok) {

      return response.json();

    }
  })
  .then(function (data) {
    console.log(data)
    createChart(data, 'bar');
  })


function createChart(data, type) {
  new Chart(ctx, {
    type: type,
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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