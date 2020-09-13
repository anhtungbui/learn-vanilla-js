export const elements = {
  formAddColors: document.querySelector('.form-add-colors'),
  inputAddColors: document.querySelector('.input-add-colors'),
  colorList: document.getElementById('colors-collection'),
};

export default class View {
  clearInputColors() {
    elements.inputAddColors.value = '';
  }

  addColor(hexCode) {
    const colorContainer = document.createElement('div');
    colorContainer.classList.add('col-3', 'color-container');
    colorContainer.style.background = hexCode;

    const innerMarkup = `
    <button class="color-delete">X</button>
    <div class="color-hex">${hexCode}</div>`;

    colorContainer.innerHTML = innerMarkup;
    elements.colorList.appendChild(colorContainer);
  }

  removeColor(element) {
    element.remove();
  }
}
