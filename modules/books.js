import {
  bookList, storageDetails, timeText, bookSection, addBookSection, contactSection,
} from './dom-elements.js';

import { DateTime } from '../node_modules/luxon/src/luxon.js';

export default class Books {
  constructor(storedBooks) {
    this.sections = [bookSection, addBookSection, contactSection];
    this.bookDetails = [];

    // Displaying current time on page
    timeText.textContent = DateTime.now().toLocaleString(DateTime.DATETIME_MED);

    // Loading books if exists in local storage
    if (storedBooks !== null) {
      this.bookDetails = JSON.parse(storageDetails);
      this.displayBooks();
    }
  }

    // Display books function
    displayBooks = () => {
      let liHtml = '';
      this.bookDetails.forEach((e) => {
        liHtml += `<li class="books">"${e.bookName}" by ${e.author}<button class="delete">Remove</button></li>`;
      });
      bookList.innerHTML = liHtml;
    }

    // Add books function
    addBook = (bookName, author) => {
      const book = {};
      book.bookName = bookName;
      book.author = author;
      this.bookDetails.push(book);
      localStorage.setItem('books', JSON.stringify(this.bookDetails));
      const liHtml = `<li class="books">"${bookName}" by ${author}<button class="delete">Remove</button></li>`;
      bookList.insertAdjacentHTML('beforeend', liHtml);
    }

    // Delete book function
    deleteBook = (e) => {
      const { target } = e;
      const parent = e.target.parentElement;
      if (target.classList.contains('delete')) {
        const bookName = parent.childNodes[0].textContent;
        // Removing book from the array
        this.bookDetails = this.bookDetails.filter((e) => bookName !== `"${e.bookName}" by ${e.author}`);
        // Updating local storage
        localStorage.setItem('books', JSON.stringify(this.bookDetails));
        // Removing book li from the book ul
        parent.remove();
      }
    }

    // Toggling sections function

    toggleSection = (e) => {
      if (e.target.tagName === 'LI') {
        const activeLink = document.querySelector('.navbar.active');
        activeLink.classList.remove('active');
        e.target.classList.add('active');

        for (let i = 0; i < this.sections.length; i += 1) {
          if (this.sections[i].classList.contains(e.target.getAttribute('data-section'))) {
            this.sections[i].classList.remove('dsp-none');
          } else {
            this.sections[i].classList.add('dsp-none');
          }
        }
      }
    }
}