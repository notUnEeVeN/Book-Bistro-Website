const bookshelfEl = document.getElementById('bookshelf-section')

const title = 'Some title idk';
const genre = 'Fantasy';
const author = 'Some Author';
let description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa mauris, viverra non malesuada id, lobortis nec ipsum. Nulla accumsan felis felis, a sagittis nisl rutrum sed. Vivamus et justo ac justo tristique aliquet. Duis vulputate sem tempus diam porttitor, in luctus nibh eleifend. Sed rutrum mauris in pellentesque facilisis. Quisque interdum libero lacus. Sed vel tincidunt lacus, vitae pretium risus. Sed ut nisl luctus, auctor justo ac, ultricies metus. Suspendisse euismod lobortis magna, at malesuada felis consectetur vel. Aliquam nec pellentesque ante, vel semper lorem.'
description = truncateString(description, 400);

let card = document.createElement('div');
card.classList.add('rounded-xl', 'bg-gray-200', 'card-width', 'flex', 'flex-col', 'p-4', 'justify-evenly', 'my-4', 'mr-auto');
card.innerHTML += `<div class = 'flex w-full card-top-height'>
                    <img src = './assets/images/placeholder-book-cover.jpg' class= 'card-img rounded-xl'>
                    <div class = 'flex flex-col pl-4 grow'>
                        <h2 class = 'font-bold text-lg'>Title</h2>
                        <h3 class = 'font-normal text-base'>${title}</h3>
                        <h2 class = 'font-bold text-lg'>Genre</h2>
                        <h3 class = 'font-normal text-base'>${genre}</h3>
                        <h2 class = 'font-bold text-lg'>Author</h2>
                        <h3 class = 'font-normal text-base'>${author}</h3>
                    </div>
                    </div>

                    <div class = 'mt-2 card-description'>
                    <p class = 'text-base description-text'>
                        ${description}
                    </p>
                    </div>
                    <a href = ''><h3 class = 'font-bold'>Read more >>></h3></a>
                    <h3 class = 'font-bold remove-btn' id = 'remove-btn'>Remove 🗑️</h3>`
bookshelfEl.append(card);


function truncateString(str, length) {
	if (str.length > length) return str.slice(0, length) + '...';
	return str;
};
