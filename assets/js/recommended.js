
//     const apiKey = "OuXPj6RiKIcuukyNyNcgxukqOij3nxf7";
   

// const logoEl = document.getElementById("logo");
// const bookshelf = document.getElementById("recommended-books");

// async function fetchRecommendedBooks() {
//   try {
//     const apiUrl = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`;
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     const books = data.results.books;
//     displayBooks(books);
//   } catch (error) {
//     console.error("Error fetching recommended books:", error);
//   }
// }

// function displayBooks(books) {
//   if (!bookshelf) {
//     console.error("Bookshelf element not found.");
//     return;
//   }

//   bookshelf.innerHTML = "";

//   books.forEach((book) => {
//     const title = book.title;
//     const author = book.author;
//     const bookImage = book.book_image;
//     const bookElement = document.createElement("div");
//     bookElement.classList.add("book");
//     bookElement.innerHTML = `
//       <div class="book-info">
//         <img class="card-img" src="${bookImage}" alt="${title}">
//         <p class="book-title">${title}</p>
//         <p class="book-author">${author}</p>
//       </div>
//     `;
//     bookshelf.appendChild(bookElement);
//   });
// }

// fetchRecommendedBooks();

// logoEl.addEventListener("click", function () {
//   location.replace("index.html");
// });
const apiKey = "OuXPj6RiKIcuukyNyNcgxukqOij3nxf7"; // Replace this with your NYT API key
const logoEl = document.getElementById("logo");
const bookshelf = document.getElementById("recommended-books");

async function fetchBooksFromAllCategories() {
  const listNames = [
    "hardcover-fiction",
    "hardcover-nonfiction",
    "trade-fiction-paperback",
    "paperback-nonfiction",
    // Add more list names for other categories as needed
  ];

  try {
    const promises = listNames.map((listName) =>
      fetchBestSellersByCategory(listName)
    );
    const responses = await Promise.all(promises);
    const books = responses.flatMap((response) => response.results.books);
    displayBooks(books);
  } catch (error) {
    console.error("Error fetching recommended books:", error);
  }
}

async function fetchBestSellersByCategory(listName) {
  const apiUrl = `https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

function displayBooks(books) {
  if (!bookshelf) {
    console.error("Bookshelf element not found.");
    return;
  }

  bookshelf.innerHTML = "";

  books.forEach((book) => {
    const title = book.title;
    const author = book.author;
    const bookImage = book.book_image;
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.innerHTML = `
      <div class="book-info">
        <img class="card-img" src="${bookImage}" alt="${title}">
        <p class="book-title">${title}</p>
        <p class="book-author">${author}</p>
      </div>
    `;
    bookshelf.appendChild(bookElement);
  });
}

fetchBooksFromAllCategories();

logoEl.addEventListener("click", function () {
  location.replace("index.html");
});
