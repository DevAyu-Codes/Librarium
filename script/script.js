document.getElementById('search_button').addEventListener('click', function () {
    const query = document.getElementById('search').value.trim();
    const resultsDiv = document.getElementById('search_results');
    resultsDiv.innerHTML = '';

    if (query === '') {
        resultsDiv.innerHTML = '<p>Please enter a book title to search.</p>';
        return;
    }

    fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                data.items.slice(0, 5).forEach(item => {
                    const volumeInfo = item.volumeInfo;
                    const title = volumeInfo.title || 'No Title Available';
                    const author = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author';
                    const thumbnail = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '';
                    const previewLink = volumeInfo.previewLink || '#';

                    const bookDiv = document.createElement('div');
                    bookDiv.classList.add('book_result');
                    bookDiv.innerHTML = `
                        <a href="${previewLink}" target="_blank" class="book_link">
                            <h3>${title}</h3>
                            <p><strong>Author:</strong> ${author}</p>
                            ${thumbnail ? `<img src="${thumbnail}" alt="Cover image of ${title}">` : ''}
                        </a>
                    `;
                    resultsDiv.appendChild(bookDiv);
                });
            } else {
                resultsDiv.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultsDiv.innerHTML = '<p>An error occurred while fetching data.</p>';
        });
});