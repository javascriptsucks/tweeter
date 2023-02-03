
$.fn.extend({

  countCharRemain: function() {
    return 140 - $('#newTweet-text').val().length;
  },

  charCount: function() {
    $('#newTweet-text').on('keyup', function() {
      let countLeft = $.fn.countCharRemain();
      $(this).siblings(0).children('output').text(countLeft);
      if (countLeft <= 0) {
        $(this).parent().children('div').children('output').addClass('newTweet-tooLong');
      } else {
        $(this).parent().children('div').children('output').removeClass('newTweet-tooLong');
      }

    });

  }
});


$(document).ready(function() {
  // --- our code goes here ---
  $.fn.charCount();
});


