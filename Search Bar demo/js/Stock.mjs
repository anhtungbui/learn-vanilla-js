import key from './config.js';

export default class Stock {
  constructor(id) {
    this.id = id;
  }

  async getInfo() {
    try {
      // const demoUrl =
      //   'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo';
      // const response = await fetch(demoUrl);

      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.id}&apikey=${key}`
      );
      const data = await response.json();
      this.info = data;
    } catch (error) {
      alert(error);
    }
  }
}
