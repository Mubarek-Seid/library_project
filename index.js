

function BOOKS(title,author,pages,isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
     this.isRead = isRead;
     this.id = crypto.randomUUID();
}
BOOKS.prototype.toggleRead = function() {
  this.isRead = !this.isRead;
};
let myLibrary = [
  new BOOKS("Atomic Habits", "James Clear", 320, true),
  new BOOKS("Rich Dad Poor Dad", "Robert Kiyosaki", 200, false)
];

function addBookToLibrary(title, author, pages, isRead) {
  let newBook = new BOOKS(title, author, pages, isRead);
  myLibrary.push(newBook);
}
function displayBooks() {
  const bookList = document.getElementById("books-list");
  bookList.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const card = document.createElement("div");
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.isRead ? "Read" : "Not Read Yet"}</p>

    <button class="delete-btn" data-id="${book.id}">Remove</button>
      <button class="toggle-btn" data-id="${book.id}">Toggle Read</button>
    `;
    bookList.appendChild(card);
  }
}
document.getElementById("books-list").addEventListener("click", function(e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");

    myLibrary = myLibrary.filter(book => book.id !== id);

    displayBooks();
  }
});
const form = document.getElementById("book-form");

document.getElementById("new-book-btn").addEventListener("click", () => {
  form.style.display = "block";
});
form.addEventListener("submit", function(e) {
  e.preventDefault(); // 🔥 stops page reload

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  addBookToLibrary(title, author, pages, isRead);

  displayBooks();

  form.reset(); // clear form
  form.style.display = "none"; // hide form
});
document.getElementById("books-list").addEventListener("click", function(e) {

  // TOGGLE
  if (e.target.classList.contains("toggle-btn")) {
    const id = e.target.dataset.id;

    const book = myLibrary.find(book => book.id === id);

    book.toggleRead(); // 🔥 use prototype method

    displayBooks();
  }

});