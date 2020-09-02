/*
 - Try to create the 3 classes Stock, Bought Stock and Portfolio in JS
 - Create one file
 - Time Limit: 30 Mins
BONUS:
 - Create a constructor, that adds a BoughtStock to the Portfolio once a BoughtStock is created

  - Write the code that is needed to update all revant values in Protfolio (cash, balance) once a bought stock is created
 - You can use the prepared methods (addBoughtStock, recaculateBalance) or you can find a solution of your own
 - The result shoud be a reduced cash value on the portfolio, the balance should be the result of cash + accumulated value of the bought stocks
*/

class Stock {
  constructor(id) {
    this.id = id;
    this.price = 300;
    this.historyPrice = [];
  }
}

class BoughtStock extends Stock {
  constructor(id, quantity) {
    super(id);
    this.boughtAt = this.price;
    this.quantity = quantity;
    PORTFOLIO.addBoughtStock(this);
    PORTFOLIO.updateCash(this);
    PORTFOLIO.updateBalance();
  }
}

class Portfolio {
  constructor() {
    this.stocks = [];
    this.cash = 10000;
    this.balance = 10000;
  }

  addBoughtStock(boughtStock) {
    this.stocks.push(boughtStock);
  }

  updateCash(boughtStock) {
    let spent = boughtStock.boughtAt * boughtStock.quantity;
    this.cash = this.cash - spent;
  }

  updateBalance() {
    // Calculate the accumulated value of the bought stocks
    let accumulated = 0;
    this.stocks.forEach((boughtStock) => {
      accumulated += boughtStock.boughtAt * boughtStock.quantity;
    });

    // Using the reduce() method
    let accumulated2 = this.stocks.reduce(
      (acc, boughtStock) => acc + boughtStock.boughtAt * boughtStock.quantity,
      0
    );

    // Balance = Cash available + Accumulated value of all purchased stocks
    //this.balance = this.cash + accumulated;
    this.balance = this.cash + accumulated2;
  }
}

const PORTFOLIO = new Portfolio();

console.log('** Bought AAPL 20 Stock at $300 **');
let apple = new BoughtStock('aapl', 20);
console.log(PORTFOLIO.stocks);
console.log('Cash: ' + PORTFOLIO.cash);
console.log('Balance: ' + PORTFOLIO.balance);

let microsoft = new BoughtStock('msft', 10);
console.log('** Bought MSFT 10 Stock at $300 **');
console.log('Cash: ' + PORTFOLIO.cash);
console.log('Balance: ' + PORTFOLIO.balance);
