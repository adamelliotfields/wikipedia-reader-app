// Truncate link function
const truncateLink = (link) => {
  if (window.outerWidth > 414 || link.length <= 33) {
    return link;
  } else {
    return link.slice(0, 33) + '...';
  }
};
