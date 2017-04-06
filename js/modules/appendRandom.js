/* global clear, truncateLink */

// Append random article function
const appendRandom = (random, link) => {
  clear();
  $('.container').append(
    `<div class="card bg-faded">
      <div class="card-block">
        <h1 class="card-title">${random.title}</h1>
        ${random.extract}
        <div class="card-footer">
          <a href="${link}" target="_blank">${truncateLink(link)}</a>
        </div>
      </div>
    </div>`
  );
};
