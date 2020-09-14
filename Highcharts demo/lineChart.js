const token = config.TOKEN;
const searchForm = document.getElementById('search-form');
const inputField = document.querySelector('.form-control');

async function prepareData(symbol) {
  /* How the data series object should look like
  const sampleData = [
    [1577923200, 75.087501525879],
    [1578009600, 74.357498168945],
  ];
  */

  const today = new Date().getTime();
  let url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=1577833200&to=${today}&token=${token}`;
  const res = await fetch(url);
  const data = await res.json();

  // const res = await fetch('data.json');
  // const data = await res.json();
  const chartData = [];

  for (let i = 0; i < 177; i++) {
    chartData.push([data.t[i] * 1000, data.c[i]]);
  }

  return { symbol, chartData };
}

async function drawChart(symbol) {
  const data = await prepareData(symbol);

  Highcharts.stockChart('container', {
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: `${data.symbol} Historical Stock Price`,
    },

    series: [
      {
        name: data.symbol,
        data: data.chartData,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  });
}

async function getResults(symbol) {
  if (symbol) {
    await drawChart(symbol);
    inputField.value = '';
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  getResults(inputField.value.toUpperCase());
});
