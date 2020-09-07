let apikey = config.KEY;
const searchForm = document.getElementById('searchForm');
const searchField = document.getElementById('searchField');
const infoCompany = document.getElementById('infoCompany');
const infoSymbol = document.getElementById('infoSymbol');
const infoPrice = document.getElementById('infoPrice');
const infoCard = document.querySelector('.info-container');
const infoTabs = document.querySelectorAll('.info-tab');
const alertWarning = document.querySelector('.alert-warning');

class Stock {
  constructor(id) {
    this.id = id.toUpperCase();
    this.price = 0;
    this.historicalData100 = [];
    this.historicalData30 = [];
    this.historicalData10 = [];
  }
  getFetchURL(fnQuery) {
    const query = 'https://www.alphavantage.co/query?function=';
    const fetchURL =
      query + fnQuery + '&symbol=' + this.id + '&apikey=' + apikey;
    return fetchURL;
  }

  getCompanyInfo() {
    const fetchURL = this.getFetchURL('OVERVIEW');
    // console.log(fetchURL);

    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        infoCompany.innerText = data.Name;
      })
      .catch((error) => console.log(error));
  }

  getPrice() {
    const fetchURL = this.getFetchURL('TIME_SERIES_DAILY');
    // console.log(fetchURL);

    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        const historyData = data['Time Series (Daily)'];

        // Get list of dates
        // Not yet used due to Saturday-Sunday break problem...
        const last100Days = Object.keys(historyData);

        // Get list of historical prices
        const last100DaysPrice = Object.values(historyData);

        // Handle historical prices list
        const historicalPrice = last100DaysPrice.map((price) =>
          parseFloat(price['4. close'])
        );

        // Set current price
        this.price = historicalPrice[0];

        // Set historicalData100
        this.historicalData100 = Array.from(historicalPrice);
        this.historicalData30 = this.historicalData100.slice(0, 30);
        this.historicalData10 = this.historicalData100.slice(0, 10);

        // console.log(this.historicalData);

        const renderData = {
          name: this.id,
          data: this.historicalData100.reverse(),
        };

        const renderData30 = {
          name: this.id,
          data: this.historicalData30.reverse(),
        };

        const renderData10 = {
          name: this.id,
          data: this.historicalData10.reverse(),
        };

        ui.showInfo(this);

        // Render the chart with 100 days price series by default
        ui.renderChart(renderData);

        infoTabs[2].addEventListener('click', (e) => {
          ui.renderChart(renderData);
          e.target.classList.add('tab-active');
          e.target.previousElementSibling.classList.remove('tab-active');
          e.target.previousElementSibling.previousElementSibling.classList.remove(
            'tab-active'
          );
        });

        infoTabs[1].addEventListener('click', (e) => {
          // console.log('infotab');
          ui.renderChart(renderData30);
          // console.log(e.target);
          e.target.classList.add('tab-active');
          e.target.nextElementSibling.classList.remove('tab-active');
          e.target.previousElementSibling.classList.remove('tab-active');
        });

        infoTabs[0].addEventListener('click', (e) => {
          ui.renderChart(renderData10);
          e.target.classList.add('tab-active');
          e.target.nextElementSibling.classList.remove('tab-active');
          e.target.nextElementSibling.nextElementSibling.classList.remove(
            'tab-active'
          );
        });
      })
      .catch((error) => {
        console.log(error);
        ui.showAlertWarning();
      });
  }
}

class UI {
  renderChart(renderData) {
    const chart = new Chart(renderData);
    chart.draw();
  }

  showInfo(stock) {
    // console.log(stock.id);
    $('.info-container').fadeOut();
    $('.info-container').fadeIn();
    infoCard.style.display = 'block';

    infoSymbol.innerText = stock.id;
    infoPrice.innerText = stock.price;

    /* How data series in the chart should be
    let sampleData = {
      name: 'AMZN',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
    };
    */
  }

  showAlertWarning() {
    setTimeout(() => {
      alertWarning.style.display = 'none';
    }, 5000);
    alertWarning.style.display = 'block';
  }

  resetSearchField() {
    searchField.value = '';
  }
}

class Chart {
  constructor(seriesData) {
    this.seriesData = seriesData;
  }
  draw() {
    Highcharts.chart('chartContainer', {
      title: {
        text: '',
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
        // accessibility: {
        //   rangeDescription: 'Range: 2010 to 2017',
        // },
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 1,
        },
      },

      series: [this.seriesData],

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
}
/** SEARCH FORM */
const ui = new UI();

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const stock = new Stock(searchField.value);
  stock.getCompanyInfo();
  stock.getPrice();
  ui.resetSearchField();
});
