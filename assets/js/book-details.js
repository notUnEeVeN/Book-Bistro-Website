document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const bookTitle = urlParams.get("title");

  const apiURL = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
    bookTitle
  )}`;

  let bookSnippet;

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.items && data.items.length > 0) {
        const book = data.items[0].volumeInfo;
        bookSnippet = data.items[0].searchInfo.textSnippet;

        document.getElementById("book-title").innerText = book.title;
        document.getElementById("book-author").innerText =
          book.authors.join(", ");
        document.getElementById("book-description").innerText =
          book.description;
        document.getElementById("book-publisher").innerText = book.publisher;
        document.getElementById("book-publish-date").innerText =
          book.publishedDate;
        document.getElementById("book-isbn").innerText =
          book.industryIdentifiers[0].identifier;
        document.getElementById("book-cover").src = book.imageLinks.thumbnail;
        document.getElementById("book-category").innerText =
          book.categories.join(", ");
      }
    })
    .catch((error) => console.error("Error:", error));

  const addToBookshelfButton = document.querySelector(".add-to-bookshelf");

  addToBookshelfButton.addEventListener("click", function (event) {
    event.preventDefault();

    const bookTitle = document.querySelector("#book-title").textContent;
    const bookAuthor = document.querySelector("#book-author").textContent;
    const bookCover = document.querySelector("#book-cover").src;
    const bookCategory = document.querySelector("#book-category").textContent;

    // Construct the book object
    const book = {
      title: bookTitle,
      author: bookAuthor,
      description: bookSnippet,
      book_image: bookCover,
      category: bookCategory,
    };

    let myBookshelf = JSON.parse(localStorage.getItem("myBookshelf")) || [];
    myBookshelf.push(book);
    localStorage.setItem("myBookshelf", JSON.stringify(myBookshelf));
    window.location.href = "saved-books.html";
  });
});

const logoEl = document.getElementById("logo");

logoEl.addEventListener("click", function () {
  location.replace("index.html");
});

const searchInput = document.querySelector(".searchbar");

searchInput.addEventListener("keypress", function (event) {
  // Check if the Enter key is pressed
  if (event.key === "Enter") {
    const searchQuery = searchInput.value;

    const url = `book-details.html?title=${encodeURIComponent(searchQuery)}`;

    window.location.href = url;
  }
});
