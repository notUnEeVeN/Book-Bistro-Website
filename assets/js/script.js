document.addEventListener('DOMContentLoaded', (event) => {
  const logoEl = document.getElementById('logo');
  logoEl.addEventListener('click', function() {
    location.replace('index.html');
  })

  fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=LqqbGFHS6JRg2YspUp9AD06ugQlFrIRb')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let books = data.results.books.slice(0, 3); // Get top 3 books

    for(let i = 0; i < books.length; i++) {
      let book = books[i];
      document.getElementById(`topbook${i+1}-title`).textContent = book.title;
      document.getElementById(`topbook${i+1}-author`).textContent = `${book.author}`;
      document.getElementById(`topbook${i+1}-description`).textContent = book.description;
      document.getElementById(`topbook${i+1}-cover`).src = book.book_image;
    }

    // Handle click events for the "Add to Bookshelf" buttons
    let addButtons = document.querySelectorAll('.add-button');
    addButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Store the book data in the local storage
        let myBookshelf = JSON.parse(localStorage.getItem('myBookshelf')) || [];
        
        let book = books[index];
        book.rating = document.querySelector(`.book${index + 1}-rating`).value; // store the rating along with the book

        myBookshelf.push(books[index]);
        localStorage.setItem('myBookshelf', JSON.stringify(myBookshelf));

        // Add the book to the 'My Bookshelf' section\
        document.getElementById(`book${myBookshelf.length}-title`).textContent = books[index].title;
        document.getElementById(`book${myBookshelf.length}-author`).textContent = books[index].author;
        document.getElementById(`book${myBookshelf.length}-description`).textContent = books[index].description;
        document.getElementById(`book${myBookshelf.length}-cover`).src = books[index].book_image;
      });
    });

    // Handle click events for the "Remove from Bookshelf" buttons
    let removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Remove the book data from the local storage
        let myBookshelf = JSON.parse(localStorage.getItem('myBookshelf')) || [];
        myBookshelf.splice(index, 1);
        localStorage.setItem('myBookshelf', JSON.stringify(myBookshelf));

        // Remove the book from the 'My Bookshelf' section
        document.getElementById(`book${index+1}-title`).textContent = "";
        document.getElementById(`book${index+1}-author`).textContent = "";
        document.getElementById(`book${index+1}-description`).textContent = "";
        document.getElementById(`book${index+1}-cover`).src = "";

        // Shift the remaining books down
        for(let i = index+1; i < myBookshelf.length; i++) {
          document.getElementById(`book${i}-title`).textContent = myBookshelf[i].title;
          document.getElementById(`book${i}-author`).textContent = myBookshelf[i].author;
          document.getElementById(`book${i}-description`).textContent = myBookshelf[i].description;
          document.getElementById(`book${i}-cover`).src = myBookshelf[i].book_image;
        }

        // Clear the last book slot
        document.getElementById(`book${myBookshelf.length}-title`).textContent = "";
        document.getElementById(`book${myBookshelf.length}-author`).textContent = "";
        document.getElementById(`book${myBookshelf.length}-description`).textContent = "";
        document.getElementById(`book${myBookshelf.length}-cover`).src = "";
        location.reload();
      });
    });

    for (let i = 1; i <= 3; i++) {
      document.querySelector(`.book${i}-rating`).addEventListener('change', function() {
        let myBookshelf = JSON.parse(localStorage.getItem('myBookshelf')) || [];
        if (myBookshelf[i-1]) {
          myBookshelf[i-1].rating = this.value;
          localStorage.setItem('myBookshelf', JSON.stringify(myBookshelf));
          location.reload();
        }
      });
    }

    // Populate the 'My Bookshelf' section from the local storage
    let myBookshelf = JSON.parse(localStorage.getItem('myBookshelf')) || [];
    for(let i = 0; i < myBookshelf.length; i++) {
      let book = myBookshelf[i];
      document.getElementById(`book${i+1}-title`).textContent = book.title;
      document.getElementById(`book${i+1}-author`).textContent = book.author;
      document.getElementById(`book${i+1}-description`).textContent = book.description;
      document.getElementById(`book${i+1}-cover`).src = book.book_image;
      document.querySelector(`.book${i+1}-rating`).value = book.rating || ''; // populate the rating from local storage
    }
  });


  const bookTitles = document.querySelectorAll('.book-title');

  bookTitles.forEach(bookTitle => {
    bookTitle.addEventListener('click', function(event) {
      event.preventDefault();
  
      // Get the book title from the text content of the clicked element
      const bookTitle = this.textContent;
  
      const parentDiv = this.closest('div');
    
      // Get the author from the sibling <p> element of the book title
      const author = parentDiv.querySelector('p').textContent;

      const pagegenerate = bookTitle + author;
  
      // Generate the link
      window.location.href = `book-details.html?title=${encodeURIComponent(pagegenerate)}`;
    });
  });
  
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

  function truncate(str, maxLength) {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  }


  let myBookshelf = JSON.parse(localStorage.getItem('myBookshelf')) || [];

  // Find the highest rated book
  let highestRatedBook = myBookshelf.reduce((max, book) => max.rating > book.rating ? max : book, myBookshelf[0]);

  // Fetch the category of the highest rated book, if any
  let category = highestRatedBook ? highestRatedBook.category : "";

  // Check if the highest rated book exists and has a category
  if (highestRatedBook && category) {
    // Google Books API does not allow direct search by category. Instead, you can search by subject
    category = category.replace(/ /g, "+");

    // Fetch books from Google Books API based on the subject (category)
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.items);

        // Assume we have the response data from Google Books API
        let booksData = data.items;

        // For each book card, get the corresponding book data and update the HTML
        for (let i = 0; i < 3; i++) {
          // Get the book data
          let bookData = booksData[i].volumeInfo;

          // Get the DOM elements for the book card
          let coverElement = document.getElementById(`recbook${i+1}-cover`);
          let titleElement = document.getElementById(`recbook${i+1}-title`);
          let authorElement = document.getElementById(`recbook${i+1}-author`);
          let descriptionElement = document.getElementById(`recbook${i+1}-description`);

          // Update the DOM elements with the book data
          coverElement.src = bookData.imageLinks ? bookData.imageLinks.thumbnail : ""; // Some books might not have a thumbnail
          titleElement.textContent = bookData.title;
          authorElement.textContent = bookData.authors ? bookData.authors.join(", ") : ""; // There might be more than one author
          descriptionElement.textContent = truncate(bookData.description, 100);
        }
      })
      .catch(error => console.log('Error:', error));
  } else {
    console.log("No books in the bookshelf, no category found for the highest rated book, or no books have been rated");
  }

});
