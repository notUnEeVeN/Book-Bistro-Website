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
      }
    })
    .catch(error => console.error('Error:', error));

  const addToBookshelfButton = document.querySelector('.add-to-bookshelf');

  addToBookshelfButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    const bookTitle = document.querySelector('#book-title').textContent;
    const bookAuthor = document.querySelector('#book-author').textContent;
    const bookCover = document.querySelector('#book-cover').src;

    // Construct the book object
    const book = {
      title: bookTitle,
      author: bookAuthor,
      description: bookSnippet, // Use the bookSnippet here
      book_image: bookCover
    };

    let myBookshelf = JSON.parse(localStorage.getItem('myBookshelf')) || [];
    myBookshelf.push(book);
    localStorage.setItem('myBookshelf', JSON.stringify(myBookshelf));
    window.location.href = 'index.html';
  });
});

const logoEl = document.getElementById('logo');

logoEl.addEventListener('click', function() {
  location.replace('index.html');
})