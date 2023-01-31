$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('keyup', function(e) {
    let countLeft = 140 - this.value.length;
    $(this).siblings(0).children('output').text(countLeft);
    if (countLeft <= 0) {
      $(this).parent().children('div').children('output').addClass('newTweet-tooLong');
    } else {
      $(this).parent().children('div').children('output').removeClass('newTweet-tooLong');
    }

  });

});


