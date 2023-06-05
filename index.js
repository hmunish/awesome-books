import {
  bookList, addForm, storageDetails, navbar,
} from './modules/dom-elements.js';
import Books from './modules/books.js';

const newBook = new Books(storageDetails);

// Add form submit event
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  newBook.addBook(e.target.bookTitle.value, e.target.bookAuthor.value);
  e.target.bookTitle.value = '';
  e.target.bookAuthor.value = '';
});

// Delete button click event
bookList.addEventListener('click', (e) => {
  newBook.deleteBook(e);
});

// Menu click event
navbar.addEventListener('click', (e) => {
  newBook.toggleSection(e);
});
