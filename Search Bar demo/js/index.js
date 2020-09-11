import Search from './Search.mjs';
import SearchUI from './SearchUI.mjs';
import { elements } from './elements.mjs';

const state = {};

async function searchStock() {
  state.search = new Search(elements.searchField.value);
  await state.search.getResults();

  console.log(state.search.results);

  const searchUI = new SearchUI();
  searchUI.renderResults(state.search.results);
  searchUI.clearSearchField();
}

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchStock();
});
