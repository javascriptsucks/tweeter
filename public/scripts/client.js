/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//const charCount = require('./composer-char-counter.js');


const alertBoxPop = function(errMsg) {
  //Build div box for errMsg

  const html = `
    <div class="alert-message none">
      <span>
        //<i class="fa-solid fa-skull-crossbones"></i>
        ${errMsg}
        //<i class="fa-solid fa-skull-crossbones"></i>
      </span>
    </div>
  `;

  //Append message box inside of alert box
  //Traversal down to the message box slideDown show message
  //Check if alert-box has any child, if no then append the mesaege
  //Otherwise just skip. Make sure there is only one box exist inside of alert-box
  if (!$('#alert-box').children().length) {
    $('#alert-box').append(html);
    $('#alert-box').children().stop().slideDown(800);

  }

  //Set interval after 3 second to slideUp the message box
  //Clear interval after 3 second
  //Bug alert!!!!!!! Mutiple click generate mutiple interval
  const timer = setInterval(function() {
    $('#alert-box').children().stop().slideUp(300, function() {

      //Remove message box entirly entirely after all animation done
      $(this).remove();

    });

    clearInterval(timer);
  }, 3000);

};


const createTweetElement = function(tweet) {

  //Building HTML template for jquery
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
          <span>${timeago.format(tweet.created_at)}</span>
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

    const $tweet = createTweetElement($eachTweet);
    $('.new-tweet').after($tweet);

    $('.tweet-container').fadeIn(800, function() {
      $(this).removeClass('none');
    }).removeAttr('style');

  });

};

const formToggle = function() {
  $('.nav-toggle').on('click', function() {
    //Toggle Tweet form with click
    //Get the textarea focused when Toggle finish
    $('.new-tweet').stop().slideToggle().find('textarea').focus();

  });
};

const mainToggleBack = function() {
  //Set scroll event on window detect break point of 800px scroll from top
  $(window).on('scroll', function() {

    if ($(this).scrollTop() >= 800) {
      //Jquery animate for toggle button and nav bar button
      $('.nav-slogContainer').stop().fadeOut();
      $('.main-toggle').removeClass('none').stop().fadeIn('slow');
      //Check if event on toggle button set or not
      let events = $._data(document.querySelector('.main-toggle'), "events");
      //If no event set on toggle button, scroll will set click event on it

      if (!events) {
        $('.main-toggle').on('click', function() {
          $('body, html').stop().animate({
            scrollTop: 0
          });
          //Check if tweet input form has style
          //Because if the form has showed as animation before, JQuery will set style=display:block attribute
          //If the attr('style') exsit means the form maybe hidden
          let attr = $('.new-tweet').attr('style');

          if (attr) {
            //Found attr and show the input form
            $('.new-tweet').slideDown();
          }
          //Get input form focused
          $('textarea').focus();
        });

      }

      //If user scroll back, let animations happen
    } else {
      $('.nav-slogContainer').stop().fadeIn();
      //Unbind all event on button
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
            //Check how many char left and change text of counter element
            $('.counter').text($.fn.countCharRemain());
          },
        );

      }
    });
  };

  loadTweets();
  //Set toggle event by scroll
  mainToggleBack();
  //Set toggle event on input form
  formToggle();

  //Setting event listener on textarea form
  //Send posting request on /tweets with input value
  sendTweetAJAX();
});
