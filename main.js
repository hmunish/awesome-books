const bookList = document.querySelector('ul.books');
const addForm = document.querySelector('form.add-book');
const storageDetails = localStorage.getItem('books');

// Books class

class Books {
  constructor(storedBooks) {
    this.bookDetails = [];
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
      liHtml += `<li class="books">${e.bookName} ${e.author}<button class="delete">Delete</button></li>`;
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
    const liHtml = `<li class="books">${bookName} ${author}<button class="delete">Delete</button></li>`;
    bookList.insertAdjacentHTML('beforeend', liHtml);
  }

  // Delete book function
  deleteBook(e) {
    const { target } = e;
    const parent = e.target.parentElement;
    if (target.classList.contains('delete')) {
      const bookName = parent.childNodes[0].textContent;

      // Removing book from the array
      this.bookDetails = this.bookDetails.filter((e) => bookName !== `${e.bookName} ${e.author}`);
      // Updating local storage
      localStorage.setItem('books', JSON.stringify(this.bookDetails));

      // Removing book li from the book ul
      parent.remove();
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
