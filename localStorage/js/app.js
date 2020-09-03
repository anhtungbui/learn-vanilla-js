const firstNum = document.getElementById('firstNum');
const secondNum = document.getElementById('secondNum');
const thirdNum = document.getElementById('thirdNum');
const btnAdd = document.querySelector('.btn-add');
const btnClear = document.querySelector('.btn-clear');
const alertMissing = document.getElementById('alert-missing');
const alertSuccess = document.getElementById('alert-success');
const alertReload = document.getElementById('alert-reload');

if (localStorage.length != 0) {
  btnAdd.disabled = true;
  btnClear.disabled = false;

  firstNum.value = localStorage.getItem('firstNum');
  secondNum.value = localStorage.getItem('secondNum');
  thirdNum.value = localStorage.getItem('thirdNum');
}

btnAdd.addEventListener('click', () => {
  if (firstNum.value != '' && secondNum.value !== '' && thirdNum.value != '') {
    set('firstNum', firstNum.value);
    set('secondNum', secondNum.value);
    set('thirdNum', thirdNum.value);

    btnAdd.disabled = true;

    alertSuccess.classList.remove('d-none');
    setTimeout(() => {
      alertSuccess.classList.add('d-none');
    }, 3000);

    setTimeout(() => {
      alertReload.classList.remove('d-none');
    }, 3000);
  } else {
    alertMissing.classList.remove('d-none');
    setTimeout(() => {
      alertMissing.classList.add('d-none');
    }, 3000);
  }
});

btnClear.addEventListener('click', () => {
  clear();
  btnAdd.disabled = false;
  btnClear.disabled = true;
});

function set(key, value) {
  localStorage.setItem(key, value);
}

function clear() {
  localStorage.clear();
}
