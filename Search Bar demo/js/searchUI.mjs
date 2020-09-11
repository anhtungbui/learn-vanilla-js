import { elements } from './elements.mjs';

export default class SearchUI {
  renderResults(data) {
    elements.resultsList.innerHTML = '';
    data.forEach((item) => {
      const markup = `
      <div class="list__item">
                <p class="item__symbol">${item['1. symbol']}</p>
                <p class="item__company">${item['2. name']}</p>
      </div>
      `;
      elements.resultsList.insertAdjacentHTML('beforeend', markup);
    });
  }

  clearSearchField() {
    elements.searchField.value = '';
  }
}
