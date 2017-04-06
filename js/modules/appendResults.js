/* global clear */

// appendResults function
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
