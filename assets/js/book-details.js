document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookTitle = urlParams.get('title');
  
  const apiURL = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(bookTitle)}`;
  
  // Variable to store the text snippet
  let bookSnippet;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.items && data.items.length > 0) {
        const book = data.items[0].volumeInfo;
        bookSnippet = data.items[0].searchInfo.textSnippet; // Store the text snippet

        document.getElementById('book-title').innerText = book.title;
        document.getElementById('book-author').innerText = book.authors.join(', ');
        document.getElementById('book-description').innerText = book.description;
        document.getElementById('book-publisher').innerText = book.publisher;
        document.getElementById('book-publish-date').innerText = book.publishedDate;
        document.getElementById('book-isbn').innerText = book.industryIdentifiers[0].identifier;
        document.getElementById('book-cover').src = book.imageLinks.thumbnail;
        document.getElementById('book-category').innerText = book.categories.join(', '); // Add this line to display book category
      }
    })
    .catch(error => console.error('Error:', error));

  const addToBookshelfButton = document.querySelector('.add-to-bookshelf');

  addToBookshelfButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    const bookTitle = document.querySelector('#book-title').textContent;
    const bookAuthor = document.querySelector('#book-author').textContent;
    const bookCover = document.querySelector('#book-cover').src;
    const bookCategory = document.querySelector('#book-category').textContent;

    // Construct the book object
    const book = {
      title: bookTitle,
      author: bookAuthor,
      description: bookSnippet, // Use the bookSnippet here
      book_image: bookCover,
      category: bookCategory
    };

    let myBookshelf = JSON.parse(localStorage.getItem('myBookshelf')) || [];
    myBookshelf.push(book);
    localStorage.setItem('myBookshelf', JSON.stringify(myBookshelf));
    window.location.href = 'saved-books.html';
  });
});

const logoEl = document.getElementById('logo');

logoEl.addEventListener('click', function() {
  location.replace('index.html');
})


const searchInput = document.querySelector('.searchbar');

  searchInput.addEventListener('keypress', function(event) {
    // Check if the Enter key is pressed (key code 13)
    if (event.key === 'Enter') {
      // Get the value of the search bar input
      const searchQuery = searchInput.value;

      // Construct the URL for the book-details.html page with the search query as a parameter
      const url = `book-details.html?title=${encodeURIComponent(searchQuery)}`;

      // Redirect the user to the book-details.html page with the constructed URL
      window.location.href = url;
    }
  });