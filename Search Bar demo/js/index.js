import { elements } from './elements.mjs';
import Search from './Search.mjs';
import SearchUI from './SearchUI.mjs';
import Stock from './Stock.mjs';

const state = {};

async function searchStock() {
  const query = elements.searchField.value;

  if (query) {
    state.search = new Search(query);
    const searchUI = new SearchUI();
    searchUI.clearSearchField();

    await searchUI.renderLoader();

    await state.search.getResults();

    console.log(state.search.results);

    searchUI.renderResults(state.search.results);
  }
}

async function getStockDetails(id) {
  console.log(id);
  state.stock = new Stock(id);
  await state.stock.getInfo();

  console.log(state.stock);
}

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchStock();
});

elements.resultsList.addEventListener('click', (e) => {
  e.preventDefault();
  getStockDetails(e.target.innerText);
});
