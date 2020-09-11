//localStorage.setItem('name', 'John');
localStorage.removeItem('name');

// Clear all stored values but keep the keys
//localStorage.clear();

const nameDemo = localStorage.getItem('name');
console.log(nameDemo);

const inputTitle = document.getElementById('inputTitle');
const inputAuthor = document.getElementById('inputAuthor');
const inputISBN = document.getElementById('inputISBN');
const btnSubmit = document.getElementById('btnSubmit');
const tbody = document.getElementById('tbody');

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBook(book) {
    const row = document.createElement('tr');

    // Insert columns to new row
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='btn-delete'>X</a></td>
    `;

    // Append the new row to the tbody
    tbody.appendChild(row);
  }

  clearFields() {
    inputTitle.value = '';
    inputAuthor.value = '';
    inputISBN.value = '';
  }

  alertAdded() {
    const addedStatus = document.getElementById('addedStatus');
    addedStatus.classList.remove('d-none');

    // Timeout after 3 secs
    setTimeout(() => {
      addedStatus.classList.add('d-none');
    }, 3000);
  }

  alertError() {
    const errorStatus = document.getElementById('errorStatus');
    errorStatus.classList.remove('d-none');

    // Timeout after 3 secs
    setTimeout(() => {
      errorStatus.classList.add('d-none');
    }, 3000);
  }

  alertRemoved() {
    const removedStatus = document.getElementById('removedStatus');
    removedStatus.classList.remove('d-none');

    // Timeout after 3 secs
    setTimeout(() => {
      removedStatus.classList.add('d-none');
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'btn-delete') {
      target.parentElement.parentElement.remove();
    }
  }
}

class Storage {
  //
  static addBook() {}
}

// Submit Event
btnSubmit.addEventListener('click', () => {
  const book = new Book();
  const ui = new UI();

  if (
    inputTitle.value != '' &&
    inputAuthor.value != '' &&
    inputISBN.value != ''
  ) {
    book.title = inputTitle.value;
    book.author = inputAuthor.value;
    book.isbn = inputISBN.value;

    // Add book to list
    ui.addBook(book);

    // Add book to localStorage
    Storage.addBook(book);

    // Reset input fields
    ui.clearFields();

    // Show success alert message
    ui.alertAdded();
  } else {
    ui.alertError();
  }
});

// Event listener for Deleting a book
tbody.addEventListener('click', (e) => {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.alertRemoved();
});
