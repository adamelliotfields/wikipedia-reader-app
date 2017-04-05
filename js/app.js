// Results object to cache response
let results = {};

// Clear page function
const clear = () => {
  if ($('.container').children().hasClass('card') || $('.container').children().hasClass('lead')) {
    $('.container').empty();
  }
};

// Append results function
const appendResults = (results) => {
  clear();
  $.each(Object.keys(results), (i, item) => {
    $('.container').append(
      `<div class="card mb-2 bg-faded">
        <div class="card-block">
          <a href="#"><h4 class="card-title" id=${results[item].pageid}>${results[item].title}</h4></a>
          ${results[item].extract.match(/<p>.*<\/p>/)}
        </div>
      </div>`
    );
  });
};

// Append article function
const appendArticle = (article, link) => {
  clear();
  $('.container').append(
    `<div class="card bg-faded">
      <div class="card-block">
        <h1 class="card-title">${article.title}</h1>
        <a href="#"><p>Back to results</p></a>
        ${article.extract}
        <div class="card-footer">
          <a href="${link}" target="_blank">${truncate(link)}</a>
        </div>
      </div>
    </div>`
  );
};

// Append random article function
const appendRandom = (random, link) => {
  clear();
  $('.container').append(
    `<div class="card bg-faded">
      <div class="card-block">
        <h1 class="card-title">${random.title}</h1>
        ${random.extract}
        <div class="card-footer">
          <a href="${link}" target="_blank">${truncate(link)}</a>
        </div>
      </div>
    </div>`
  );
};

// Truncate link function
const truncate = (link) => {
  if (window.outerWidth > 414 || link.length <= 33) {
    return link;
  } else {
    return link.slice(0, 33) + '...';
  }
};

// Form submit handler
$('.form-inline').on('submit', (event) => {
  // prevent refresh on submit
  event.preventDefault();
  //clear page and exit function if form is empty
  if ($('input').val() === '') {
    clear();
    return;
  }
  // GET request
  const search = encodeURIComponent($('input').val());
  const number = parseInt($('select').val());
  const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0&gsrsearch=${search}&gsrlimit=${number}&prop=extracts&exintro&exsentences=10&exlimit=${number}&format=json&callback=?`;
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

// Article link click handler
$('.container').on('click', 'a p', () => appendResults(results));

// Random button click handler
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
