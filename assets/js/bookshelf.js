const bookshelfEl = document.getElementById("bookshelf-section");
const logoEl = document.getElementById("logo");
let title; // Initializing variables to avoid having to re-initialize them for every iteration of later loop; not sure if this is best practice?
let price;
let author;
let categoryl
let description;
let img_url;
let book_url;
let myBookshelf = JSON.parse(localStorage.getItem("myBookshelf")); // Get data from local storage.

for (let i = 0; i < myBookshelf.length; i++) {  
    title = myBookshelf[i].title;
    price = myBookshelf[i].price;
    author = myBookshelf[i].author;
    category = myBookshelf[i].category;
    description = myBookshelf[i].description;
    description = truncateString(description, 400); // Truncating description and adding ellipses after if it exceeds a certain length to ensure that cards don't get too big.
    img_url = myBookshelf[i].book_image;
    book_url = myBookshelf[i].amazon_product_url;
    let card = document.createElement('div');
    card.classList.add('rounded-xl', 'bg-gray-200', 'card-width', 'flex', 'flex-col', 'p-4', 'justify-evenly', 'my-4', 'mx-4');
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
                        </div>
                        <div class="rating">
                          <select id="book${i+1}-rating" class="book${i+1}-rating mt-1">
                              <option disabled selected value>Rate this book</option>
                              <option value="1">★</option>
                              <option value="2">★★</option>
                              <option value="3">★★★</option>
                              <option value="4">★★★★</option>
                              <option value="5">★★★★★</option>
                          </select>
                        </div>
                        <a target = '_blank' href = '${book_url}'><h3 class = 'font-bold'>Read more >>></h3></a>
                        <h3 class = 'font-bold remove-btn'>Remove 🗑️</h3>`
    
    let remove = card.getElementsByTagName('h3')[3];
    remove.addEventListener('click', function() {
        bookshelfEl.children[i].remove();
        myBookshelf.splice(i, 1);
        localStorage.setItem('myBookshelf', JSON.stringify(myBookshelf));
        
    })
    bookshelfEl.append(card);
}




for (let i = 1; i <= bookshelfEl.children.length; i++) {

  if (myBookshelf[i-1].rating) {
    document.querySelector(`.book${i}-rating`).value = myBookshelf[i-1].rating || '';
  }
  document.querySelector(`.book${i}-rating`).addEventListener('change', function() {
    if (myBookshelf[i-1]) {
      myBookshelf[i-1].rating = this.value;
      localStorage.setItem('myBookshelf', JSON.stringify(myBookshelf));
    }
  });
}

const bookTitles = document.querySelectorAll('.book-title');

  bookTitles.forEach(bookTitle => {
    bookTitle.addEventListener('click', function(event) {
      event.preventDefault();
  
      // Get the book title from the text content of the clicked element
      const bookTitle = this.textContent;
      window.location.href = `book-details.html?title=${encodeURIComponent(pagegenerate)}`;
    });
  });

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
