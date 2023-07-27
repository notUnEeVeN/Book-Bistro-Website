document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookTitle = urlParams.get('title');
  
    // URL for Google Books API that returns book details
    const apiURL = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(bookTitle)}`;
  
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // We'll assume the first book returned is the one we want
        if (data.items && data.items.length > 0) {
          const book = data.items[0].volumeInfo;
          document.getElementById('book-title').innerText = book.title;
          document.getElementById('book-author').innerText = book.authors.join(', ');
          document.getElementById('book-description').innerText = book.description;
          document.getElementById('book-publisher').innerText = book.publisher;
          document.getElementById('book-publish-date').innerText = book.publishedDate;
          document.getElementById('book-isbn').innerText = 'ISBN: ' + book.industryIdentifiers[0].identifier;
          document.getElementById('book-cover').src = book.imageLinks.thumbnail;
        }
      })
      .catch(error => console.error('Error:', error));

      const addToBookshelfButton = document.querySelector('.add-to-bookshelf');

addToBookshelfButton.addEventListener('click', function(event) {
  event.preventDefault();
  
  // Get the book details from the page
  const bookTitle = document.querySelector('#book-title').textContent;
  const bookAuthor = document.querySelector('#book-author').textContent;
  const bookDescription = document.querySelector('#book-description').textContent;
  const bookCover = document.querySelector('#book-cover').src;

  // Construct the book object
  const book = {
    title: bookTitle,
    author: bookAuthor,
    description: bookDescription,
    book_image: bookCover
  };

  // Get the bookshelf from the local storage
  let myBookshelf = JSON.parse(localStorage.getItem('myBookshelf')) || [];

  // Add the book to the bookshelf
  myBookshelf.push(book);

  // Save the bookshelf back to the local storage
  localStorage.setItem('myBookshelf', JSON.stringify(myBookshelf));

  // Optionally, redirect the user to the homepage
  window.location.href = 'index.html';
});
      
  });
  
