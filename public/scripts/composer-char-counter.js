
$.fn.extend({
  //Set JQUery extend function for reusing
  countCharRemain: function() {
    return 140 - $('#newTweet-text').val().length;
  },

  charCount: function() {
    $('#newTweet-text').on('keyup', function() {
      let countLeft=$.fn.countCharRemain();

      //Find target: output and change text inside
      $(this).siblings(0).children('output').text(countLeft);

      if (countLeft <= 0) {
        //Change font color by adding or remove class
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


