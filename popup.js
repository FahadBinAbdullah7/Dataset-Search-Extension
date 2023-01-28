// popup.js

// Replace YOUR_API_KEY with your actual API key
const API_KEY = 'AIzaSyCpN0w0-EyFJ9jPPkHCDNkCk9i_Ly_poyI';

// Replace YOUR_CX_CODE with your actual CX code
const CX_CODE = '0638ecfb5a3c44da8';

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');

let currentPage = 1;
let totalPages = 1;
let startIndex = 1;

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchQuery = searchInput.value;
  
  // Make the GET request to the API
  fetch(`https://www.googleapis.com/customsearch/v1?q=${searchQuery}&key=${API_KEY}&cx=${CX_CODE}&start=${startIndex}`)
  .then(response => response.json())
  .then(data => {
    // Clear the previous search results
    searchResults.innerHTML = '';
    // Update the total number of pages
    totalPages = Math.ceil(data.searchInformation.totalResults / 10);
    // Display the results
    data.items.forEach((item, index) => {
      const result = document.createElement('div');
      result.innerHTML = `<p>${startIndex + index}. <a href="${item.link}" target="_blank">${item.title}</a></p>`;
      searchResults.appendChild(result);
    });
    const pagination = document.createElement('div');
    pagination.innerHTML = `<button id="prev-page">Previous</button> <span>Page ${currentPage} of ${totalPages}</span> <button id="next-page">Next</button>`;
    searchResults.appendChild(pagination);
    const prevPageButton = document.querySelector('#prev-page');
    const nextPageButton = document.querySelector('#next-page');
    prevPageButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        startIndex -= 10;
        searchForm.dispatchEvent(new Event('submit'));
      }
    });
    nextPageButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        startIndex += 10;
        searchForm.dispatchEvent(new Event('submit'));
      }
    });
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
});
