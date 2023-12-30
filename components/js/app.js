// ...

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const clearButton = document.getElementById('btn-clear-input');

  let currentPage = 1;
  let itemsPerPage = calculateItemsPerPage(); // Função para calcular itens por página
  let totalResults = 0;

  // Função para calcular itens por página com base no tamanho da tela
  function calculateItemsPerPage() {
    return window.innerWidth < 768 ? 3 : 6;
  }

  // Atualiza a quantidade de itens por página quando a tela for redimensionada
  window.addEventListener('resize', function () {
    itemsPerPage = calculateItemsPerPage();
    currentPage = 1; // Reinicia para a primeira página ao redimensionar
    searchImages(input.value.trim());
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchTerm = input.value.trim();
    if (searchTerm !== '') {
      searchImages(searchTerm);
    } else {
      alert('Please enter a search term.');
    }
  });

  clearButton.addEventListener('click', function () {
    input.value = '';
    resultsContainer.innerHTML = '';
    totalResults = 0;
    currentPage = 1;
    togglePaginationButtons();
  });

  input.addEventListener('input', function () {
    // Oculta os botões quando o usuário apaga o termo de pesquisa
    if (input.value.trim() === '') {
      hidePaginationButtons();
    } else {
      showPaginationButtons();
    }
  });

  function showPaginationButtons() {
    prevButton.classList.remove('hidden');
    nextButton.classList.remove('hidden');
  }

  function hidePaginationButtons() {
    prevButton.classList.add('hidden');
    nextButton.classList.add('hidden');
  }

  function searchImages(query) {
    const apiKey = 'QINuqAaGNVoM_vCi4Hn5sTGmMxVe_B1drdPrSePLngo';
    const apiUrl = `https://api.unsplash.com/search/photos?page=${currentPage}&query=${query}&per_page=${itemsPerPage}&client_id=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        totalResults = data.total;
        const results = data.results || [];
        displayResults(results);
        togglePaginationButtons();
      })
      .catch((error) => console.error('Error fetching images:', error));
  }

  function displayResults(results) {
    resultsContainer.innerHTML = '';

    results.forEach((result, index) => {
      const resultDiv = document.createElement('div');
      resultDiv.classList.add('box', 'animate-fade-in');

      const resultLink = document.createElement('a');
      resultLink.href = result.urls.regular;
      resultLink.target = '_blank';

      const resultImage = document.createElement('img');
      resultImage.src = result.urls.small;
      resultImage.alt = `Result Image ${index + 1}`;
      resultImage.style.width = '300px';
      resultImage.style.height = '300px';
      resultImage.classList.add('object-cover');

      resultLink.appendChild(resultImage);
      resultDiv.appendChild(resultLink);
      resultsContainer.appendChild(resultDiv);
    });
  }

  function togglePaginationButtons() {
    const totalPages = Math.ceil(totalResults / itemsPerPage);

    // Mostra ou oculta os botões com base no número total de resultados
    if (totalResults > 0) {
      showPaginationButtons();
    } else {
      hidePaginationButtons();
    }

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  }

  prevButton.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      searchImages(input.value.trim());
    }
  });

  nextButton.addEventListener('click', function () {
    const totalPages = Math.ceil(totalResults / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      searchImages(input.value.trim());
    }
  });
});
