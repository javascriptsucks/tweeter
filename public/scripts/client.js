/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const alertBoxPop = function(errMsg) {
  //Build div box for errMsg
  const html = `
    <div class="alert-message none">
      <span>
        ${errMsg}
      </span>
    </div>
  `;
  //Append message box inside of alert box
  //Traversal down to the message box slideDown show message
  //Remove class name none from message
  $('#alert-box').append(html);
  $('#alert-box').children().slideDown(800).removeClass('none');

  //Set interval after 3 second to slideUp the message box
  //Clear interval after 3 second
  const timer = setInterval(function() {
    $('#alert-box').children().slideUp(400, function() {
      $(this).empty();
    });

    clearInterval(timer);
  }, 3000);

};


const createTweetElement = function(tweet) {
  const tweetTemplate = `
      <article class="tweet-container none">
        <header class="tweet-header">
          <div class="tweet-avatar">
            <span><img src=${tweet['user']['avatars']} alt=${tweet.user.name}></span>
            <span>${tweet.user.name}</span>
          </div>
          <div class="tweet-acountName">${tweet.user.handle}</div>
        </header>
        <div class="tweet-body">
          <div>
            ${tweet.content.text}
          </div>
        </div>
        <footer class="tweet-footer">
          <span>${timeago.format(tweet.created_at)} days ago</span>
          <div class="tweet-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>

        </footer>
      </article>
    `;
  return tweetTemplate;
};

const renderTweets = function(tweets) {

  //Grab the data by looping all data by JQuery
  //return all array-like objects
  $.each(tweets, function($i, $eachTweet) {
    //
    const $tweet = createTweetElement($eachTweet);
    $('.new-tweet').after($tweet);
    $('.tweet-container').fadeIn(800);
  });
};

const formToggle = function() {
  $('.nav-toggle').on('click', function() {
    let attr = $('.new-tweet').attr('style');
    if (!attr) {
      $('.new-tweet').slideUp();
    } else {
      $('.new-tweet').slideDown().find('textarea').focus();

    }
  });
};

const mainToggleBack = function() {
  $(window).on('scroll', function() {
    if ($(this).scrollTop() >= 800) {
      $('.nav-slogContainer').stop().fadeOut();
      $('.main-toggle').removeClass('none').stop().fadeIn('slow');
      let events = $._data(document.querySelector('.main-toggle'), "events");
      if (!events) {
        $('.main-toggle').on('click', function() {
          $('body, html').stop().animate({
            scrollTop: 0
          });
          let attr = $('.new-tweet').attr('style');
          if (attr) {
            $('.new-tweet').slideDown();
          }
          $('textarea').focus();
        });
      }
    } else {
      $('.nav-slogContainer').stop().fadeIn();

      $('.main-toggle').stop().fadeOut('slow', function() {
        $(this).unbind();
      });

    }
  });
};


$(document).ready(function() {

  const loadTweets = function() {
    $.get('/tweets', function(data) {
      renderTweets(data);
    });
  };

  //Function to set submit event listener on form
  const sendTweetAJAX = function() {
    $('.newTweet-form').on('submit', function(e) {
      e.preventDefault();
      //Get value from textarea and check if length valid
      const lengthCheck = $('.newTweet-form textarea').val().length;
      if (lengthCheck > 140 || !lengthCheck) {
        alertBoxPop('Invilid Tweet text length detected!');

        //alert('InvalidTweet message length detected! ');
        return;
      } else {
        //Escape user XSS by text() method
        const userEscap = $('<div/>').text($('.newTweet-form textarea').val()).html();
        //Reassign textarea value by safe text
        $('.newTweet-form textarea').val(userEscap);
        const data = $(this).serialize();
        //Jq AJAX post request
        $.post("/tweets", data,
          function() {
            //Empty elements in main element except the Form element
            $('.main-container:not(:first)').empty();
            //Rerender page with new text message make sure the new tweet post on the top
            loadTweets();
            //Empty value in textarea
            $('#newTweet-text').val('');
          },
        );

      }
    });
  };

  loadTweets();
  mainToggleBack();
  formToggle();

  //Setting event listener on textarea form
  //Send posting request on /tweets with input value
  sendTweetAJAX();
});
