/* global clear, appendResults, appendArticle, appendRandom */

// Results object
let results = {};

// Form submit handler
$('.form-inline').on('submit', (event) => {
  // prevent refresh on submit
  event.preventDefault();

  // clear page and exit function if form is empty
  if ($('input').val() === '') {
    clear();
    return;
  }

  // GET request
  const search = encodeURIComponent($('input').val());
  const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0&gsrsearch=${search}&gsrlimit=10&prop=extracts&exintro&exsentences=10&exlimit=10&format=json&callback=?`;
  $.getJSON(url, (json) => {
    // append "No Results" message if response is empty and exit function
    if (!json.query) {
      clear();
      $('.container').append(`<p class="lead text-center text-white">No Results</p>`);
      return;
    }
    // cache results
    results = json.query.pages;
    // append results
    appendResults(results);
  });

  // clear search text
  $('input').val('');
});

// Article link click handler
$('.container').on('click', 'a p', () => appendResults(results));

// Result link click handler
$('.container').on('click', 'a h4', (event) => {
  // GET request
  const search = $(event.target).attr('id');
  const url = `https://en.wikipedia.org/w/api.php?action=query&pageids=${search}&prop=extracts&format=json&callback=?`;
  $.getJSON(url, (json) => {
    // append article
    const article = json.query.pages[Object.keys(json.query.pages)];
    const link = `https://en.wikipedia.org/wiki/${article.title.replace(/\s/g, '_')}`;
    appendArticle(article, link);
  });
});

// Random article click handler
$('.btn-link').on('click', () => {
  // GET request
  const url = 'https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&grnlimit=1&prop=extracts&format=json&callback=?';
  $.getJSON(url, (json) => {    
    // append random article
    const random = json.query.pages[Object.keys(json.query.pages)];
    const link = `https://en.wikipedia.org/wiki/${random.title.replace(/\s/g, '_')}`;
    appendRandom(random, link);
  });
});
