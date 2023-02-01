/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  $.fn.getDaysBefore = function(timeStamp) {
    const timeNow = new Date().getTime();
    return Math.round((timeNow - timeStamp) / 1000 / 3600 / 24);
  };

  $.fn.createTweetElement = function(tweet) {
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
          <span>${$.fn.getDaysBefore(tweet.created_at)} days ago</span>
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


  $.fn.renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    $.each(tweets, function($i, $eachTweet) {
      console.log($i);
      const $tweet = $.fn.createTweetElement($eachTweet);
      console.log($tweet);
      $('.main-container').append($tweet);
      $('.tweet-container').fadeIn(800);
    });
  };

  $.fn.renderTweets(data);


  /*
  Build funciont handle form submit
  Using AJAX post request to sending data
*/

  $.fn.sendTweetAJAX = function() {
    $('.newTweet-form').on('submit', function(e) {
      e.preventDefault();
      const data = $(this).serialize();
      console.log(data);
      $(this).children('textarea').val('');
    });
  };


  $.fn.sendTweetAJAX();








});
