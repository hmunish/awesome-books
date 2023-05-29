const bookList = document.querySelector('ul.books');
const addForm = document.querySelector('form.add-book');
const storageDetails = localStorage.getItem('books');
let bookDetails = [];

// Add books function
function addBook(bookName, author) {
  const book = {};
  book.bookName = bookName;
  book.author = author;
  bookDetails.push(book);
  localStorage.setItem('books', JSON.stringify(bookDetails));
  const liHtml = `<li class="books">${bookName} ${author}<button class="delete">Delete</button></li>`;
  bookList.insertAdjacentHTML('beforeend', liHtml);
}

// Delete book function
function deleteBook(e) {
  const { target } = e;
  const parent = e.target.parentElement;
  if (target.classList.contains('delete')) {
    const bookName = parent.childNodes[0].textContent;

    // Removing book from the array
    bookDetails = bookDetails.filter((e) => bookName !== `${e.bookName} ${e.author}`);
    // Updating local storage
    localStorage.setItem('books', JSON.stringify(bookDetails));

    // Removing book li from the book ul
    parent.remove();
  }
}

// Add form submit event
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook(e.target.bookTitle.value, e.target.bookAuthor.value);
  e.target.bookTitle.value = '';
  e.target.bookAuthor.value = '';
});

// Delete button click event
bookList.addEventListener('click', deleteBook);

// Display books function
function displayBooks() {
  let liHtml = '';
  bookDetails.forEach((e) => {
    liHtml += `<li class="books">${e.bookName} ${e.author}<button class="delete">Delete</button></li>`;
  });
  bookList.innerHTML = liHtml;
}

// Loading books if exists in local storage
if (storageDetails) {
  bookDetails = JSON.parse(storageDetails);
  displayBooks();
}
