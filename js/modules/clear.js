// Clear page function
const clear = () => {
  if ($('.container').children().hasClass('card') || $('.container').children().hasClass('lead')) {
    $('.container').empty();
  }
};
