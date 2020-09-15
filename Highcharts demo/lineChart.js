const token = config.TOKEN;
const searchForm = document.getElementById('search-form');
const inputField = document.querySelector('.form-control');
const recBtn = document.getElementById('recommendation-btn');
const modalBody = document.querySelector('.modal-body');
const btnCTA = document.querySelector('.btn-cta');

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

  for (let i = 0; i < data.t.length; i++) {
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
    btnCTA.classList.remove('d-none');
  }
}

async function getRecommendation(symbol) {
  modalBody.innerHTML = '';
  // console.log('hello');
  let url = `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${token}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  const total =
    data[0].strongBuy +
    data[0].buy +
    data[0].hold +
    data[0].sell +
    data[0].strongSell;
  const markup = `
  <div class="bg-success">
    ${((data[0].strongBuy / total) * 100).toFixed(2)}% Strong Buy
  </div>
  <div class="bg-success">
    ${((data[0].buy / total) * 100).toFixed(2)}% Buy
  </div>
  <div class="bg-warning">
    ${((data[0].hold / total) * 100).toFixed(2)}% Hold
  </div>
  <div class="bg-danger">
    ${((data[0].sell / total) * 100).toFixed(2)}% Sell
  </div>
  <div class="bg-danger">
    ${((data[0].strongSell / total) * 100).toFixed(2)}% Strong Sell
  </div>
  <p class="font-italic text-center">Source:<a href="https://finnhub.io"> finnhub.io</a></p>
  `;

  modalBody.innerHTML = markup;
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let symbol = inputField.value.toUpperCase();
  getResults(symbol);

  recBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getRecommendation(symbol);
  });
});
