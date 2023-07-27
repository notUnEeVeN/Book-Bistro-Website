const apiKey = 'OuXPj6RiKIcuukyNyNcgxukqOij3nxf7';
const logoEl = document.getElementById('logo');
const listNames = ['hardcover-fiction', 'hardcover-nonfiction',  'trade-fiction-paperback',  'paperback-nonfiction'];
async function fetchBestSellersByCategory(listName) {
    try {
        const apiUrl = `https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        const books = data.results.books;
        displayCategoryBooks(listName, books);
    } catch (error) {
        console.error('Error fetching best sellers:', error);
    }
}
function displayCategoryBooks(listName, books) {
    const bookshelf = document.getElementById(`bookshelf-${listName}`);
    if (!bookshelf) {
        console.error(`Bookshelf element with ID "bookshelf-${listName}" not found.`);
        return;
    }
    bookshelf.innerHTML = '';
    books.forEach(book => {
        const title = book.title;
        const author = book.author;
        const bookImage = book.book_image;
        const reviewLink = book.amazon_product_url;
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <a href="${reviewLink}" target="_blank">
                <img src="${bookImage}" alt="${title}">
                <p class="book-title">${title}</p>
                <p class="book-author">${author}</p>
            </a>
        `;
        bookshelf.appendChild(bookElement);
    });
}
function fetchBestSellers() {
    listNames.forEach(listName => {
        fetchBestSellersByCategory(listName);
    });
}
fetchBestSellers();

logoEl.addEventListener('click', function() {
    location.replace('index.html');
})