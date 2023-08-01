const apiKey = "OuXPj6RiKIcuukyNyNcgxukqOij3nxf7";
const logoEl = document.getElementById("logo");
let allTitles = [];
const listNames = [
  "hardcover-fiction",
  "hardcover-nonfiction",
  "trade-fiction-paperback",
  "paperback-nonfiction",
];
async function fetchBestSellersByCategory(listName) {
  try {
    const apiUrl = `https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const books = data.results.books;
    displayCategoryBooks(listName, books);
  } catch (error) {
    console.error("Error fetching best sellers:", error);
  }
}
function displayCategoryBooks(listName, books) {
  const bookshelf = document.getElementById(`bookshelf-${listName}`);
  if (!bookshelf) {
    console.error(
      `Bookshelf element with ID "bookshelf-${listName}" not found.`
    );
    return;
  }
  bookshelf.innerHTML = "";
  books.forEach((book) => {
    const title = book.title;
    allTitles.push(title);
    const author = book.author;
    const bookImage = book.book_image;
    const reviewLink = book.amazon_product_url;
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.innerHTML = `<div class = 'book-info'>
                <img class = 'card-img' src="${bookImage}" alt="${title}">
                <p class="book-title">${title}</p>
                <p class="book-author">${author}</p>
                </div>
        `;
    bookshelf.appendChild(bookElement);
  });
}
function fetchBestSellers() {
  listNames.forEach((listName) => {
    fetchBestSellersByCategory(listName);
  });
}
fetchBestSellers();

logoEl.addEventListener("click", function () {
  location.replace("index.html");
});

const searchInput = document.querySelector(".searchbar");

searchInput.addEventListener("keypress", function (event) {
  // Check if the Enter key is pressed (key code 13)

  if (event.key === "Enter") {
    // Get the value of the search bar input
    const searchQuery = searchInput.value;

    // Construct the URL for the book-details.html page with the search query as a parameter
    const url = `book-details.html?title=${encodeURIComponent(searchQuery)}`;

    // Redirect the user to the book-details.html page with the constructed URL
    window.location.href = url;
  }
});

const bookTitles = document.querySelectorAll(".book-title");
console.log(bookTitles);

bookTitles.forEach((bookTitle) => {
  bookTitle.addEventListener("click", function (event) {
    event.preventDefault();

    // Get the book title from the text content of the clicked element
    const bookTitle = this.textContent;

    const parentDiv = this.closest("div");

    // Get the author from the sibling <p> element of the book title
    const author = parentDiv.querySelector("p").textContent;

    const pagegenerate = bookTitle + author;

    // Generate the link
    window.location.href = `book-details.html?title=${encodeURIComponent(
      pagegenerate
    )}`;
  });
});
