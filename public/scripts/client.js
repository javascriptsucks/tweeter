/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




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




$(document).ready(function() {

  const loadTweets = function() {
    $.get('/tweets', function(data) {
      console.log(`Get request from tweet: ${data}`);
      renderTweets(data);
    });
  };


  const sendTweetAJAX = function() {
    $('.newTweet-form').on('submit', function(e) {
      e.preventDefault();
      const lengthCheck = $('.newTweet-form textarea').val().length;
      console.log(lengthCheck);
      if (lengthCheck > 140 || !lengthCheck) {
        alert('InvalidTweet message length detected! ');
        return;
      } else {
        const userEscap = $('<div/>').text($('.newTweet-form textarea').val()).html();
        console.log(userEscap);
        $('.newTweet-form textarea').val(userEscap);
        const data = $(this).serialize();
        $.post("/tweets", data,
          function() {
            console.log(`Text Data sent`);
            $('.main-container:not(:first)').empty();
            loadTweets();

            $('#newTweet-text').val('');
          },
        );

      }
    });
  };

  loadTweets();



  //Setting event listener on textarea form
  //Send posting request on /tweets with input value
  sendTweetAJAX();

});
