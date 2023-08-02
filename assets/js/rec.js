const bookshelfEl = document.getElementById("bookshelf-section");
const logoEl = document.getElementById("logo");
let title; // Initializing variables to avoid having to re-initialize them for every iteration of later loop; not sure if this is best practice?
let price;
let author;
let description;
let img_url;
let book_url;

let myBookshelf = JSON.parse(localStorage.getItem("myBookshelf")) || [];

// Find the highest rated book
let highestRatedBook = myBookshelf.reduce(
  (max, book) => (max.rating > book.rating ? max : book),
  myBookshelf[0]
);

// Fetch the category of the highest rated book, if any
let category = highestRatedBook ? highestRatedBook.category : "";

// Check if the highest rated book exists and has a category
if (highestRatedBook && category) {
  // Google Books API does not allow direct search by category. Instead, you can search by subject
  category = category.replace(/ /g, "+");

  // Fetch books from Google Books API based on the subject (category)
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=10`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.items);

      let booksData = data.items;

      for (let i = 0; i < booksData.length; i++) {
        let bookData = booksData[i].volumeInfo;

        title = bookData.title;
        author = bookData.authors ? bookData.authors.join(", ") : "";
        description = bookData.description;
        description = truncateString(description, 300); // Truncating description and adding ellipses after if it exceeds a certain length to ensure that cards don't get too big.
        img_url = bookData.imageLinks ? bookData.imageLinks.thumbnail : "";
        book_url = bookData.infoLink;

        let card = document.createElement("div");
        card.classList.add(
          "rounded-xl",
          "bg-gray-200",
          "card-width",
          "flex",
          "flex-col",
          "p-4",
          "justify-evenly",
          "my-4",
          "mx-4",
          "card-min-width"
        );
        card.innerHTML += `<div class = 'flex w-full card-top-height'>
                          <img src = '${img_url}' class = 'card-img rounded-xl m-0 rounded-xl'>               
                          <div class = 'flex flex-col pl-4 grow'>
                              <h2 class = 'font-bold text-lg'>Title</h2>
                              <h3 class = 'book-title font-normal text-base'>${title}</h3>
                              <h2 class = 'font-bold text-lg'>Author</h2>
                              <h3 class = 'font-normal text-base author'>${author}</h3>
                          </div>
                          </div>

                          <div class = 'mt-2 card-description'>
                          <p class = 'text-base description-text'>
                              ${description}
                          </p>
                          </div>`;

        bookshelfEl.appendChild(card);

        // Adding event listener to each book title after the card is appended to the bookshelf
        card
          .querySelector(".book-title")
          .addEventListener("click", function (event) {
            event.preventDefault();

            // Get the book title from the text content of the clicked element
            const bookTitle = this.textContent;
            console.log(bookTitle);

            const parentDiv = this.closest("div");

            // Get the author from the sibling <p> element of the book title
            const author = parentDiv.querySelector(".author").textContent;

            const pagegenerate = bookTitle + author;

            // Generate the link
            window.location.href = `book-details.html?title=${encodeURIComponent(
              pagegenerate
            )}`;
          });
      }
    })
    .catch((error) => console.log("Error:", error));
}

for (let i = 1; i <= bookshelfEl.children.length; i++) {
  if (myBookshelf[i - 1].rating) {
    document.querySelector(`.book${i}-rating`).value =
      myBookshelf[i - 1].rating || "";
  }
  document
    .querySelector(`.book${i}-rating`)
    .addEventListener("change", function () {
      if (myBookshelf[i - 1]) {
        myBookshelf[i - 1].rating = this.value;
        localStorage.setItem("myBookshelf", JSON.stringify(myBookshelf));
      }
    });
}

function truncateString(str, length) {
  if (str.length > length) return str.slice(0, length) + "...";
  return str;
}

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

function truncateDescription() {
  const cards = document.querySelectorAll(".card-description");

  cards.forEach((card) => {
    let text = card.innerText;
    let words = text.split(" ");

    if (words.length > 100) {
      words = words.slice(0, 100);
      let newText = words.join(" ") + "...";
      card.innerText = newText;
    }
  });
}

window.onload = truncateDescription;

const bookTitles = document.querySelectorAll(".book-title");

bookTitles.forEach((bookTitle) => {
  bookTitle.addEventListener("click", function (event) {
    event.preventDefault();

    // Get the book title from the text content of the clicked element
    const bookTitle = this.textContent;
    console.log(bookTitle);

    const parentDiv = this.closest("div");

    // Get the author from the sibling <p> element of the book title
    const author = parentDiv.querySelector(".author").textContent;

    const pagegenerate = bookTitle + author;

    // Generate the link
    window.location.href = `book-details.html`;
  });
});
