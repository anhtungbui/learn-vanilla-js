import RandomColor from './model.js';
import View, { elements } from './view.js';

const view = new View();
const model = new RandomColor();
const state = {};

function addColor(numsOfColors) {
  if (numsOfColors) {
    for (let i = 0; i < numsOfColors; i++) {
      state.newColor = model.generateHex();
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
  view.removeColor(e.target.parentElement);
});

// Always generate 3 randoms color as soon as the browser loads the script
window.onload = () => {
  addColor(3);
};
