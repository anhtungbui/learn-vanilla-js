import RandomColor from './model.js';
import View, { elements } from './view.js';

const view = new View();
const model = new RandomColor();
const state = {};

function addColor(numsOfColors) {
  if (numsOfColors) {
    for (let i = 0; i < numsOfColors; i++) {
      state.newColor = model.generateHex();
      model.addColor(state.newColor);
      view.addColor(state.newColor);
    }
  }

  view.clearInputColors();
}

elements.formAddColors.addEventListener('click', (e) => {
  e.preventDefault();
  addColor(elements.inputAddColors.value);
});

elements.colorList.addEventListener('click', (e) => {
  e.preventDefault();
  model.removeColor(e.target.nextElementSibling.innerText);
  view.removeColor(e.target.parentElement);
});

window.onload = () => {
  state.storage = model.checkLocalStorage();
  if (state.storage) {
    model.getStoredItems();
    model.colors.forEach((color) => view.addColor(color));
  }
};
