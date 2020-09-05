let symbol = '&symbol=GOOG';
const myKey = config.KEY;
const apiKey = '&apikey=' + myKey;
let fetchUrl =
  'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY' +
  symbol +
  apiKey;

let sampleData = {
  name: 'Installation',
  data: [1.2, 2.5, 3.2, 4.6, 5.5],
};

let chartData = {
  year: 0,
  month: 0,
  day: 0,
  categories: [],
};

// fetch('./data.json')
fetch(fetchUrl)
  .then((response) => response.json())
  .then((data) => {
    const historyData = data['Time Series (Daily)'];

    // Get list of dates
    const last100Days = Object.keys(historyData);
    // Get list of historical prices
    const last100DaysPrice = Object.values(historyData);

    // Handle the chart's pointStart to fit UTC format
    const chartPointStart = last100Days[99];
    const year = parseInt(chartPointStart.slice(0, 4));
    const month = parseInt(chartPointStart.slice(5, 7)) - 1;
    const day = parseInt(chartPointStart.slice(-2));

    chartData.year = year;
    chartData.month = month;
    chartData.day = day;
    chartData.categories = last100Days.reverse();

    // console.log(year, month, day);
    // console.log(last100Days);
    // console.log(last100DaysPrice);

    // Handle historical prices list
    const x = last100DaysPrice.map((price) => parseInt(price['4. close']));
    console.log(x.reverse());

    //console.log(data);
    let closingPrice = [];

    for (const date in historyData) {
      closingPrice.unshift(parseInt(historyData[date]['4. close']));
    }

    // console.log(closingPrice);

    renderData = {
      name: 'AMZN',
      data: closingPrice,
    };

    //console.log(renderData.data);

    // console.log(data['Time Series (Daily)']['2020-09-02']['4. close']);
    // console.log(data['Time Series (Daily)']);
    drawChart();
  });

function drawChart() {
  Highcharts.chart('container', {
    chart: {
      type: 'area',
    },
    title: {
      text: 'AMZN Stock Price in the last 100 trading days',
    },

    subtitle: {
      text: 'Source: www.alphavantage.co',
    },

    yAxis: {
      title: {
        text: 'USD',
      },
    },

    xAxis: {
      type: 'datetime',
      categories: chartData.categories,
      // categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      accessibility: {
        rangeDescription: 'Range: 2010 to 2017',
      },
    },

    // legend: {
    //   layout: 'vertical',
    //   align: 'right',
    //   verticalAlign: 'middle',
    // },

    plotOptions: {
      series: {
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get('rgba'),
            ],
          ],
        },
        label: {
          connectorAllowed: false,
        },
        //pointStart: 1,
        // pointStart: Date.UTC(chartData.year, chartData.month, chartData.day),
        // pointInterval: 31 * 3600 * 1000,
        // pointIntervalUnit: 'day',
        // pointStart: 2010,
      },
    },

    series: [renderData],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  });
}
