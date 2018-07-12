const os = require('os');
const { remote } = require('electron');
let chart = null;
let bar = null;
let lastMeasureTimes = [];


let freeRam = os.freemem();
let totalRam = os.totalmem();


function setLastMeasureTimes(cpus) {
  for (let i = 0; i < cpus.length; i++) {
    lastMeasureTimes[i] = getCpuTimes(cpus[i]);
  }
}

function getDatasets() {
  const datasets = [];
  const cpus = os.cpus();

  for (let i = 0; i < cpus.length; i++) {
    const cpu = cpus[i];
    const cpuData = {
      data: getCpuTimes(cpu),
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(70, 30, 190, 1)',
        'rgba(160, 50, 205, 1)',
        'rgba(255, 206, 86, 1)'
      ]
    };
    datasets.push(cpuData)
  }
  testCpus = os.cpus();
  return datasets;
}

function updateDatasets() {
  const cpus = os.cpus();
  for (let i = 0; i < cpus.length; i++) {
    const cpu = cpus[i];
    chart.data.datasets[i].data = getCpuTimes(cpu);
    chart.data.datasets[i].data[0] -= lastMeasureTimes[i][0];
    chart.data.datasets[i].data[1] -= lastMeasureTimes[i][1];
    chart.data.datasets[i].data[2] -= lastMeasureTimes[i][2];
    chart.data.datasets[i].data[3] -= lastMeasureTimes[i][3];
    chart.data.datasets[i].data[4] -= lastMeasureTimes[i][4];
  }
  bar.data.datasets[0].data[0] = ((os.totalmem()/1024)/1024)/1024;
  bar.data.datasets[0].data[1] = (((os.totalmem()-os.freemem())/1024)/1024)/1024;
  chart.update();
  setLastMeasureTimes(cpus);
}

function getCpuTimes(cpu) {
  return [
    cpu.times.user,
    cpu.times.sys,
    cpu.times.idle,
    cpu.times.nice,
    cpu.times.irq,
  ];
}

function drawChart() {
  chart = new Chart($('.chart'), {
    type: 'doughnut',
    data: {
      labels: [
        'User Time (ms)',
        'System Time (ms)',
        'Idle Time (ms)',
          'Irq Time (ms)',
          'Nice time (ms)'
      ],
      datasets: getDatasets()
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'CPU Activity',
        fontColor: 'rgb(250, 250, 250)',
        fontSize: 16
      },
      legend: {
        display: true,
        labels: {
          fontColor: 'rgb(250, 250, 250)',
          fontSize: 12
        }
      }
    }
  });

    bar = new Chart($('#memory-usage'), {
        type: 'bar',
        data: {
            labels: ["Total Memory", "Memory Usage"],
            datasets: [{
                label: 'Gigabytes',
                data: [((totalRam/1024)/1024)/1024, (((totalRam-freeRam)/1024)/1024)/1024],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

  setInterval(updateDatasets, 1000);
}

$('document').ready(() => {
  setLastMeasureTimes(os.cpus());
  drawChart();
});
