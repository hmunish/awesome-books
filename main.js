const bookList = document.querySelector('ul.books');
const addForm = document.querySelector('form.add-book');
const storageDetails = localStorage.getItem('books');
const timeText = document.querySelector('.time');
const navbar = document.querySelector('ul.navbar');
const bookSection = document.querySelector('section.books');
const addBookSection = document.querySelector('section.add-book');
const contactSection = document.querySelector('section.contact');

// Books class

class Books {
  constructor(storedBooks) {
    this.sections = [bookSection, addBookSection, contactSection];
    this.bookDetails = [];

    // Displaying current time on page
    timeText.textContent = new Date().toLocaleString('default', {
      month: 'long', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
    }).replace(',', '').replace(' at', ',');

    // Loading books if exists in local storage
    if (storedBooks !== null) {
      this.bookDetails = JSON.parse(storageDetails);
      this.displayBooks();
    }
  }

  // Display books function
  displayBooks() {
    let liHtml = '';
    this.bookDetails.forEach((e) => {
      liHtml += `<li class="books">"${e.bookName}" by ${e.author}<button class="delete">Remove</button></li>`;
    });
    bookList.innerHTML = liHtml;
  }

  // Add books function
  addBook(bookName, author) {
    const book = {};
    book.bookName = bookName;
    book.author = author;
    this.bookDetails.push(book);
    localStorage.setItem('books', JSON.stringify(this.bookDetails));
    const liHtml = `<li class="books">"${bookName}" by ${author}<button class="delete">Remove</button></li>`;
    bookList.insertAdjacentHTML('beforeend', liHtml);
  }

  // Delete book function
  deleteBook(e) {
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

  toggleSection(e) {
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
