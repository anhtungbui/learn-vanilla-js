export default class RandomColor {
  constructor() {
    this.colors = [];
  }

  generateHex() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  }

  addColor(hexCode) {
    this.colors.push(hexCode);
    localStorage.setItem(hexCode, null);
  }

  removeColor(hexCode) {
    let target = this.colors.find((item) => item === hexCode);
    localStorage.removeItem(target);

    const index = this.colors.indexOf(hexCode);
    if (index != -1) {
      this.colors.splice(index, 1);
    }
  }

  checkLocalStorage() {
    return localStorage.length > 0;
  }

  getStoredItems() {
    Object.keys(localStorage).forEach((key) => {
      this.colors.push(key);
    });
  }
}
