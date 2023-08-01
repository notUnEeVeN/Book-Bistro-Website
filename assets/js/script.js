document.addEventListener("DOMContentLoaded", function () {
  const recommendedBooks = [
    {
      title: "FOURTH WING",
      author: "Rebecca Yarros",
      description: "Description of FOURTH WING.",
      book_image: "fourth_wing.jpg",
      category: "Romance",
    },
    {
      title: "BEYOND THE STORY",
      author: "BTS and Myeongseok Kang",
      description: "Description of BEYOND THE STORY.",
      book_image: "beyond_the_story.jpg",
      category: "Non-Fiction",
    },
    {
      title: "ICEBREAKER",
      author: "Hannah Grace",
      description: "Description of ICEBREAKER.",
      book_image: "icebreaker.jpg",
      category: "Mystery",
    },
    // Add more books to the recommendedBooks array...
  ];

  const recommendedBooksContainer = document.getElementById("recommended-books");

  recommendedBooks.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bg-white", "p-4", "rounded", "shadow", "flex", "flex-col", "container");

    bookCard.innerHTML = `
      <div class="flex">
        <div class="book-cover">
          <img style="width: 100%;" src="./assets/images/${book.book_image}" alt="Book Cover">
        </div>
        <div class="px-2 pl-6 text-section">
          <h3 class="text-xl font-semibold mb-2 book-title">${book.title}</h3>
          <p class="text-black-700">${book.author}</p>
          <p class="text-gray-700 mt-2">${book.description}</p>
          <p class="text-sm text-gray-600">${book.category}</p>
        </div>
      </div>
      <button class="mt-auto px-4 py-2 bg-green-500 text-white rounded add-button">Add to Bookshelf</button>
    `;

    const addToBookshelfButton = bookCard.querySelector(".add-button");
    addToBookshelfButton.addEventListener("click", function () {
      let myBookshelf = JSON.parse(localStorage.getItem("myBookshelf")) || [];
      myBookshelf.push(book);
      localStorage.setItem("myBookshelf", JSON.stringify(myBookshelf));
      window.location.href = "saved-books.html";
    });

    recommendedBooksContainer.appendChild(bookCard);
  });
});

const logoEl = document.getElementById("logo");

logoEl.addEventListener("click", function () {
  location.replace("index.html");
});

const searchInput = document.querySelector(".searchbar");

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const searchQuery = searchInput.value;
    const url = `book-details.html?title=${encodeURIComponent(searchQuery)}`;
    window.location.href = url;
  }
});
