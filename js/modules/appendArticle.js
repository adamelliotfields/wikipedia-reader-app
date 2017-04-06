/* global clear, truncateLink */

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
          <a href="${link}" target="_blank">${truncateLink(link)}</a>
        </div>
      </div>
    </div>`
  );
};
